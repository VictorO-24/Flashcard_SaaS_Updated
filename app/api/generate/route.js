import { NextResponse } from "next/server";

// System prompt for flashcard creation
const systemPrompt = `
You are a flashcard creator. You must generate a JSON response that contains flashcards. The JSON structure should look like this:

{
    "flashcards": [
        {
            "id": "int",
            "front": "string",
            "back": "string"
        }
    ]
}

Make sure the response is valid JSON. Do not include any extra text, explanations, or comments. Only return the JSON object.
`;

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return NextResponse.json({ error: "Invalid input text" }, { status: 400 });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.LLAMA_API_KEY}`, // Ensure this key is set correctly
                "HTTP-Referer": `${process.env.YOUR_SITE_URL}`, // Optional, include your site URL for rankings
                "X-Title": `${process.env.YOUR_SITE_NAME}`, // Optional, include your site name for rankings
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-8b-instruct:free",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: text },
                ],
            }),
        });

        if (!response.ok) {
            console.error(`API Error: ${response.statusText}`);
            return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
        }

        const responseText = await response.text();
        console.log("Raw API response:", responseText);

        // Parsing the response as JSON
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(responseText.trim());
        } catch (jsonError) {
            console.error("JSON parse error:", jsonError.message);
            return NextResponse.json({ error: "Invalid response format from AI API" }, { status: 500 });
        }

        if (!parsedResponse || !Array.isArray(parsedResponse.flashcards)) {
            return NextResponse.json({ error: "Unexpected API response structure" }, { status: 500 });
        }

        return NextResponse.json(parsedResponse.flashcards);

    } catch (error) {
        console.error("Error generating flashcards:", error.message);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
