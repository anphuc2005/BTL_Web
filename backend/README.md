# Phone Repair Backend

Spring Boot application for the Phone Repair Management System.

## Technologies

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL 8.0
- Spring Mail
- Springdoc OpenAPI (Swagger)
- Lombok
- Maven

## Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Database Setup

1. Install MySQL and create a database:

```sql
CREATE DATABASE phone_repair_db;
```

2. Update database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/phone_repair_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Configuration

Update the following in `application.properties`:

### Mail Configuration
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### CORS Configuration
```properties
cors.allowed-origins=http://localhost:3000
```

## Installation

```bash
mvn clean install
```

## Running the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

Once the application is running, access Swagger UI at:
- http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs

## Project Structure

```
src/main/java/com/phonerepair/
├── PhoneRepairApplication.java    # Main application class
├── controller/                     # REST Controllers
│   ├── BookingController.java
│   ├── PartController.java
│   ├── CustomerController.java
│   └── AdminController.java
├── service/                        # Business Logic
│   ├── BookingService.java
│   ├── PartService.java
│   ├── NotificationService.java
│   └── InventoryService.java
├── repository/                     # Data Access Layer
│   ├── BookingRepository.java
│   ├── PartRepository.java
│   └── CustomerRepository.java
├── model/                          # Entity Classes
│   ├── Booking.java
│   ├── Part.java
│   ├── Customer.java
│   └── ServiceType.java
├── dto/                            # Data Transfer Objects
│   ├── BookingRequest.java
│   ├── BookingResponse.java
│   ├── PartRequest.java
│   └── PartResponse.java
├── config/                         # Configuration classes
│   ├── CorsConfig.java
│   └── OpenApiConfig.java
└── exception/                      # Exception handling
    ├── ErrorResponse.java
    └── GlobalExceptionHandler.java
```

## API Endpoints

### Booking Management
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `GET /api/bookings/status/{status}` - Get bookings by status
- `PUT /api/bookings/{id}/status` - Update booking status
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings/count/{status}` - Count bookings by status

### Part Management
- `POST /api/parts` - Create new part
- `GET /api/parts` - Get all parts
- `GET /api/parts/{id}` - Get part by ID
- `GET /api/parts/available` - Get available parts
- `GET /api/parts/search?q={query}` - Search parts
- `PUT /api/parts/{id}` - Update part
- `DELETE /api/parts/{id}` - Delete part

### Admin Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/inventory/low-stock` - Get low stock items
- `GET /api/admin/inventory/out-of-stock` - Get out of stock items
- `POST /api/admin/inventory/{partId}/update-stock` - Update stock

### Customer Management
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `GET /api/customers/email/{email}` - Get customer by email

## Features

### Booking Management
- Create and track repair bookings
- Status management (Pending, Confirmed, In Progress, Completed, Cancelled)
- Estimated completion dates
- Customer notifications

### Inventory Management
- Track parts and stock levels
- Automatic status updates (Available, Low Stock, Out of Stock)
- Search and filter parts
- Stock level alerts

### Notification System
- Email notifications for:
  - Booking confirmation
  - Status updates
  - Cancellations
- Async email sending
- SMS integration ready (requires third-party service)

### Admin Features
- Dashboard with statistics
- Booking management
- Inventory management
- Report generation

## Testing

Run tests with:

```bash
mvn test
```

## Database Schema

The application uses JPA with Hibernate to auto-generate the database schema based on entity classes.

Sample data is loaded from `src/main/resources/data.sql` on startup.

## Logging

Logging configuration is set in `application.properties`:
- Application logs: DEBUG level
- Spring Web logs: INFO level
- Hibernate logs: INFO level

## Production Deployment

1. Update `application.properties` for production
2. Build the application: `mvn clean package`
3. Run the JAR: `java -jar target/phone-repair-backend-0.0.1-SNAPSHOT.jar`

## Environment Variables

You can override properties using environment variables:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_MAIL_USERNAME`
- `SPRING_MAIL_PASSWORD`

## Monitoring

Spring Boot Actuator can be enabled for monitoring (add dependency):
- Health check: `/actuator/health`
- Metrics: `/actuator/metrics`

## Security Notes

- Update default credentials before production deployment
- Enable HTTPS in production
- Implement authentication and authorization
- Use environment variables for sensitive data
- Never commit credentials to version control

## Support

For issues and questions, please contact the development team.
