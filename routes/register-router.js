import db from '../../config/dbConfig';
import bcjs from 'bcryptjs';
import { generateToken } from '../../utils';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const register = async (req, res) => {
  try{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({error: true, message: 'username password required!'});
    }
    
    if (username && password) {

    const hash = await bcjs.hash(password, 10);

    // reaching here means we have valid data
    const validatedEntries = {...req.body, password: hash };

    const newUser = await db('users').insert(validatedEntries);
    return res.status(201).json(newUser)

    } else{
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a new user' });
    }
  }catch(err){
    if(ENVIRONMENT === 'development'){
      console.log(err);
      return res.json(err);
    }else{
      console.log("Something went wrong!");
      console.log(err)
      return res
        .status(500)
        .json({ error: true, message: 'Error adding a new user to the database' });
    }
  }
};

const login = async (req, res) => {
  try{
    const { username, password } = req.body;
    console.log(req.body)

    if (!username || !password) {
      return res
        .status(400)
        .json({
          error: true,
          message: 'username and password is required!',
        });
    }

    const user = await db('users').where({ username });

    const userAndPasswordValid = user.length > 0 ? await bcjs.compare(password, user[0].password) : false;

    if (userAndPasswordValid) {
      const token = await generateToken(user[0]);
      return res
        .status(200)
        .json({
          username: user[0].username,
          message: `Welcome ${user[0].username}! Here's a token: `,
          token: token,
        });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }catch(err){
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      console.log(err)
      return res
        .status(500)
        .json({
          error: true,
          message: 'Error logging in',
        });
    }
  }
};

export default {
  generateToken,
  login,
  register,
};
