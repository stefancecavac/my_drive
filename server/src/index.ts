import express from "express";
import dotevn from "dotenv";
import cors from "cors";
import folderRouter from "./routes/FolderRoutes";
import fileRouter from "./routes/FileRoutes";

import { errorHandler } from "./middlewares/ErrorHandler";

dotevn.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/folders", folderRouter);
app.use("/api/files", fileRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
