  const express = require("express");
const router = express.Router();
const multer =require('multer');
const  authMiddleware  = require("../midleware/auth");
const { CareerPathSuggestion,ResumOptimizer, AiController} = require("../conterllor/AiController");


// Carear path..................................
router.post("/career-path", async (req, res) => {
  try {
    let { skills, interests } = req.body;

    if (typeof skills === "string")
      skills = skills.split(",").map((s) => s.trim());
    if (typeof interests === "string")
      interests = interests.split(",").map((i) =>i.trim());
const prompt = `
You are a friendly and helpful career mentor.

The user has shared:

🛠 **Skills:**  
${skills.map(skill => `- ${skill}`).join("\n")}

 💡**Interests:**  
${interests.map(interest => `- ${interest}`).join("\n")}

Please suggest **3 unique career paths** that match their skills and interests.

⚠️ Very Important:  
For each career path, write the answer in this exact format, with each section starting on a **new line**:

🎯 **Job Title:** (clear and attractive name of the role)  

🤝 **Why it Matches:** (1–2 short lines explaining why this is a good fit)  

📚 **Skills to Learn Next:** 
- Skill 1  
- Skill 2  
- Skill 3  

🏢 **Example Companies Hiring:**  
- Company 1  
- Company 2  
- Company 3  

Keep the answer well-structured, easy to read, and motivating so the user feels excited about exploring these career paths.
`;
const result = await CareerPathSuggestion(prompt);
    res.json({ result });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ResumeOptimization..................... 
const upload = multer({ dest: "uploads/" });
router.post("/resume-optimize", upload.single("resume"),ResumOptimizer)

// Ai Roadmap Generator
router.post('/Airoadmap', async (req, res) => {
  try {
let { goal } = req.body;

const prompt = `
You are a friendly and expert career mentor.

The user wants to achieve this goal:

🎯 **Goal:** ${goal}

Please create a **beautifully structured 3-month learning roadmap** for this goal.

⚠️ Requirements:
- Break it down **month by month**.
- For each month, list:
  - 🎯 Focus area
  - 📚 Topics to learn
  - 🛠 Practice tasks or projects
  - 🌟 Milestones for motivation
- Keep it **clear, actionable, and motivating**.
- Use **bullet points and line breaks** so it's easy to read.
- Keep the language simple and encouraging.
`;

const result = await  AiController(prompt);
    res.json({ result });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
// Mock InterView Question...........
router.post("/generate-questions", async (req, res) => {
  try {
    const {topic} = req.body.topic;

    const prompt = `
You are a friendly and helpful coding mentor.

Generate **10 practice questions** for the topic: **${topic}**.

⚠️ Requirements:
- Make them progressively harder (start easy → end with challenging).
- For each question, provide:
  - Q1. A clear problem statement
  - Difficulty level (Easy/Medium/Hard)
- Return them in a numbered list.
- Do NOT include answers yet.
`;
    const result= await AiController(prompt);
    res.json({result });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports=router