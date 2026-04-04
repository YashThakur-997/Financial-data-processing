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

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed (required for Docker Compose setup)
- Node.js 20+ (for manual/local setup)

---

### Docker Setup (Recommended)
1. Clone the repo
	```sh
	git clone https://github.com/YashThakur-997/Financial-data-processing.git
	```
2. Build and start containers:
   ```sh
   docker-compose up --build
   ```

3. Add dotenv (.env) file to both root folder and src folder ... for development purpose.

4. The app will automatically apply all Prisma migrations on startup—no manual migration step needed. Just wait a little to start the app it will take a while
<img width="1919" height="1037" alt="image" src="https://github.com/user-attachments/assets/d632a259-c737-4b99-8e6a-c41292226bf3" />

5. Access the app:
   - API: http://localhost:3000
   - Swagger docs: http://localhost:3000/api-docs

---

### Manual Setup
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
- `GET /finance/records` — Get own records (user own records)
- `GET /finance/all-records` — Get own records (admin can get all user records)
- `PUT /finance/edit/:id` — Update a record (owner or admin)
- `DELETE /finance/delete/:id` — Delete a record (owner or admin)
- `GET /finance/summary` — Get own records (user own records)
- `GET /finance/category-summary` — Get own records (user own records)
- `GET /finance/overall-summary` — Get own records (admin and analyst get overall summary)
- `GET /finance/overall-category-summary` — Get own records (admin and analyst get overall category summary)
- `GET /finance/dashboard` - (rbac for dashboard)

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
- API documentation with Swagger

---

## License
MIT
