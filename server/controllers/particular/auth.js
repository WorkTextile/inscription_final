const db = require("../../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Yup = require('yup');
const axios = require('axios');
require('dotenv').config();
const YOUR_TOKEN = process.env.ACCESS_TOKEN

/** Register Particular */
exports.registerParticular = async (req, res) => {
    
    /** Validation des donnees avec Yup */
    const schema = Yup.object().shape({
      name: Yup.string().required().min(3),
      email: Yup.string().email().required(),
      phone: Yup.string().required().min(10)
    });
  
    if(!(await schema.isValid(req.body))){
      return res.status(402).json({
        error: true,
        message: "Données invalides"
      })
    }
  
    /** Register Particular  */

    const { name, email, phone } = req.body;
    //Envoyer à Hubspot
      axios({
        method: 'post',
        url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${hapikey}`,
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
  
    /** Envoyer à la base de données  */
    const q = "SELECT * FROM particular WHERE email = ?";
  
    db.query(q, [email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json('L\'email est déjà utilisé !');

    /** Create a new user */
    /** Hash the password */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   
      const q =
        "INSERT INTO particular (`email`,`password`,`lastName`,`name`,`phone`) VALUE (?)";
      
      const values = [
        req.body.email,
        hashedPassword,
        req.body.lastName,
        req.body.name,
        req.body.phone
      ];
  
      db.query(q,[values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json();
      });
    });
        
  }
  