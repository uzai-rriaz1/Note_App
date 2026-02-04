import express, { json } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

export const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  Credential: true,
};

app.use(express.json({ limit: "16kb" }));
app.use(cookieparser());
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes import

import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);
