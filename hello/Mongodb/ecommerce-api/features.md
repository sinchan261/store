1. User Model
    User Registration: Create a new user account with validation (e.g., email/password).
    User Login: Authenticate users and generate JWT tokens.
    User Profile: Retrieve and update user profile details.
    User Roles: Assign roles (e.g., admin, customer) to users for access control.
    Password Management: Reset password functionality using email verification.

2. Product Model
    Product Listing: Fetch a list of all products with filters (e.g., price, category, brand).
    Product Details: Fetch detailed information about a specific product.
    Product Management: Admin features to add, update, and delete products.
    Product Search: Full-text search for products by name, description, or tags.
    Product Availability: Check stock levels and display product availability.

3. Category Model
    Category Listing: Retrieve all categories with hierarchical relationships (e.g., parent/child categories).
    Category Management: Admin features to add, update, or delete categories.
    Products by Category: Fetch all products under a specific category.

4. Brand Model
    Brand Listing: Fetch all available brands.
    Brand Management: Admin features to add, update, or delete brands.
    Products by Brand: Retrieve products associated with a specific brand.

5. Coupon Model
    Apply Coupon: Validate and apply a coupon to the cart or order.
    Coupon Management: Admin features to create, update, and delete coupons.
    Coupon Usage Tracking: Track the usage of coupons per user or order.

6. Payment Model
    Payment Processing: Integrate with payment gateways (e.g., Stripe, PayPal) for order payments.
    Payment Status: Retrieve the payment status for a specific order.
    Refund Management: Handle refund requests and track refunded payments.
    Payment History: Retrieve a user’s payment history.

7. Review Model
    Add Review: Allow users to add a rating and review for a product.
    Edit/Delete Review: Enable users to manage their reviews.
    View Reviews: Retrieve reviews for a specific product, sorted by rating or date.
    Review Moderation: Admin features to approve or remove inappropriate reviews.

8. Order Model
    Create Order: Place an order based on cart contents and shipping details.
    Order Tracking: Retrieve order status and shipment tracking information.
    Order History: Fetch past orders for a user.
    Order Management: Admin features to update the status of orders (e.g., pending, shipped, delivered).
    Cancel Order: Allow users to cancel an order if eligible.

9. Cart Model
    Add to Cart: Add products to a user’s cart.
    Update Cart: Modify quantities or remove items from the cart.
    View Cart: Retrieve the current cart details for a user.
    Clear Cart: Remove all items from a cart.

10. Wishlist Model
    Add to Wishlist: Save products to a user’s wishlist.
    Remove from Wishlist: Delete products from the wishlist.
    View Wishlist: Retrieve all wishlist items for a user.

11. Shipping Method Model
    Shipping Options: Fetch available shipping methods based on the user's location.
    Shipping Cost Calculation: Calculate shipping costs based on the method and location.
    Shipping Method Management: Admin features to add, update, or delete shipping methods.
    Default Shipping Method: Set and retrieve a user’s default shipping preference.