const bcrypt = require('bcrypt');
const User = require('../utils/db');
const jwt = require('jsonwebtoken');

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
static async signup(req, res){
    try {
        const { email, password, major, group } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, major, group });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
}
}

module.exports = Auth;
