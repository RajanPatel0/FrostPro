import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/generate-roadmap", async (req, res) => {
  try {
    const { goalText } = req.body;

    if (!goalText) {
      return res.status(400).json({ error: "Goal text is required" });
    }

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

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Empty Gemini response");
    }

    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const roadmap = JSON.parse(jsonText);

    return res.json({ roadmap });

  } catch (err) {
    console.error(
      "Gemini REST error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      error: "Failed to generate roadmap",
    });
  }
});

export default router;
