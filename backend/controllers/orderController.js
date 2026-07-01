import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'


const currency = 'usd'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placeing order COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = { 
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message:'Order placed'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

// placeing order Stripe
const placeOrderStripe = async (req, res) => {

    try {


       

        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers

         const user = await userModel.findById(userId);

if (!user) {
    return res.json({
        success: false,
        message: "User not found"
    });
}

        const orderData = { 
            userId,
            items,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=> ({
            price_data: {
            currency: currency,
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100,
        },
            quantity: item.quantity
        }))

        line_items.push ({
            price_data: {
            currency: currency,
            product_data: {
                name: 'Delivery Charges'
            },
            unit_amount: deliveryCharge * 100,
        },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    customer_email: user.email,

    line_items,

    mode: "payment",

    success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/verify?cancel=true`,

    metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
    },
});

newOrder.stripeSessionId = session.id;
await newOrder.save();
        
        res.json({success:true, session_url:session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
    
}


// placeing order Razorpay
const placeOrderRazorpay = async (req, res) => {
    
}

//All orders data for admin
const allOrders = async (req, res) => {
    try {
        
    const orders = await orderModel.find({})
    res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
    
}

//User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//update order status admin
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true, message:'Status updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
    
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}