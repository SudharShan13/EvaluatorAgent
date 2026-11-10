import os
import asyncio
from typing import AsyncGenerator, List, Optional
from openai import AsyncOpenAI, RateLimitError, APIStatusError

SYSTEM_PROMPT = (
    "You are an AI assistant dedicated to student evaluations. Specializing in "
    "assessing student performance, your primary goal is to assist teachers by "
    "offering insights into student performance, helping them understand their "
    "students better. Maintain a professional and informative communication style. "
    "Prioritize honesty in assessments while ensuring that feedback is constructive "
    "and actionable. Encourage teachers to ask questions and seek additional insights. "
    "Align your feedback with the broader educational goals of the institution."
)

# Tried in order. Check console.groq.com/docs/models for the current list.
FALLBACK_MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.8-27b",
]


class StudentEvaluationAgent:
    def __init__(self, models: Optional[List[str]] = None, api_key: Optional[str] = None):
        self.models = models or FALLBACK_MODELS
        self.client = AsyncOpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=api_key or os.environ["GROQ_API_KEY"],
        )

    async def evaluate_student(
        self, input_message: str, history: Optional[List[dict]] = None
    ) -> AsyncGenerator[str, None]:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        if history:
            messages.extend(history)
        messages.append({"role": "user", "content": input_message})

        last_error = None
        for model in self.models:
            try:
                stream = await self.client.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=0.7,
                    stream=True,
                )
                started = False
                async for chunk in stream:
                    if chunk.choices and chunk.choices[0].delta.content:
                        started = True
                        yield chunk.choices[0].delta.content
                if started:
                    return
            except (RateLimitError, APIStatusError) as e:
                last_error = e
                print(f"{model} failed: {e!r}")
                await asyncio.sleep(1)
                continue
            except Exception as e:
                print(f"Unexpected error with {model}: {e!r}")
                yield f"\n\n[Backend error: {e}]"
                return

        yield f"\n\n[All models are busy right now. Last error: {last_error}. Try again in a minute.]"