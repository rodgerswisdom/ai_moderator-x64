const User = require('../utils/db');
const express = require('express');


class Auth{

     checkuser({email}){
        return User.findOne({email});  
    }
    
    static async signup(req, res){
   
        const {email, password, major, group} = req.body; 
        
        const AuthInstance = new Auth();

        let user =  await AuthInstance.checkuser({email});

        if(user){
            return res.status(400).send("User already Exists");
        } else{
            try{
                const user = new User({
                    email,
                    password,
                    major,
                    group 
                })

            const response = await user.save();
            res.status(201).json({message: `Sign up successful: ${response}`});
            }catch(e){
                res.status(500).json({e: 'Registration Failed'});
                console.error(e);
            }
        }
    }

    static async login(req, res){
        const {email, password} = req.body;

        const AuthInstance = new Auth();

        let user =  await AuthInstance.checkuser({email});

        if(!user){
            return res.status(400).send("You dont have an account. Sign up");
        } 

        let checkpassword = await User.findOne({password});
        if(checkpassword==={password}){
            res.status(200).send("Login successful");
        }        
    }

}


module.exports = Auth;
