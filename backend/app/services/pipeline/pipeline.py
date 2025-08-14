from ...schemas.pipeline import PipelineRequest, PipelineResponse
from .summarizer import summarize_text
from .quiz_generator import generate_quiz

def run_pipeline(request: PipelineRequest) -> PipelineResponse:
    """
    Complete processing pipeline:
    1. Summarize the input text (handles very large documents).
    2. Generate quiz questions from the summary.
    3. Return a structured response.
    """
    input_text = request.text
    
    # Step 1: Summarize
    summary = summarize_text(input_text)
    
    # Step 2: Generate quiz
    quiz = generate_quiz(summary)
    
    # Step 3: Construct response
    response = PipelineResponse(
        summary=summary,
        quiz=quiz
    )
    return response
