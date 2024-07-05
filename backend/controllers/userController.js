"use strict";

const db = require("../models");

const { User } = db;

exports.register = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  try {
    const user = await User.create({ username, email, mobile, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
