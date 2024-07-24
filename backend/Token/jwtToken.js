import jwt from "jsonwebtoken";

const generateToken = async (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  console.log(token);
  return token;
};

export default generateToken;
