import { GoogleGenAI } from "@google/genai";
import { QuizResult, Lesson } from "../types";

// Initialize client - fails gracefully if no key
const getClient = () => {
    const key = process.env.API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
};

export const getPersonalizedRecommendation = async (
    results: QuizResult[], 
    allLessons: Lesson[]
): Promise<string> => {
    const client = getClient();
    if (!client) {
        return "AI Recommendations unavailable (Missing API Key). Try reviewing your lowest scored quizzes!";
    }

    try {
        // Prepare context for the AI
        const completedLessonIds = results.map(r => r.lesson_id);
        const lowestScores = results.filter(r => r.score < 70);
        
        let prompt = `
        You are a mentor on the Turkcell SkillHub platform. 
        The user has completed the following lessons with these scores:
        ${results.map(r => `Lesson ID ${r.lesson_id}: ${r.score}`).join(', ')}
        
        The available lessons are:
        ${allLessons.map(l => `${l.lesson_id}: ${l.title} (${l.difficulty})`).join(', ')}
        
        Based on their performance (especially identifying weak areas where score < 70), recommend ONE specific next lesson from the available list that they haven't taken yet, or recommend retaking a specific lesson if they failed it.
        Keep the advice encouraging and under 50 words.
        `;

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Keep learning to unlock more skills!";
    } catch (error) {
        console.error("AI Error", error);
        return "Great job! Continue exploring new categories to expand your skill set.";
    }
};