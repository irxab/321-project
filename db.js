const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './database.db';

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log('Connected to the database');
    }
});

module.exports = db;