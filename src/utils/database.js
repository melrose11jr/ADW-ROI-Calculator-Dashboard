const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER,
        doctor_name TEXT,
        data TEXT
    )`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table created successfully.');
    }
});