const { Client } = require('pg');

// Add connection to PostgreSQL database
const client = new Client({
    host: 'localhost',
    user: 'postgres', // replace with your PostgreSQL username
    password: 'Kurtikka55', // replace with your PostgreSQL password
    database: 'fitness_app', // replace with your PostgreSQL database name
    port: 5432 // default PostgreSQL port
});

// checking for connection error to PostgreSQL ELSE provide logging message to affirm connection success
client.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err);
        return;
    }
    console.log('Connected to PostgreSQL');
});

module.exports = client;


