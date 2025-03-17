// const mainModel = require('../models/moderation_model');
const chatModel = require('../models/chat_model');
const aiService = require('../utils/gemini_service');

class Chat{
    
    static async createChat(req, res){
        try{

            const { studentId,message } = req.body;
            // Import rules here
            const rule = "AI should not provide direct answers to assignments, only guidance.";
            const ai_response = await aiService.generate_message(message+rule);
            // console.log(ai_response);
            if (!ai_response){
                return res.status(400).json("Error with AI Service");
            }
            
            const dataToSave = new chatModel({
                studentId,
                message:message,
                chat_response:ai_response
            })

            await dataToSave.save();

            return res.status(200).json(`Successful ${dataToSave}`);

        } catch(e){
            console.log(e);
            return res.status(500).send("Error Sending Response");
        }
        
    }

    static async getChats(req, res){
        try{
            const chat = await chatModel.find({});
            return res.status(200).send(chat);
        } catch(e){
            return res.status(400).send(`Chat not found ${e}`);
        }
    }
}
module.exports = Chat;
