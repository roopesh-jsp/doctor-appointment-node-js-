import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log(token, req.headers);

    if (!token) {
      throw new Error("no token found");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode.id;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
