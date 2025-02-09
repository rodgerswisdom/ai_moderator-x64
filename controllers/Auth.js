const jwt = require('jsonwebtoken');

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
