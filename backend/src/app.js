const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Placeholder for DB connection (not implemented in this example)
// In a real app, this would establish your database connection.
// require("./config/db");

// Import Routers
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes"); // Dummy
const stockRoutes = require("./routes/stockRoutes");     // Dummy

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management API 🚀");
});

// API Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", stockRoutes);

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke on the server!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});