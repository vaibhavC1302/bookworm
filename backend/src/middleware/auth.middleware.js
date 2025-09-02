import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  console.log("inside protectRoute mmiddleware");

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    console.log("token to verify---->", token);
    console.log("jwt secret ---->", process.env.JWT_SECRET);

    // decode token using jwt secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded---->", decoded);

    // find the user using the decoded token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "token is not valid" });
    }

    console.log("found user using token -----------> ", user);

    req.user = user;

    next();
  } catch (error) {
    console.log("Token auth error", error.message);
    res.status(401).json({ message: "error authenticating the token" });
  }
};
