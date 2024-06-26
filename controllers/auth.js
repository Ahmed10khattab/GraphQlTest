const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AUTH1 = require('../models/user'); // Adjust the import as per your model path

const signup = async (_, { username, email, password, isAdmin }) => {
    const existingUser = await AUTH1.findOne({ email });
    if (existingUser) {
        throw new Error('This email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AUTH1({
        username,
        email,
        password: hashedPassword,
        isAdmin
    });

    const savedUser = await newUser.save();

    return {
        message: 'Signup successful',
        email: savedUser.email,
        username: savedUser.username,
        isAdmin: savedUser.isAdmin
    };
};


 const generateToken = (user) => {
     const token = jwt.sign(
         {
             id: user._id,
             email: user.email,
             username: user.username,
             isAdmin: user.isAdmin
         },
         'your-secret-key', // Use a proper secret key in production
         { expiresIn: '1h' }
     );
     return token;
 };
 
  
const login = async (_, { email, password }) => {
    const user = await AUTH1.findOne({ email });
    if (!user) {
        throw new Error('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email or password is incorrect');
    }

    const token = generateToken(user); // Implement this method as needed

    return {
        message: 'Login successful',
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        token: token
    };
};

 

module.exports = {signup,login};
