from pydantic import BaseModel, Field
from typing import List

class PipelineRequest(BaseModel):
	text: str = Field(..., min_length=1, description="Input text to process")

class QuizOption(BaseModel):
	label: str
	is_correct: bool

class QuizQuestion(BaseModel):
	question: str
	options: List[QuizOption]

class PipelineResponse(BaseModel):
	summary: str
	insights: List[str]
	quiz: List[QuizQuestion]
