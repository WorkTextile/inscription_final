const express = require('express');
const { 
    registerParticular 
    } = require("../controllers/particular/auth");

const { 
    freelanceExperience,
    freelanceSkill,
    freelanceTarification 
    } = require("../controllers/freelance/auth");
    
const { 
    usineDeConfection,
    usineDeMatiere,
    usineListAccessoire,
    usineListTechniqueImpression 
    } = require("../controllers/usine/auth");

const { 
    login,
    register,
    logout, 
    verifyUser, 
    } = require("../controllers/auth");

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/verifyUser", verifyUser)
router.post("/registerParticular", registerParticular)
router.get("/usine-de-confection", usineDeConfection )
router.get("/usine-de-matiere", usineDeMatiere)
router.get("/usine-list-accessoire", usineListAccessoire )
router.get("/usine-list-technique-impression", usineListTechniqueImpression  )
router.get("/freelance-skill", freelanceSkill )
router.get("/freelance-experience", freelanceExperience )
router.get("/freelance-tarification", freelanceTarification )
router.post("/logout", logout)

module.exports = router;