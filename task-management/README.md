# Task Management API

This is a RESTful API for managing tasks, built using Node.js, Express, and MySQL. The API supports operations such as creating, retrieving, updating, and deleting tasks. It follows a clean architecture and includes input validation, error handling, and rate limiting.

---



## API Documentation

You can find the complete API documentation on Postman at the following URL:

[Task Management API Documentation](https://documenter.getpostman.com/view/19622729/2sB2cPiQA9)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=task_management
JWT_SECRET=supersecret
JWT_REFRESH_SECRET=superrefreshsecret

```

### 4. Set Up the Database
1. Log in to your MySQL server:
   ```bash
   mysql -u your_mysql_username -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE task_management;
   ```
3. Use the database:
   ```sql
   USE task_management;
   ```
4. Create the `user` table:
   ```sql
   CREATE TABLE `user` (
   `user_id` int(11) NOT NULL,
   `name` varchar(100) NOT NULL,
   `email` varchar(100) NOT NULL,
   `password` varchar(255) NOT NULL,
   `refresh_token` text DEFAULT NULL,
   `created_at` timestamp NOT NULL DEFAULT current_timestamp()
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

6. Create the `task` table:
   ```sql
   CREATE TABLE `task` (
   `task_id` int(11) NOT NULL,
   `title` varchar(255) NOT NULL,
   `description` text NOT NULL,
   `due_date` datetime NOT NULL,
   `status` enum('pending','in-progress','completed') NOT NULL,
   `assigned_to` varchar(255) DEFAULT NULL,
   `category` text DEFAULT NULL,
   `task_comment` text DEFAULT NULL,
   `created_at` datetime DEFAULT NULL,
   `updated_at` datetime DEFAULT current_timestamp(),
   `created_by` varchar(255) NOT NULL,
   `updated_by` varchar(255) NOT NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
   ```
5. Import the Database
    Open your MySQL client or terminal.
    Log in to your MySQL server:
    Create the database:
    Import the task.sql file into the database:


### 5. Start the Server
```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: `8000`).

---

## License
This project is licensed under the MIT License.
```

### Changes Made:
- Added the Postman documentation URL under the **API Documentation** section.
- Kept the rest of the README.md structure intact.

Let me know if you need further modifications!
