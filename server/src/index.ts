import express from "express";
import dotevn from "dotenv";
import cors from "cors";
import folderRouter from "./routes/FolderRoutes";
import fileRouter from "./routes/FileRoutes";
import authRouter from "./routes/AuthRoute";
import { errorHandler } from "./middlewares/ErrorHandler";
import cookieParser from "cookie-parser";

dotevn.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/folders", folderRouter);
app.use("/api/files", fileRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
