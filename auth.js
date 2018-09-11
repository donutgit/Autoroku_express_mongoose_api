const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const User = require("./graphql/User/Model");

exports.createTokens = createTokens = async (user, secret, secret2) => {
  const payload = {
    id: user._id
  };
  const token = jwt.sign(payload, secret, { expiresIn: "30m" });

  const refToken = jwt.sign(payload, secret2, { expiresIn: "7d" });

  const { exp } = jwt.decode(token);
  return [token, refToken, exp];
};

exports.refreshTokens = refreshTokens = async (
  token,
  refreshToken,
  SECRET,
  SECRET2
) => {
  let userId = null;
  try {
    const { id } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  const refreshSecret = user.password + SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return null;
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  };
};

exports.tryLogin = tryLogin = async (email, password, SECRET, SECRET2) => {
  const user = await User.findOne({ email });
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: "email", message: "Wrong email" }]
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: "password", message: "Wrong password" }]
    };
  }

  const newRefTokenSecret = user.password + SECRET2;
  const [token, refToken, exp] = await createTokens(
    user,
    SECRET,
    newRefTokenSecret
  );

  return {
    ok: true,
    token,
    refToken,
    exp
  };
};