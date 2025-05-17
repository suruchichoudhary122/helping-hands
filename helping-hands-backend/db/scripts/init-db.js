// C:\project 1\helping-hands-backend\db\scripts\init-db.js
const fs = require('fs');
const path = require('path');
// Change this line:
const { pool } = require('../../db'); // Go up two levels to reach project root

const runSqlFile = async (filePath) => {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
    console.log(`Successfully executed: ${path.basename(filePath)}`);
    return true;
  } catch (err) {
    console.error(`Error executing ${path.basename(filePath)}:`, err);
    return false;
  }
};

const initDb = async () => {
  try {
    // Change these paths:
    const schemaResult = await runSqlFile(path.join(__dirname, '../schema.sql'));
    
    if (schemaResult && process.env.NODE_ENV !== 'production') {
      await runSqlFile(path.join(__dirname, '../seeds.sql'));
    }
    
    console.log('Database initialization complete');
  } catch (err) {
    console.error('Database initialization failed:', err);
  } finally {
    await pool.end();
  }
};

// Run the initialization if this file is executed directly
if (require.main === module) {
  initDb();
}

module.exports = initDb;