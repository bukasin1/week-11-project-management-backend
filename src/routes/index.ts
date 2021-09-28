import { Router, Request, Response } from 'express';
import { changePassword } from "../controllers/password_reset_controller"
import userAuthorization from "../Authorization/authorization"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const User = require ('../models/userschema')


const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.render('index', { title: 'Express' });
});
router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
     let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    let secret = process.env.SECRET_KEY as string
    const token = jwt.sign(
      { user_id: user._id, email },
      secret,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// ...

router.post('/', userAuthorization, changePassword)

router.get('/')

export default router;
