import { Router } from "express";
import {
  buySubscription,
  cancelSubscription,
  getAllPayments,
  getRazorPayApiKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import {isLoggedIn,authorizedRoles,authorizedSubscriber} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/subscribe").post(isLoggedIn, buySubscription);
router.route("/razorpaykey").get(isLoggedIn,authorizedSubscriber,getRazorPayApiKey);
router.route("/verify").post(isLoggedIn, verifySubscription);
router.route("/unsubscribe").post(isLoggedIn, cancelSubscription);
router.route("/").get(isLoggedIn, authorizedRoles("ADMIN"), getAllPayments);

export default router;
