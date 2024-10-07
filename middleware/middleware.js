const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

const Middleware =  () => {
  return  (req, res, next) => {
    console.log("hi");
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log("token: ",token);
    

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWTSECRETKEY, async (err, userInfo) => {
      console.log(userInfo);
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
    //   console.log(userInfo);
      req.user = userInfo;
      next();
    });
  };
};

module.exports = Middleware;
