const fs = require("fs");
const path = require("path");

const projectStructure = {
  config: {
    "db.js": "// Database connection setup\n",
    "jwt.js": "// JWT secret and helper functions\n",
    "env.js": "// Environment variable configuration\n",
  },
  controllers: {
    "userController.js": "// User-related logic\n",
    "productController.js": "// Product-related logic\n",
    "categoryController.js": "// Category-related logic\n",
    "brandController.js": "// Brand-related logic\n",
    "couponController.js": "// Coupon-related logic\n",
    "paymentController.js": "// Payment-related logic\n",
    "reviewController.js": "// Review-related logic\n",
    "orderController.js": "// Order-related logic\n",
    "cartController.js": "// Cart-related logic\n",
    "wishlistController.js": "// Wishlist-related logic\n",
    "shippingController.js": "// Shipping-related logic\n",
  },
  middlewares: {
    "authMiddleware.js": "// Authentication and authorization middleware\n",
    "errorMiddleware.js": "// Centralized error handling\n",
    "validateMiddleware.js": "// Request validation middleware\n",
  },
  models: {
    "User.js": "// User schema and model\n",
    "Product.js": "// Product schema and model\n",
    "Category.js": "// Category schema and model\n",
    "Brand.js": "// Brand schema and model\n",
    "Coupon.js": "// Coupon schema and model\n",
    "Payment.js": "// Payment schema and model\n",
    "Review.js": "// Review schema and model\n",
    "Order.js": "// Order schema and model\n",
    "Cart.js": "// Cart schema and model\n",
    "Wishlist.js": "// Wishlist schema and model\n",
    "ShippingMethod.js": "// Shipping method schema and model\n",
  },
  routes: {
    "userRoutes.js": "// User-related routes\n",
    "productRoutes.js": "// Product-related routes\n",
    "categoryRoutes.js": "// Category-related routes\n",
    "brandRoutes.js": "// Brand-related routes\n",
    "couponRoutes.js": "// Coupon-related routes\n",
    "paymentRoutes.js": "// Payment-related routes\n",
    "reviewRoutes.js": "// Review-related routes\n",
    "orderRoutes.js": "// Order-related routes\n",
    "cartRoutes.js": "// Cart-related routes\n",
    "wishlistRoutes.js": "// Wishlist-related routes\n",
    "shippingRoutes.js": "// Shipping-related routes\n",
  },
  services: {
    "paymentService.js": "// Payment gateway integration\n",
    "emailService.js": "// Email notifications\n",
    "couponService.js": "// Coupon validation logic\n",
  },
  utils: {
    "logger.js": "// Logger utility for debugging\n",
    "responseHelper.js": "// Standardize API responses\n",
    "validators.js": "// Request validation helpers\n",
  },
  tests: {
    unit: {
      "userController.test.js": "// User controller unit tests\n",
      "productController.test.js": "// Product controller unit tests\n",
    },
    integration: {
      "userRoutes.test.js": "// User routes integration tests\n",
      "productRoutes.test.js": "// Product routes integration tests\n",
    },
  },
};

const rootFiles = {
  ".env":
    "PORT=3000\nMONGODB_URI=mongodb://localhost:27017/ecommerce\nJWT_SECRET=your_jwt_secret\n",
  ".gitignore": "node_modules\n.env\n.DS_Store\n",
  "app.js": `const express = require('express');
const app = express();
// ... rest of your app configuration\n`,
  "package.json": `{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "description": "E-commerce API with MongoDB and Express",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "4.18.2",
    "mongoose": "8.0.3",
    "dotenv": "16.3.1",
    "jsonwebtoken": "9.0.2",
    "bcryptjs": "2.4.3",
    "cors": "2.8.5",
    "express-validator": "7.0.1",
    "morgan": "1.10.0",
    "helmet": "7.1.0",
    "compression": "1.7.4",
    "express-rate-limit": "7.1.5",
    "multer": "1.4.5-lts.1",
    "slugify": "1.6.6"
  },
  "devDependencies": {
    "jest": "29.7.0",
    "nodemon": "3.0.2",
    "supertest": "6.3.3"
  }
}\n`,
  "README.md": "# E-commerce API\n\nAPI built with Express and MongoDB\n",
};

function createDirectoryStructure(basePath, structure) {
  // Create directories and files recursively
  Object.entries(structure).forEach(([name, content]) => {
    const fullPath = path.join(basePath, name);

    if (typeof content === "object") {
      // If content is an object, it's a directory
      fs.mkdirSync(fullPath, { recursive: true });
      createDirectoryStructure(fullPath, content);
    } else {
      // If content is a string, it's a file
      fs.writeFileSync(fullPath, content);
    }
  });
}

function generateProject(projectName = "ecommerce-api") {
  const basePath = path.join(process.cwd(), projectName);

  // Create the project root directory
  fs.mkdirSync(basePath, { recursive: true });

  // Create the directory structure
  createDirectoryStructure(basePath, projectStructure);

  // Create root files
  Object.entries(rootFiles).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(basePath, filename), content);
  });

  console.log(`Project structure created successfully in ${basePath}`);
}

// Export the generateProject function
module.exports = { generateProject };
