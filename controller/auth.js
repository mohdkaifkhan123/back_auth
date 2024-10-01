const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../model/auth");
const bcrypt = require("bcrypt");
const router = express.Router();
const verify=require("../middleware/verify")
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  try {
    const user = new users({ username, password: hashed });

    const response = await user.save();

    return res.status(200).json({ response });
  } catch (err) {
    return res.status(200).json("error in saving data");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await users.findOne({ username });
    console.log("", data);
    const compare = await bcrypt.compare(password,data.password);
    console.log("compare",compare)
    if (!compare) {
      res.status(400).json("Invalid password");
    }

    const token=jwt.sign({userId:data._id},'53e15edd38b5976ca88133ed6a2dbd1708ec5ef14a7eedca6b2fa3b6873c4014')
    res.status(200).json({ data,token });
  } catch (err) {
    res.status(500).json("Invalid details");
  }
});

router.get("/verify",verify,(req,res)=>{

        res.status(200).json('You are successfully loggedin')
    
})

module.exports = router;
