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
        
    }

}


module.exports = Auth;
