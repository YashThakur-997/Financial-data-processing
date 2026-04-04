# Financial Data Processing API

## Overview
This project is a secure, role-based backend API for managing financial records using Node.js, Express, and Prisma (PostgreSQL). It supports authentication, RBAC, validation, and is ready for dashboard/summary features.

---

## Features
- User authentication with JWT
- Role-Based Access Control (RBAC): ADMIN, ANALYST, USER/VIEWER
- CRUD operations for financial records
- Input validation with Joi
- Centralized error handling
- Rate limiting and HTTP header security (helmet)
- Modular code structure (controllers, routes, middlewares, utils)

---

## Roles & Permissions
| Role    | Create | Read Own | Read All | Update | Delete |
|---------|--------|----------|----------|--------|---------|
| ADMIN   | ✅     | ✅       | ✅       | ✅     | ✅     |
| ANALYST | ❌     | ✅       | ✅       | ❌     | ❌     |
| USER    | ❌     | ✅       | ❌       | ❌     | ❌     |

---

## Setup
1. Clone the repo
2. Install dependencies:
	```sh
	npm install
	```
3. Set up your `.env` file with:
	- `DATABASE_URL`
	- `JWT_SECRET`
4. Run migrations:
	```sh
	npx prisma migrate dev
	```
5. Start the server:
	```sh
	npm start
	```

---

## API Endpoints

### Auth
- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT
- `POST /auth/logout` — Logout (clears cookie)

### Finance
- `POST /finance/add` — Create a record (admin can specify userId)
- `GET /finance/records` — Get own records (admin can get all if implemented)
- `PUT /finance/edit/:id` — Update a record (owner or admin)
- `DELETE /finance/delete/:id` — Delete a record (owner or admin)

---

## Security
- JWT authentication for all protected routes
- Role-based middleware for access control
- Joi validation for all input
- Rate limiting on login and sensitive endpoints
- Helmet for HTTP header security
- Centralized error handler

---

## How to Add a New Feature
1. Add validation in `middlewares/`
2. Add controller logic in `controllers/`
3. Add route in `routes/`
4. Protect with appropriate middleware (auth, role, validation)
5. Document the endpoint here

---

## Future Improvements
- Dashboard/summary API for analytics
- Audit logging for admin actions
- Automated tests
- API documentation with Swagger/OpenAPI

---

## License
MIT
