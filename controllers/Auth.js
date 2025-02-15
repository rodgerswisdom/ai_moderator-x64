const User = require('../utils/db');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Auth{

     checkuser(email){
        return User.findOne({email});  
    }
    
    static async signup(req, res){
   
        const {email, password, major, group} = req.body; 
        
        let hashedPassword = await bcrypt.hash(password,10);
        const AuthInstance = new Auth();

        let user =  await AuthInstance.checkuser(email);

        if(user){
            return res.status(400).send("User already Exists");
        } else{
            try{
                const user = new User({
                    email,
                    password: hashedPassword,
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


        // const AuthInstance = new Auth();

        let user =  await User.findOne({email});

        if(!user){
            return res.status(401).send("You dont have an account. Sign up");
        } 

        let comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            res.status(401).send("Wrong Password");
        }

        const token = jwt.sign({user_id:user._id}, 'my_secret', {expiresIn:60*60});
        
        res.status(200).send(`Login successful, token ${token}`);
    } catch(e){
        res.status(401).send("Login failed");
        console.log(e);
    }
        
}


module.exports = Auth;
