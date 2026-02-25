const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.sql");

function createToken(id, username) {
  return jwt.sign({ id, username }, process.env.SECRET, {
    expiresIn: "3d",
  });
}

/* ================= SIGNUP ================= */

const userSignUp = async (req, res) => {
  const { username, firstname, lastname, password, city } = req.body;

  if (!username || !password || !firstname || !lastname || !city) {
    return res.status(400).json({ message: "All fields required!" });
  }

  try {
    if (!validator.isEmail(username)) {
      throw Error("Username must be a valid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password must contain uppercase, lowercase, number and symbol."
      );
    }

    const exists = await User.findOne({ where: { username } });
    if (exists) {
      throw Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      id: uuidv4(),
      username,
      firstName: firstname,
      lastName: lastname,
      password: hash,
      city,
    });

    const token = createToken(user.id, username);

    const newUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
    };

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

/* ================= LOGIN ================= */

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw Error("All fields are required!");
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw Error("User does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Password is incorrect");
    }

    const token = createToken(user.id, username);

    const newUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
    };

    res.status(200).json({ user: newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

/* ================= DELETE USER ================= */

const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    await User.destroy({
      where: { username },
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  deleteUser,
};