from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage
from typing import AsyncGenerator
import asyncio
from openai import AsyncOpenAI

from ...core.config import settings

if not settings.openai_api_key:
    raise ValueError("OPENAI_API_KEY is not configured.")

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3,
    api_key=settings.openai_api_key,
)

chunk_prompt = PromptTemplate(
    template="""
    ONLY output the summary. Do NOT include explanations, notes, or extra text.

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
    ONLY output the final merged summary. Do NOT include explanations, notes, or extra text.

    The following text is a combination of multiple summaries.
    Merge them into a single coherent, concise, and easy-to-read summary. 

    Guidelines:

    - Preserve all important information
    - Use sections, headings, or bullet points
    - Add emojis or light formatting to make it more approachable
    - Keep the language simple and engaging
    - Make it scannable so a reader can quickly grasp the key points
    
    Format the summary in Markdown:
    - Use #, ## for headings
    - Use - for bullet points
    - Use ** for bold text and * for italic text
    - Include emojis where appropriate
    - Do not include plain text paragraphs unless necessary

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


def _should_flush(buffer: str, min_chars: int) -> bool:
    if len(buffer) >= min_chars:
        return True
    if not buffer:
        return False
    return buffer.endswith((". ", "! ", "? ", "\n"))


async def stream_final_summary(input_text: str, *, min_chars: int = 120) -> AsyncGenerator[str, None]:
    """
    Exact same summarization flow as summarize_text, but streams the final merge:
    1) Split text
    2) Summarize chunks with chunk_prompt (non-stream)
    3) Merge with final_prompt via OpenAI streaming; yield segments
    """
    # Step 1: split
    chunks = await asyncio.to_thread(_split_text, input_text)

    # Step 2: summarize chunks (same as summarize_text)
    async def summarize_one(c: str) -> str:
        return await asyncio.to_thread(
            lambda: llm.invoke([HumanMessage(content=chunk_prompt.format(text=c))]).content.strip()
        )

    chunk_summaries = []
    for c in chunks:
        chunk_summaries.append(await summarize_one(c))

    combined_text = " ".join(chunk_summaries)

    # Step 3: stream the merge
    client = AsyncOpenAI(api_key=settings.openai_api_key)
    final_prompt_text = final_prompt.format(text=combined_text)
    stream = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": final_prompt_text}],
        temperature=0.3,
        stream=True,
    )

    buffer = ""
    async for event in stream:
        delta = event.choices[0].delta.content or ""
        if not delta:
            continue
        buffer += delta
        if _should_flush(buffer, min_chars=min_chars):
            yield buffer
            buffer = ""

    if buffer:
        yield buffer