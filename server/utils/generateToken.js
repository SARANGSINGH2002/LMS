import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    // .cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   //sameSite: "lax",
    //   maxAge: 24 * 60 * 60 * 1000,
    // })

    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,  // true in prod, false in dev
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
        success:true,
        message,
        user
    })
};
