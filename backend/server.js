import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import coonnectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoutes.js'
import webhookRouter from './routes/webhookRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000


app.use(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);


connectDB()

coonnectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())


//app endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send('app working')
})

app.listen(port, ()=>console.log('server started on port: ' + port))