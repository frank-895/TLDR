from fastapi import APIRouter, HTTPException, Request
import asyncio, json
from starlette.responses import StreamingResponse
from ....schemas.pipeline import PipelineRequest, PipelineResponse
from ....services.pipeline.pipeline import run_pipeline  # import the function directly
from ....services.pipeline.quiz_generator import generate_quiz
from ....services.pipeline.summarizer import stream_final_summary

router = APIRouter()

@router.post("", response_model=PipelineResponse, summary="Run full text processing pipeline")
def run_pipeline_endpoint(request: PipelineRequest) -> PipelineResponse:
    """
    Accepts a large text input, summarizes it, and generates a quiz.
    """
    try:
        # Call the modular pipeline
        return run_pipeline(request)
    except Exception as exc:
        # Return a friendly HTTP error
        raise HTTPException(status_code=500, detail=f"Pipeline processing failed: {str(exc)}")

@router.post("/stream-chunks")
async def pipeline_stream_chunks(request: Request):
    """One-way HTTP streaming using NDJSON (application/x-ndjson)."""
    body = await request.json()
    text = (body.get("text") or "").strip()
    if not text:
        # Return JSON error immediately
        return StreamingResponse((chunk for chunk in [json.dumps({"type": "error", "detail": "Missing 'text'"}) + "\n"]), media_type="application/x-ndjson")

    async def event_generator():
        try:
            yield json.dumps({"type": "start"}) + "\n"

            # Stream final summary using the exact same flow as summarize_text
            streamed_parts = []
            async for seg in stream_final_summary(text):
                streamed_parts.append(seg)
                yield json.dumps({"type": "summary_chunk", "content": seg}) + "\n"

            yield json.dumps({"type": "summary_complete"}) + "\n"

            full_summary = "".join(streamed_parts)
            quiz = await asyncio.to_thread(generate_quiz, full_summary)
            yield json.dumps({"type": "quiz", "quiz": [q.model_dump() for q in quiz]}) + "\n"

            yield json.dumps({"type": "done"}) + "\n"
        except Exception as exc:
            yield json.dumps({"type": "error", "detail": str(exc)}) + "\n"

    response = StreamingResponse(event_generator(), media_type="application/x-ndjson")
    response.headers["Cache-Control"] = "no-cache, no-transform"
    response.headers["X-Accel-Buffering"] = "no"
    response.headers["Connection"] = "keep-alive"
    # Avoid explicitly setting Transfer-Encoding; let ASGI/server decide to reduce aborts
    return response
