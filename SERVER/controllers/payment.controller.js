import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";
import { config } from "dotenv";
import crypto from 'crypto'
config();
export const getRazorPayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const buySubscription = async (req, res, next) => {
  try{
    const { id } = req.user;
    const user = await User.findById(id);


    if (!user) {
      return next(new AppError("Unauthorized, please login first", 500));
    }
    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot buy a subscription", 401));
    }
    console.log("after admin check");
    

      console.log("Plan ID:", process.env.RAZORPAY_PLAN_ID);
      
    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
          total_count:1,
          customer_notify: 1
    });
  
console.log("after creation")
    //update user model with subscription
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();



    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("error is:",error)
    return next(new AppError(error.message,500))
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login first", 500));
    }

    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body; //get these from client through react application.

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`);

    if (generatedSignature !== razorpay_signature) {
      return next(
        new AppError("Payment not verified, Please complete the payment", 500)
      );
    }

    //Record payment details in payment collection

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    //Update user record with subscription status

    user.subscription.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully!",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export const cancelSubscription = async (req, res, next) => {
    try {

        const {id} = req.user;
         
        const user = await User.findById(id);
        if(!user){
            return next(new AppError('Unauthorized, please login first',500));
        }
        
        if(user.role==='ADMIN'){
            return next(new AppError('Admins cannot cancel subscription',500));
        }

        const subscriptionId = user.subscription.id;

        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId
        );

        user.subscription.status = subscription.status;

        await user.save();
        
        res.status(200).json({
            success:true,
            message:'Subscription cancelled'
        })

    } catch (error) {
        return next(new AppError(error.message,500))
    }
};
export const getAllPayments = async (req, res, next) => {
    try {
        const {count} = req.query;
        const subscriptions = await razorpay.subscriptions.all({
            count : count || 10
        });
        res.status(200).json({
            success:true,
            message:'All payments',
            payments:subscriptions
        })
    } catch (error) {
        return next(new AppError(error.message,500))
    }
};