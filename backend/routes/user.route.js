import express from "express";
import { register, login, logout, billingPlans, getBootstrapToken, getSession, getOAuthUrl, billingCredits } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/billing/plans', billingPlans);
userRouter.post('/billing/credits', billingCredits);
userRouter.post('/auth/bootstrap-token', getBootstrapToken);
userRouter.post('/session', getSession);
userRouter.post('/auth-url', getOAuthUrl);




export default userRouter