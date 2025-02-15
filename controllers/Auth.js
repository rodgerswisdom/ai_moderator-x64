const User = require('../utils/db');
const express = require('express');


class Auth{
    static async signup(req, res){
   
        const {email, password, major, group} = req.body;  
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


module.exports = Auth;
