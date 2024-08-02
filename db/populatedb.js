#! /usr/bin/env node
const { Client } = require('pg');
require('dotenv').config();


const url = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
console.log('connecting to ', url);

const client = new Client({
  connectionString: url,
});


async function createTables() {
  try {
    // Create Type table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Type (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL UNIQUE
            );
        `);

    // Create Trainer table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Trainer (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                age INT
            );
        `);

    // Create Pokemon table
    await client.query(`
            CREATE TABLE IF NOT EXISTS Pokemon (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                type_id INT NOT NULL,
                trainer_id INT,
                FOREIGN KEY (type_id) REFERENCES Type(id),
                FOREIGN KEY (trainer_id) REFERENCES Trainer(id) ON DELETE SET NULL
            );
        `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err.stack);
  }
}

async function insertJunkData() {
  try {
    // Insert into Type table
    await client.query(`
            INSERT INTO Type (name) VALUES 
            ('Fire'),
            ('Water'),
            ('Grass'),
            ('Electric'),
            ('Psychic')
        `);

    // Insert into Trainer table
    await client.query(`
            INSERT INTO Trainer (name, age) VALUES 
            ('Ash', 10),
            ('Misty', 12),
            ('Brock', 15)
        `);

    // Insert into Pokemon table
    await client.query(`
            INSERT INTO Pokemon (name, type_id, trainer_id) VALUES 
            ('Pikachu', (SELECT id FROM Type WHERE name = 'Electric'), (SELECT id FROM Trainer WHERE name = 'Ash')),
            ('Charizard', (SELECT id FROM Type WHERE name = 'Fire'), (SELECT id FROM Trainer WHERE name = 'Ash')),
            ('Squirtle', (SELECT id FROM Type WHERE name = 'Water'), (SELECT id FROM Trainer WHERE name = 'Misty')),
            ('Bulbasaur', (SELECT id FROM Type WHERE name = 'Grass'), NULL);
        `);

    console.log('Junk data inserted successfully');
  } catch (err) {
    console.error('Error inserting junk data', err.stack);
  }
}

async function clearOldData() {
  try {
    // Clear data from Pokemon table
    await client.query('DELETE FROM Pokemon;');
    // Clear data from Trainer table
    await client.query('DELETE FROM Trainer;');
    // Clear data from Type table
    await client.query('DELETE FROM Type;');

    console.log('Old data cleared successfully');
  } catch (err) {
    console.error('Error clearing old data', err.stack);
  }
}


(async () => {
  await client.connect();

  try {
    console.log('Clearing old data');
    await clearOldData()
    console.log('Done');

    console.log('Creating tables');
    await createTables();
    console.log('Done');

    console.log('Inserting new data');
    await insertJunkData();
    console.log('Done');
  } finally {
    await client.end();
  }
})()