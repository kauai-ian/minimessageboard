const User = require("../models/User");
const response = require("../helpers/response");

//list all the users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    return response({
      res,
      status: 200,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      return response({
        res,
        status: 400,
        message: "Request body is missing",
      });
    }
    // TODO: update the front end with these fields 
    const { username} = body; 
    if (!username) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response({
        res,
        status: 200,
        message: "User already exists",
        data: existingUser,
      });
    }
// TODO update name
    const newUser = new User({
      username
    });

    await newUser.save();
    return response({
      res,
      status: 201,
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};


exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return response({
        res,
        status: 404,
        message: "User not found",
      });
    }

    return response({
      res,
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
}
