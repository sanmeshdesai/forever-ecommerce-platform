import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Event received:", event.type);

    switch (event.type) {

        case "checkout.session.completed": {

            const session = event.data.object;

            const orderId = session.metadata.orderId;
            const userId = session.metadata.userId;

            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                stripePaymentIntentId: session.payment_intent,
            });

            await userModel.findByIdAndUpdate(userId, {
                cartData: {},
            });

            console.log("✅ Order marked as paid");

            break;
        }

        default:
            console.log(`Unhandled event: ${event.type}`);
    }

    res.status(200).json({ received: true });
};

export default stripeWebhook;