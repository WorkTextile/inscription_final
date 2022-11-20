const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require('yup');
const axios = require('axios');
require('dotenv').config();
const hubspot = require('@hubspot/api-client');
const YOUR_TOKEN = process.env.ACCESS_TOKEN
//const { v4 : uuid } = require('uuid');
//const sendEmail = require("../util/sendEmail");

//Verify User existent

exports.verifyUser = (req, res) => {
  //CHECK USER IF EXISTS
  const email = req.body.email;
  const q = "SELECT * FROM users WHERE email = ?";
  
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('L\'email est déjà utilisé !');
  });

};


exports.register = (req, res) => {
//const verificationString = uuid();
//CHECK USER IF EXISTS
const email = req.body.email;
const q = "SELECT * FROM users WHERE email = ?";
db.query(q, [email], (err, data) => {
  if (err) return res.status(500).json(err);
  if (data.length) return res.status(409).json('L\'email est déjà utilisé !');
  
  //CREATE A NEW USER
  //Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const q =
      "INSERT INTO users (`email`,`password`) VALUE (?)";
  const values = [
    req.body.email,
    hashedPassword
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json();
    });
  });
};

exports.login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or email!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};