import express from "express";
import stripeWebhook from "../controllers/webhookController.js";

const router = express.Router();

router.post("/", stripeWebhook);

export default router;