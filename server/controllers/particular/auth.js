const db = require("../../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require('yup');
const axios = require('axios');
require('dotenv').config();
const YOUR_TOKEN = process.env.ACCESS_TOKEN

/** Register Particular */
exports.registerParticular = async (req, res) => {
  
  /** Register Particular  */

  const { name, email, phone } = req.body;
  //Envoyer à Hubspot
  axios({
    method: 'post',
    url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=0a7344d3-0331-4870-9c23-fffc176ee8e3`,
    data: {
      "properties": [
        { "property": "lastname", "value": name },
        { "property": "email", "value": email },
        { "property": "phone", "value": phone }
      ]
    }
  })
  .then((response) => {
    console.log("contact enregistré avec succès");
  })
  .catch((error) =>{
    console.log("Erreur lors de l'enregistrement de l'utilisateur")
    console.log(error);
  })
   
}