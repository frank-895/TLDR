from typing import List
from ...schemas.pipeline import QuizQuestion, QuizOption

def generate_quiz(summary_text: str, max_questions: int = 3) -> List[QuizQuestion]:
    """
    Generate a simple True/False quiz based on the summary.
    
    Each key sentence from the summary is converted into a True/False question.
    """
    # Split summary into sentences
    sentences = [s.strip() for s in summary_text.replace("?", ".").split(".") if s.strip()]
    
    questions: List[QuizQuestion] = []
    for sentence in sentences[:max_questions]:
        statement = sentence if sentence.endswith(".") else sentence + "."
        q = QuizQuestion(
            question=f"True or False: {statement}",
            options=[
                QuizOption(label="True", is_correct=True),
                QuizOption(label="False", is_correct=False),
            ],
        )
        questions.append(q)
    
    return questions
