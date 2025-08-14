from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage

import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

llm = ChatOpenAI(
    model_name="gpt-5-mini",
    temperature=0.3,
    openai_api_key=OPENAI_API_KEY
)

chunk_prompt = PromptTemplate(
    template="""
    Summarize the following text so that it's:

    - Super concise
    - Easy to read
    - Preserves all relevant information
    - Approachable and engaging

    Use sections, dotpoints, emojis, or formatting to make it scannable and fun.  

    Text to summarize:
    {text}
    """,
    input_variables=["text"]
)

final_prompt = PromptTemplate(
    template="""
    The following text is a combination of multiple summaries.
    Merge them into a single coherent, concise, and easy-to-read summary. 

    Guidelines:

    - Preserve all important information
    - Use sections, headings, or bullet points
    - Add emojis or light formatting to make it more approachable
    - Keep the language simple and engaging
    - Make it scannable so a reader can quickly grasp the key points

    Summaries to merge:
    {text}
    """,
    input_variables=["text"]
)

MAX_CHUNK_SIZE = 100_000
DEFAULT_OVERLAP = 1_000

def _split_text(input_text: str, max_chunk_size: int = MAX_CHUNK_SIZE, chunk_overlap: int = DEFAULT_OVERLAP) -> list[str]:
    chunk_size = min(max_chunk_size, len(input_text))
    overlap = min(chunk_overlap, chunk_size - 1)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap
    )
    return splitter.split_text(input_text)

def summarize_text(input_text: str) -> str:
    """
    Summarize text and return a plain string.
    """
    chunks = _split_text(input_text)

    # Summarize each chunk
    chunk_summaries = [
        llm.invoke([HumanMessage(content=chunk_prompt.format(text=c))]).content.strip()
        for c in chunks
    ]

    # Merge chunk summaries
    combined_text = " ".join(chunk_summaries)
    final_summary = llm.invoke([HumanMessage(content=final_prompt.format(text=combined_text))])

    return final_summary.content.strip()