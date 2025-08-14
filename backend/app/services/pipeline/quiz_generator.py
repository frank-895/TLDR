from typing import List
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from ...core.config import settings
from ...schemas.pipeline import QuizQuestion, QuizOption, QuizList


def _estimate_question_count(text: str, default: int, max_cap: int = 8) -> int:
    """Heuristic: longer text → more questions, within a soft cap."""
    length = len(text.split())
    if length < 120:
        return min(3, default)
    if length < 300:
        return min(5, max(default, 4))
    if length < 800:
        return min(6, max(default, 5))
    return min(max_cap, max(default, 6))


def generate_quiz(summary_text: str, max_questions: int = 5, model_name: str = "gpt-4o-mini") -> List[QuizQuestion]:
    """
    Use an LLM via LangChain to generate multiple-choice questions that match
    the complexity of the provided summary. Returns a list of QuizQuestion.
    - Each question must have 4 plausible options with exactly one correct answer.
    - The reading level and specificity should match the summary's complexity.
    """
    if not settings.openai_api_key:
        raise ValueError("OPENAI_API_KEY is not configured.")

    desired_n = _estimate_question_count(summary_text, default=max_questions)

    llm = ChatOpenAI(
        model=model_name,
        temperature=0.3,
        max_retries=2,
        api_key=settings.openai_api_key,
    )

    # Ask the model to return strictly structured JSON matching QuizList
    parser = llm.with_structured_output(QuizList)

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
You create concise, high-quality multiple-choice quizzes from input summaries.
Rules:
- Match difficulty and terminology to the summary's complexity.
- Write clear, unambiguous questions that test understanding, not trivia.
- Provide exactly 4 options per question (A–D) with one correct answer.
- Options should be plausible and distinct; avoid "All of the above".
- No explanations, no extra text. Output must be valid JSON for the schema.
                """.strip(),
            ),
            (
                "human",
                """
Create {n} multiple-choice questions from this summary:

Summary:
{summary}

Return ONLY JSON matching this schema (no markdown):
MCQuiz = {{ questions: List[QuizQuestion] }}
QuizQuestion = {{ question: str, options: List[QuizOption] }}
QuizOption = {{ label: str, is_correct: bool }}
                """.strip(),
            ),
        ]
    )

    chain = prompt | parser
    result: QuizList = chain.invoke({"n": desired_n, "summary": summary_text})

    # Guard against models occasionally returning fewer/more options or T/F
    normalized: List[QuizQuestion] = []
    for q in result.questions:
        # Ensure there is exactly one correct option; if multiple, keep first
        seen_correct = False
        fixed_options: List[QuizOption] = []
        for opt in q.options:
            is_correct = bool(opt.is_correct) and not seen_correct
            if is_correct:
                seen_correct = True
            fixed_options.append(QuizOption(label=opt.label, is_correct=is_correct))
        # If none marked correct, force the first as correct
        if not any(o.is_correct for o in fixed_options) and fixed_options:
            fixed_options[0] = QuizOption(label=fixed_options[0].label, is_correct=True)

        # Trim or pad to 4 options
        fixed_options = fixed_options[:4]
        while len(fixed_options) < 4:
            fixed_options.append(QuizOption(label="None of the above", is_correct=False))

        normalized.append(QuizQuestion(question=q.question, options=fixed_options))

    return normalized[:desired_n]
