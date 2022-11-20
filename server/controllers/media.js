const db = require("../connect");

exports.profilePicture = (req, res) => {

  const q =
    "INSERT INTO users (`profilePicture`) VALUES (?)";
    const values = [
      req.body.profilePicture,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
        return res.status(200).json("Profile Picture has been created.");
    });
};
  