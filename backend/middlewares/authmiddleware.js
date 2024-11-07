const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
//  const token = JSON.stringify(req.headers.authorization).split(' ')[1];
  const token = req.cookies["token"];
  if (token) {
    try {
      const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
      if(decodeToken){
              next();
      }else{
        // res.status(400).send({message:"unauth",success:false})
        res.status(401).send({message:"Login please",success:false});
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ message: "Unauthorized", success: false });
  }
};

module.exports = authmiddleware;
