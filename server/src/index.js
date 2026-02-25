require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const { connectSQL } = require("./sql_database/neonSeq");
const { setupSocket } = require("./socket/socketManager");

const app = express();
const server = createServer(app);
setupSocket(server);

// ✅ FIXED CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

const PORT = process.env.MYPORT || 4000;

app.use("/api/item", itemRoutes);
app.use("/api/user", userRoutes);

const startServer = async () => {
  try {
    await connectSQL();
    console.log("Database connected successfully");

    server.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();