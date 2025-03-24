import { Router } from "express";
import { registerUser, authenticateUser } from "../services/auth.service";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body.username, req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await authenticateUser(req.body.email, req.body.password);
    res.json({ user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
