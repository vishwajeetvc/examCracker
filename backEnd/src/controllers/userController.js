import User from '../model/user.model.js'

export const register = async (req, res) => {

  try {
    const {username, password} = req.body;

    if(!username || !password ) {
      return res.status(400).json({
        message : "username and password are required"
      });
    }

    const isExisting = await User.findOne({username});

    if(isExisting) {
      return res.status(409).json({
        message : "User already existing"
      });
    }

    if( username.length > 50 || password.length > 50){
      return res.status(400).json({
        message : "username or password is too long"
      });
    }

    const user = new User({username, password});
    await user.save();

    res.status(201).send("User registered");

  } catch (e) {

    res.status(500).json({
      message : "server error" 
    })

  }
}

export const login = (_req, res) => {
  res.send("User post login");
}

export const logout = (_req, res) => {
  res.send("User put");
}

export const deleteUser = (_req, res) => {
  res.send("User delete");
}

export const getUser = (_req, res) => {
  res.send("User getUserTesting");
}


