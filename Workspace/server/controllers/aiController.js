import { askAI } from "../services/aiService.js";

export const handleAI = async (req, res) => {
  const { type, input } = req.body;
  if (!input || !input.trim()) {
  return res.status(400).json({ msg: "Input is required" });
}

  let prompt = "";

  switch (type) {
    case "summarize":
      prompt = `Summarize this in a short and clear way:\n${input}`;
      break;

    case "email":
      prompt = `Write a professional email:\n${input}`;
      break;

    case "grammar":
      prompt = `Fix grammar and improve clarity:\n${input}`;
      break;

    case "sentiment":
      prompt = `Is this Positive, Negative, or Neutral:\n${input}`;
      break;

    case "decision":
      prompt = `Answer ONLY Yes or No:\n${input}`;
      break;

    case "ask":
  prompt = `
You are a helpful assistant.

Rules:
- Answer clearly and concisely
- If the question is about CURRENT events, live data, or recent results:
  → Say you may not have up-to-date information
- DO NOT guess or hallucinate
- If unsure, say "I'm not sure"

Examples:
Q: Who is the current IPL table topper?
A: I may not have real-time data. Please check a live sports source.

Q: Who is the father of computer?
A: Charles Babbage

Now answer:

User: ${input}
  `;
  break;

    default:
      // prompt = input;
      prompt = `
Answer the question clearly.
If the information might be outdated, mention uncertainty.

Question: ${input}
`;
  }

  try {
    const result = await askAI(prompt);
    res.json({ result });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "AI failed" });
  }
};
