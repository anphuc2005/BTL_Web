# Setup Guide - Phone Repair Management System

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Java Development Kit (JDK) 17**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java --version`

3. **Maven** (v3.6 or higher)
   - Download from: https://maven.apache.org/download.cgi
   - Verify: `mvn --version`

4. **MySQL** (v8.0 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use Docker (recommended): `docker pull mysql:8.0`

5. **Git**
   - Download from: https://git-scm.com/downloads
   - Verify: `git --version`

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd BTL_Web
```

### Step 2: Database Setup

#### Option A: Using Docker (Recommended)

```bash
docker-compose up -d mysql
```

Wait for MySQL to be ready (check with `docker-compose logs mysql`)

#### Option B: Manual MySQL Installation

1. Start MySQL service
2. Login to MySQL:
```bash
mysql -u root -p
```

3. Create database:
```sql
CREATE DATABASE phone_repair_db;
CREATE USER 'phonerepair'@'localhost' IDENTIFIED BY 'phonerepair123';
GRANT ALL PRIVILEGES ON phone_repair_db.* TO 'phonerepair'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure database connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/phone_repair_db
spring.datasource.username=phonerepair
spring.datasource.password=phonerepair123
```

3. Configure email (optional, for notifications):
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

Note: For Gmail, you need to create an "App Password" in your Google Account settings.

4. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

5. Verify backend is running:
- Open browser: http://localhost:8080/swagger-ui.html
- You should see the API documentation

### Step 4: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

5. Verify frontend is running:
- Browser should automatically open: http://localhost:3000
- You should see the Phone Repair homepage

### Step 5: Verify Integration

1. **Test Booking Creation**:
   - Go to http://localhost:3000/booking
   - Fill in the form and submit
   - Check if booking is created in the database

2. **Check Admin Dashboard**:
   - Go to http://localhost:3000/admin
   - Verify that statistics are displayed

3. **Test API directly**:
   - Open Swagger UI: http://localhost:8080/swagger-ui.html
   - Try the "GET /api/bookings" endpoint
   - Should return list of bookings (including sample data)

## Common Issues and Solutions

### Issue 1: Port Already in Use

**Problem**: `Port 8080 is already in use` or `Port 3000 is already in use`

**Solution**:
- Find and kill the process using the port:
  ```bash
  # On Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F

  # On Mac/Linux
  lsof -ti:8080 | xargs kill -9
  ```
- Or change the port in configuration files

### Issue 2: MySQL Connection Failed

**Problem**: `Communications link failure` or `Access denied for user`

**Solution**:
- Verify MySQL is running: `docker ps` or `systemctl status mysql`
- Check credentials in application.properties
- Verify database exists: `SHOW DATABASES;`
- Check firewall settings

### Issue 3: Maven Build Failed

**Problem**: `Failed to execute goal` or dependency issues

**Solution**:
```bash
# Clean Maven cache
mvn clean
rm -rf ~/.m2/repository

# Rebuild
mvn clean install -U
```

### Issue 4: npm Install Failed

**Problem**: Dependency installation errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 5: CORS Errors

**Problem**: Browser shows CORS policy errors

**Solution**:
- Verify CORS configuration in `backend/src/main/java/com/phonerepair/config/CorsConfig.java`
- Ensure frontend URL is in allowed origins
- Clear browser cache

## Development Workflow

### Running in Development Mode

1. **Terminal 1 - Backend**:
```bash
cd backend
mvn spring-boot:run
```

2. **Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

3. **Terminal 3 - Database** (if using Docker):
```bash
docker-compose up mysql
```

### Making Changes

1. **Frontend Changes**:
   - Edit files in `frontend/src/`
   - Browser will auto-reload
   - Check console for errors

2. **Backend Changes**:
   - Edit files in `backend/src/main/java/`
   - Stop the application (Ctrl+C)
   - Rebuild and restart: `mvn spring-boot:run`

3. **Database Schema Changes**:
   - Modify entity classes in `backend/src/main/java/com/phonerepair/model/`
   - Restart backend (JPA will auto-update schema)

## Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
mvn clean package
```
Output: `target/phone-repair-backend-0.0.1-SNAPSHOT.jar`

### Frontend
```bash
cd frontend
npm run build
```
Output: `build/` directory

## Next Steps

1. **Customize the Application**:
   - Update branding and colors
   - Add more features
   - Customize email templates

2. **Set Up Authentication**:
   - Implement Spring Security
   - Add login/logout functionality
   - Protect admin routes

3. **Deploy to Production**:
   - Choose hosting platform
   - Set up CI/CD pipeline
   - Configure production database
   - Enable HTTPS

4. **Monitor and Maintain**:
   - Set up logging
   - Add monitoring tools
   - Create backup strategy
   - Plan for updates

## Support

If you encounter any issues not covered here:
1. Check the main README.md
2. Review API documentation at http://localhost:8080/swagger-ui.html
3. Check application logs for errors
4. Contact the development team

---

**Good luck with your development! 🚀**
