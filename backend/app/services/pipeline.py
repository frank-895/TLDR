from typing import List

from ..schemas.pipeline import (
	PipelineRequest,
	PipelineResponse,
	QuizQuestion,
	QuizOption,
)


def _summarize_text(input_text: str) -> str:
	text = input_text.strip()
	if len(text) <= 300:
		return text
	return text[:297] + "..."


def _extract_insights(input_text: str, max_items: int = 5) -> List[str]:
	text = " ".join(input_text.split())
	sentences = [s.strip() for s in text.replace("?", ".").split(".") if s.strip()]
	ranked = sorted(sentences, key=len, reverse=True)
	top = [s for s in ranked[:max_items]]
	return top if top else [text[:120] + ("..." if len(text) > 120 else "")]


def _generate_quiz_from_insights(insights: List[str], max_questions: int = 3) -> List[QuizQuestion]:
	questions: List[QuizQuestion] = []
	for insight in insights[:max_questions]:
		statement = insight if insight.endswith(".") else insight + "."
		q = QuizQuestion(
			question=f"True or False: {statement}",
			options=[
				QuizOption(label="True", is_correct=True),
				QuizOption(label="False", is_correct=False),
			],
		)
		questions.append(q)
	return questions


def run_pipeline(request: PipelineRequest) -> PipelineResponse:
	text = request.text
	summary = _summarize_text(text)
	insights = _extract_insights(text)
	quiz = _generate_quiz_from_insights(insights)
	return PipelineResponse(summary=summary, insights=insights, quiz=quiz)
