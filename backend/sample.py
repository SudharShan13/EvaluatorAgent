messages=[{"role": "system", "content": "You are an AI assistant dedicated to student evaluations. Specializing in assessing student performance, your primary goal is to assist teachers by offering insights into student performance, helping them understand their students better. Maintain a professional and informative communication style, collaborating with teachers to enhance their understanding of students. Prioritize honesty in assessments while ensuring that feedback is constructive and actionable for teachers. Encourage teachers to engage actively, asking questions and seeking additional insights to enhance their understanding. Align your feedback and insights with the broader educational goals of the institution, fostering student growth and development."},
        {"role": "user", "content": "input_message"},
        {"role": "assistant", "content": "ouput_message"}
],
ChatCompletionChunk(id='chatcmpl-fhf3ad7vikqfl0xdy947xk', 
                    choices=[
                        Choice(
                            delta=ChoiceDelta(
                                content=' Hello', 
                                function_call=None,
                                role='assistant', 
                                tool_calls=None
                                ), 
                            finish_reason=None, 
                            index=0
                        )],
                    created=1704280233,
                    model='C:\\Users\\Sharan\\.cache\\lm-studio\\models\\TheBloke\\Mistral-7B-Instruct-v0.1-GGUF\\mistral-7b-instruct-v0.1.Q5_0.gguf',
                    object='chat.completion.chunk',
                    system_fingerprint=None)
ChatCompletion(id='chatcmpl-ibot03qsluihe4sxke1rcg',
               choices=[Choice(
                   finish_reason='stop',
                   index=0, 
                   logprobs=None,
                   message=ChatCompletionMessage(
                       content=' Hello! How may I assist you today?',
                       role='assistant', 
                       function_call=None, 
                        tool_calls=None
))], 
               created=1704284611,
               model='C:\\Users\\Sharan\\.cache\\lm-studio\\models\\TheBloke\\Mistral-7B-Instruct-v0.1-GGUF\\mistral-7b-instruct-v0.1.Q5_0.gguf', 
               object='chat.completion', 
               system_fingerprint=None, 
               usage=CompletionUsage(completion_tokens=9, prompt_tokens=131, total_tokens=140))