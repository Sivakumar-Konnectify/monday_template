import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import connectorRouter from "./routes/connector.route.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/connector", connectorRouter);

app.listen(port, () => {
    console.log("server is live; running at port ",port);
});