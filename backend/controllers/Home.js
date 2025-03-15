const mainModel = require('../models/moderation_model');
const aiService = require('../utils/gemini_service');

class Home{
    static async index(req, res){
        try{
            const { message } = req.body;
            const ai_response = await aiService.generate_message(message);
            // console.log(ai_response);
            if (!ai_response){
                return res.status(400).json("Error with AI Service");
            }
            
            const dataToSave = new mainModel({
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
}
module.exports = Home;
