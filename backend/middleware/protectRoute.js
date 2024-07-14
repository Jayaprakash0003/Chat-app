import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req,res,next)=>{

    try{
      const token = req.cookies.jwt;
      if(!token){
        return res.status(401).json({error:"unauthorised - No token provider"});
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      if(!decoded){
        return res.status(401).json({error:"unauthorised - Invalid Token"});
      }
      const user = await User.findById(decoded.userId).select("-password");

      if(!user){
        return res.status(404).json({error :"user not found"});
      }
      req.user=user;

      next();
    }catch(error){
        console.log("error in protectRoute controllerrr",error.message);
        res.status(500).json({error:"Internal server Error"});
    }
}
export default protectRoute;