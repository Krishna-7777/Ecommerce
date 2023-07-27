/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 *
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints for managing categories
 *
 * /api/list/category:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for managing products
 *
 * /api/list/products:
 *   get:
 *     summary: Get a list of products by category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: ID of the category to filter products (optional)
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Internal Server Error
 *
 * /api/detail/product/{productId}:
 *   get:
 *     summary: Get details of a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Endpoints for managing the user's shopping cart
 *
 * /api/cart:
 *   get:
 *     summary: Get the user's shopping cart
 *     tags: [Cart]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Internal Server Error
 *
 * /api/cart/{productId}:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to add to the cart
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     responses:
 *       200:
 *         description: Product added to the cart
 *       500:
 *         description: Internal Server Error
 *
 * /api/cart/{cartItemId}:
 *   put:
 *     summary: Update the quantity of a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart item to update
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: New quantity for the cart item
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     responses:
 *       200:
 *         description: Cart item quantity updated
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart item to remove
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     responses:
 *       200:
 *         description: Product removed from the cart
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for managing user orders
 *
 * /api/order:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       500:
 *         description: Internal Server Error
 *
 * /api/order/list:
 *   get:
 *     summary: Get a list of user orders
 *     tags: [Orders]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       500:
 *         description: Internal Server Error
 *
 * /api/order/detail/{id}:
 *   get:
 *     summary: Get details of a user's order by order ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received from login (plain token format)
 *     responses:
 *       200:
 *         description: Order details
 *       500:
 *         description: Internal Server Error
 * 
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

