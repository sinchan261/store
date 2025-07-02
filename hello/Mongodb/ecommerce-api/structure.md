ecommerce-api/
├── config/
│   ├── db.js                  # Database connection setup
│   ├── jwt.js                 # JWT secret and helper functions
│   ├── env.js                 # Environment variable configuration
├── controllers/
│   ├── userController.js      # User-related logic
│   ├── productController.js   # Product-related logic
│   ├── categoryController.js  # Category-related logic
│   ├── brandController.js     # Brand-related logic
│   ├── couponController.js    # Coupon-related logic
│   ├── paymentController.js   # Payment-related logic
│   ├── reviewController.js    # Review-related logic
│   ├── orderController.js     # Order-related logic
│   ├── cartController.js      # Cart-related logic
│   ├── wishlistController.js  # Wishlist-related logic
│   ├── shippingController.js  # Shipping-related logic
├── middlewares/
│   ├── authMiddleware.js      # Authentication and authorization middleware
│   ├── errorMiddleware.js     # Centralized error handling
│   ├── validateMiddleware.js  # Request validation middleware
├── models/
│   ├── User.js                # User schema and model
│   ├── Product.js             # Product schema and model
│   ├── Category.js            # Category schema and model
│   ├── Brand.js               # Brand schema and model
│   ├── Coupon.js              # Coupon schema and model
│   ├── Payment.js             # Payment schema and model
│   ├── Review.js              # Review schema and model
│   ├── Order.js               # Order schema and model
│   ├── Cart.js                # Cart schema and model
│   ├── Wishlist.js            # Wishlist schema and model
│   ├── ShippingMethod.js      # Shipping method schema and model
├── routes/
│   ├── userRoutes.js          # User-related routes
│   ├── productRoutes.js       # Product-related routes
│   ├── categoryRoutes.js      # Category-related routes
│   ├── brandRoutes.js         # Brand-related routes
│   ├── couponRoutes.js        # Coupon-related routes
│   ├── paymentRoutes.js       # Payment-related routes
│   ├── reviewRoutes.js        # Review-related routes
│   ├── orderRoutes.js         # Order-related routes
│   ├── cartRoutes.js          # Cart-related routes
│   ├── wishlistRoutes.js      # Wishlist-related routes
│   ├── shippingRoutes.js      # Shipping-related routes
├── services/
│   ├── paymentService.js      # Payment gateway integration
│   ├── emailService.js        # Email notifications (e.g., password resets)
│   ├── couponService.js       # Coupon validation logic
├── utils/
│   ├── logger.js              # Logger utility for debugging
│   ├── responseHelper.js      # Standardize API responses
│   ├── validators.js          # Request validation helpers
├── tests/
│   ├── unit/
│   │   ├── userController.test.js
│   │   ├── productController.test.js
│   └── integration/
│       ├── userRoutes.test.js
│       ├── productRoutes.test.js
├── .env                       # Environment variables
├── .gitignore                 # Files to ignore in Git
├── app.js                     # Main application entry point
├── package.json               # Project dependencies
├── README.md                  # Project documentation
