import jwt from "jsonwebtoken";

const checkAdminAuth = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;
    console.log(admintoken, req.headers);

    if (!admintoken) {
      throw new Error("no token found");
    }

    const decode = jwt.verify(admintoken, process.env.JWT_SECRET);

    if (decode !== process.env.ADMIN_MAIL + process.env.ADMIN_PASSWORD) {
      throw new Error("not authorized token ");
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default checkAdminAuth;
