/**
 * @swagger
 * tags:
 *   - name: Finance (Admin)
 *     description: Endpoints accessible only by ADMIN users.
 *   - name: Finance (Analyst)
 *     description: Endpoints accessible by ANALYST and ADMIN users.
 *   - name: Finance (User)
 *     description: Endpoints accessible by regular USER accounts.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /finance/add:
 *   post:
 *     summary: Add a new financial record
 *     tags: [Finance (Admin)]
 *     description: Accessible only by ADMIN users.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *                 enum: [Salary, Food, Entertainment, Utilities, Others]
 *               description:
 *                 type: string
 *               userId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Record added
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/records:
 *   get:
 *     summary: Get user financial records
 *     tags: [Finance (User)]
 *     description: Accessible by USER accounts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/all-records:
 *   get:
 *     summary: Get all financial records (admin/analyst)
 *     tags: [Finance (Admin), Finance (Analyst)]
 *     description: Accessible by ADMIN and ANALYST users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all records
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No records found
 */

/**
 * @swagger
 * /finance/delete/{id}:
 *   delete:
 *     summary: Delete a financial record
 *     tags: [Finance (Admin)]
 *     description: Accessible only by ADMIN users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/edit/{id}:
 *   put:
 *     summary: Edit a financial record
 *     tags: [Finance (Admin)]
 *     description: Accessible only by ADMIN users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Record updated
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/summary:
 *   get:
 *     summary: Get user summary
 *     tags: [Finance (User)]
 *     description: Accessible by USER accounts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User summary
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/overall-summary:
 *   get:
 *     summary: Get overall summary (admin/analyst)
 *     tags: [Finance (Admin), Finance (Analyst)]
 *     description: Accessible by ADMIN and ANALYST users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overall summary
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/category-summary:
 *   get:
 *     summary: Get user category-wise summary
 *     tags: [Finance (User)]
 *     description: Accessible by USER accounts.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category-wise summary
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/overall-category-summary:
 *   get:
 *     summary: Get overall category-wise summary (admin/analyst)
 *     tags: [Finance (Admin), Finance (Analyst)]
 *     description: Accessible by ADMIN and ANALYST users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overall category-wise summary
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /finance/dashboard:
 *   get:
 *     summary: Get user dashboard data
 *     tags: [Finance (Admin), Finance (Analyst), Finance (User)]
 *     description: Accessible by all roles, but data scope depends on role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *       401:
 *         description: Unauthorized
 */
