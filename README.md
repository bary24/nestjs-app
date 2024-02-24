# Sales Management System

This Sales Management System is designed to facilitate the sales process by allowing the management of items, invoices, and users. The system enables the creation of invoices for customer purchases, associating multiple items with each invoice, including quantity and total unit price, and tracking the status of each invoice.

## Functional Requirements

- **Manage Items, Invoices, and Users**: APIs to create, update, and delete items, invoices, and users.
- **User Invoices**: Retrieve invoices for a specific user, with each invoice detailing multiple items, quantities, and prices.
- **Invoice Status**: Each invoice can have a status of 'Placed', 'Delivered', or 'Cancelled'.
- **Data Validation**: Ensure data integrity through validation during the creation or updating of users, items, and invoices.

## Technical Requirements

- **Framework**: The application is built using NestJS, leveraging its robust architecture for scalable server-side applications.
- **Database**: Utilizes MySQL for data storage, ensuring reliable management of user, item, and invoice records.
- **Migrations**: Leverage TypeORM migrations to manage database schema changes, specifically for adding status to the invoice table.
- **Interceptors & Exception Handling**: (Optional) Implement interceptors to transform API responses, adding pagination details, and use global exception filters to standardize error responses.

## Getting Started

### Prerequisites

- Node.js
- NestJS CLI
- MySQL Database

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/bary24/nestjs-app

   ```

2. Navigate to the project directory:
   cd sales-management-system

3. install dependencies
   npm install

4. Run database migrations to set up your schema:
   npm run typeorm migration:run

5. Run the application in development mode :
   npm run start:dev

   ### API USAGE

Manage Items: POST /items, GET /items, PUT /items/:id, DELETE /items/:id
Manage Users: POST /users, GET /users, PUT /users/:id, DELETE /users/:id
Manage Invoices: POST /invoices, GET /invoices, PUT /invoices/:id, DELETE /invoices/:id
User Invoices: GET /users/:userId/invoices
Update Invoice Status: PUT /invoices/:id/status
