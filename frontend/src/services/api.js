import axios from "axios";

export const sendMessageToAI = async (text) => {
  try {
    const response = await axios.post("http://localhost:3000/api/", { text });

    console.log("API Response:", response.data); // Debugging

    return response.data; // Return AI response
  } catch (error) {
    console.error("Error sending message:", error);
    return { chat_response: "Failed to get response" }; // Fallback error message
  }
};
