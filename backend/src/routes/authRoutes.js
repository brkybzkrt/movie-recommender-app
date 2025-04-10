import express from "express";

const router = express.Router();


router.post("/login", async(req, res) => {
  res.send("Login route");
});
router.post("/register", async (req, res) => {
  res.send("Register route");
});


export default router;