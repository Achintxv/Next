// import axios from "axios";

// export const askAI = async (prompt) => {
//   try {
//     const res = await axios.post(
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//   {
//     contents: [{ parts: [{ text: prompt }] }],
//   },
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );

//     const text =
//       res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!text) {
//       throw new Error("Invalid AI response");
//     }

//     return text;
//   } catch (error) {
//     console.log("AI SERVICE ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };


import axios from "axios";

export const askAI = async (prompt) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("FULL AI RESPONSE:", res.data); // 👈 VERY IMPORTANT

    // Safe extraction
    const text =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error(
        res.data?.error?.message || "AI returned empty response"
      );
    }

    return text;
  } catch (error) {
    console.log(
      "AI SERVICE ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};