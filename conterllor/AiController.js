  const dotenv=require('dotenv')
  const express=require('dotenv')
  const Tesseract =require('tesseract.js');
  const { GoogleGenerativeAI } = require("@google/generative-ai");
    
    const genAI = new GoogleGenerativeAI('AIzaSyBekoBJwR6qLe5AKOK7zLVLa-ZQtQ14n58');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // CareerPathSuggestion.....................
   async function CareerPathSuggestion(prompt){
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        console.error("AI Error:", error);
        throw error;
      }
    }


    // resume......................
   const ResumOptimizer= async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
    
        console.log("✅ Uploaded file:", req.file.path);
    
        // OCR with Tesseract
        const ocrResult = await Tesseract.recognize(req.file.path, "eng");
        const resumeText = ocrResult.data.text || "";
    
        console.log("✅ Extracted text length:", resumeText.length);
    
        if (!resumeText.trim()) {
          return res.status(400).json({ error: "Could not extract text from file" });
        }
    
        // Generate suggestions using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`
          Here is a resume: ${resumeText}
          Suggest improvements: skills to add, keywords to use, formatting tips.
        `);
    
        const suggestions = result.response.text();
    
        console.log("✅ Gemini suggestions generated");
    
        res.json({ tips: suggestions });
      } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
      }
    }
    
  //  AiRoadMap for 3 months
  async function AiController(prompt){
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        console.error("AI Error:", error);
        throw error;
      }
    }
    module.exports={ResumOptimizer,CareerPathSuggestion,AiController};