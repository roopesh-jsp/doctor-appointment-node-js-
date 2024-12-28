import jwt from "jsonwebtoken";

const authDoc = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      throw new Error("no token found");
    }

    const decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = decode.id;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoc;
