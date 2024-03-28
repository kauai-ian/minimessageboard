const User = require("../models/User");

//list all the users
const listUsers = async (req, res) => {
  let statusCode = 500;
  try {
    const users = await User.find();
    await res.status(200).json({ users });
  } catch (error) {
    await res.status(statusCode).json({ error: error.message });
  }
};

// find users using the id
const getUser = async (req, res) => {
  let statusCode = 500;
  console.log("REQ", req);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      statusCode = 400;
      throw new Error("User not found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    await res.status(statusCode).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  listUsers,
};
