
export const adminOnly = (req, res, next) => {

  if(req.user.role === 'admin'){
    return next();
  } else {
    return res.status(401).json({ message: "Permission denied." });
  }
};

