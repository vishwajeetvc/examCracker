import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

  try {
    const {username, password} = req.body;

    if(!username || !password ) {
      return res.status(400).json({
        message : "username and password are required"
      });
    }

    if( username.length > 50 || password.length > 50){
      return res.status(400).json({
        message : "username or password is too long"
      });
    }

    if(password.length < 6){
      return res.status(400).json({
        message : "password is too short"
      });
    }

    const isExisting = await User.findOne({username});

    if(isExisting) {
      return res.status(409).json({
        message : "User already existing"
      });
    }

    const user = new User({username, password : String(password)});
    await user.save();

    return res.status(201).send("User registered");

  } catch (e) {

    return res.status(500).json({
      e,
      message : "server error" 
    })

  }
}

export const login = async (req, res) => {
  try {

    const {username, password} = req.body;

    if(!username || !password ) {
      return res.status(400).json({
        message : "Username and password are required"
      });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid input"
      });
    }

    const user = await User.findOne({username}).select("password").select("role");
    if(!user){
      return res.status(401).send({message : "Invalid credentials"});
    }

    const isPasswordMatching = await user.comparePassword(password);

    if(!isPasswordMatching) {
      return res.status(401).send(
        {message : "Invalid credentials"}
      );
    }

    const token = jwt.sign(
      { username: username, role : user.role },        
      process.env.JWT_SECRET,       
      { expiresIn: "1h" }          
    );

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict"
    // });

    return res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });

  }
}

export const logout = (_req, res) => {
  res.send("User put");
}

export const deleteUser = (_req, res) => {
  res.send("User delete");
}
