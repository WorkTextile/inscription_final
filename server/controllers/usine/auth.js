const db = require("../../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require('yup');
const axios = require('axios');
require('dotenv').config();
const YOUR_TOKEN = process.env.ACCESS_TOKEN

/** Usine List Technique Impression*/
exports.usineListTechniqueImpression = async (req, res) => {
  const results = await axios.get('https://api.hubapi.com/crm/v3/properties/company/type_impression?hapikey=',
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
  
  /** UsineListAccessoire*/
  exports.usineListAccessoire = async (req, res) => {
    
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/company/trims?hapikey=',
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
  
  //Usine de matiere
  exports.usineDeMatiere = async (req, res) => {
    
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/company/matiere?hapikey=',
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
  
  
  //Usine De Confection
  
  exports.usineDeConfection = async (req, res) => {
    
    const results = await axios.get('https://api.hubapi.com/crm/v3/properties/company/types_de_produits?hapikey=',
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