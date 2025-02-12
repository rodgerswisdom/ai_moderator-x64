const bcrypt = require('bcrypt');
const User = require('../utils/db');
const jwt = require('jsonwebtoken');
const express = require('express');
/**
 *
// Create a token
const token = jwt.sign({ userId: 1 }, 'secret_key', { expiresIn: '1h' });

// Verify a token
jwt.verify(token, 'secret_key', (err, decodedToken) => {
  if (err) {
    console.error('Token verification failed');
  } else {
    console.log('Decoded token:', decodedToken);
  }
});
*/

class Auth{
static async signup(req, res){
    
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
       // const { email, password, major, group } = req.body;
        //const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User(
                { 
                    email:req.body.email, 
                    //password: hashedPassword, 
                    password:req.body.password,
                    major:req.body.major, 
                    group:req.body.group 
                }
            );
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        console.error(error);
        }
}
        }
    }


module.exports = Auth;
