import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-roadmap", async (req, res) => {
  try {
    const { goalText } = req.body;

    if (!goalText) {
      return res.status(400).json({ error: "Goal text is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.0-pro",
    });

    const prompt = `
Create a structured learning roadmap for the goal: "${goalText}"

Return ONLY valid JSON in this format:
{
  "title": "Roadmap title",
  "description": "Short description",
  "nodes": [
    {
      "id": "1",
      "title": "Topic",
      "description": "What to learn",
      "level": 1,
      "status": "not-started",
      "prerequisites": [],
      "resources": []
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const roadmap = JSON.parse(jsonText);

    return res.json({ roadmap });

  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({
      error: "Failed to generate roadmap",
      details: err.message,
    });
  }
});

export default router;
