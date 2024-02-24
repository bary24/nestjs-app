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

```bash
  cd sales-management-system
```

3. install dependencies

```bash
  npm install
```

4. Run database migrations to set up your schema:

```bash
  npm run typeorm migration:run
```

5. Run the application in development mode :

```bash
   npm run start:dev
```

## API Endpoints

Below are the available API endpoints for managing items, users, invoices, and their statuses.

### Manage Items

- **Create an Item**
  - `POST /items`
- **Retrieve All Items**
  - `GET /items`
- **Update an Item**
  - `PUT /items/:id`
    - Replace `:id` with the item's unique identifier.
- **Delete an Item**
  - `DELETE /items/:id`
    - Replace `:id` with the item's unique identifier.

### Manage Users

- **Create a User**
  - `POST /users`
- **Retrieve All Users**
  - `GET /users`
- **Update a User**
  - `PUT /users/:id`
    - Replace `:id` with the user's unique identifier.
- **Delete a User**
  - `DELETE /users/:id`
    - Replace `:id` with the user's unique identifier.

### Manage Invoices

- **Create an Invoice**
  - `POST /invoices`
- **Retrieve All Invoices**
  - `GET /invoices`
- **Update an Invoice**
  - `PUT /invoices/:id`
    - Replace `:id` with the invoice's unique identifier.
- **Delete an Invoice**
  - `DELETE /invoices/:id`
    - Replace `:id` with the invoice's unique identifier.

### User Invoices

- **Retrieve Invoices for a Specific User**
  - `GET /users/:userId/invoices`
    - Replace `:userId` with the user's unique identifier.

### Update Invoice Status

- **Update the Status of an Invoice**
  - `PUT /invoices/:id/status`
    - Replace `:id` with the invoice's unique identifier. Provide the new status in the request body.
