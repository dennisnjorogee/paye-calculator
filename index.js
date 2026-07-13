// initializers
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";

// routes
import apiRoutes from "./src/api/routes/api.routes.js";
import appRoutes from "./src/app/routes/app.routes.js";
import { AppError, serverError } from "./src/api/utils/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app, port
const app = express();
app.use(helmet());
const port = process.env.PORT || 3000;

// CORS config
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  }),
);

// request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files, view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes config
app.use("/api/v1", apiRoutes);
app.use("/", appRoutes);

// route not found fallback
app.use((req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      resultCode: error.resultCode,
      message: error.message,
      errors: [{ field: error.field, message: error.errorMessage }],
    });
  }

  console.log(error);

  res.status(serverError.statusCode).json({
    status: "error",
    resultCode: serverError.resultCode,
    message: serverError.message,
  });
});

// server binding
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
