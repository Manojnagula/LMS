import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import morgan from "morgan";
import bodypParser from "body-parser";
import courseRoutes from "./routes/course.routes.js";
import paymentsRoutes from "./routes/payment.routes.js";

const app = express();
app.use(
  bodypParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});

//3 route config
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentsRoutes);

app.all("*", (req, res) => {
  res.status(404).send("oops!! 404 page not found");
});
app.use(errorMiddleware);
export default app;
