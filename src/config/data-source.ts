import { DataSource } from 'typeorm';
import { User } from '../user/user.entity'; // Adjust path as necessary
import { Invoice } from '../invoice/invoice.entity'; // Adjust path as necessary
import { Item } from '../items/entities/item.entity'; // Adjust path as necessary

export const AppDataSource = new DataSource({
  type: 'mysql', // Database type
  host: 'localhost', // Database host
  port: 3306, // Port number
  username: 'myuser', // MySQL user
  password: 'mypassword', // MySQL password
  database: 'mydb', // Database name
  entities: [User, Invoice, Item],
  synchronize: false, // should be false in production
  logging: true,
  migrations: ['src/migration/**/*.ts'], // Adjust path as necessary
  subscribers: [],
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
