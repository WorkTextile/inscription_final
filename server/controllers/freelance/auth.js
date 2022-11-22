const db = require("../../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require('yup');
const axios = require('axios');
require('dotenv').config();
const YOUR_TOKEN = process.env.ACCESS_TOKEN

/** Freelance Tarification */
exports.freelanceTarification = async (req, res) => {
  
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/contact/tarification?hapikey=',
      {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`,
          'Content-Type': 'application/json'
        },
        json: true
      },
    );
      res.send(results.data.options)
}
  
  /** Feelance Experience*/
exports.freelanceExperience = async (req, res) => {
    
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/contact/experience?hapikey=',
      {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`,
          'Content-Type': 'application/json'
        },
        json: true
      },
    );
      res.send(results.data.options)
  
  }
  
  /**Freelance Skill*/
exports.freelanceSkill = async (req, res) => {
    
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/contact/metier?hapikey=',
      {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`,
          'Content-Type': 'application/json'
        },
        json: true
      },
    );
      res.send(results.data.options)
  
}