const OPENROUTER_API_KEY =
  "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";

export async function sendMessage(message: string) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.href,
        },
        body: JSON.stringify({
          model: "google/gemini-pro",
          messages: [{ role: "user", content: message }],
        }),
      },
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
