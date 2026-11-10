import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    basePath: "http://localhost:1234/v1",
    apiKey: "not-needed"
})
const openai = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    console.log(messages);

    // GPT-4 system message
    // system message tells GPT-4 how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from GPT-4)
    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            { role: "system", content: "You are an AI assistant dedicated to student evaluations. Specializing in assessing student performance, your primary goal is to assist teachers by offering insights into student performance, helping them understand their students better. Maintain a professional and informative communication style, collaborating with teachers to enhance their understanding of students. Prioritize honesty in assessments while ensuring that feedback is constructive and actionable for teachers. Encourage teachers to engage actively, asking questions and seeking additional insights to enhance their understanding. Align your feedback and insights with the broader educational goals of the institution, fostering student growth and development."},
            ...messages
        ]
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}