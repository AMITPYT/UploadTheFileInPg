// const express = require('express');
// const multer = require('multer');
// const { Client } = require('pg');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Create a new PostgreSQL client
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'uploadFolder',
//   password: '123456789',
//   port: 5432, // Usually 5432 by default
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads'); // Directory to save uploaded files
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${file.originalname}`); // Rename file if needed
//     },
//   });
  
//   const upload = multer({ storage });
  
//   app.post('/upload', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
  
//     const filePath = path.join(__dirname, 'uploads', req.file.filename);
  
//     try {
//       await client.connect();
  
//       // Insert file details into the database
//       const insertQuery = 'INSERT INTO file_storage (file_name, file_path) VALUES ($1, $2) RETURNING *';
//       const values = [req.file.originalname, filePath];
//       const result = await client.query(insertQuery, values);
  
//       res.status(200).json({ message: 'File uploaded successfully', fileDetails: result.rows[0] });
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } finally {
//       await client.end();
//     }
//   });
  
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });




const { Client } = require('pg');


const client = new Client({
  user: 'postgres',
    host: 'localhost',
    database: 'CG_Database',
    password: '123456789',
    port: 5432,
});


client.connect();


async function getIDByName(tableName, columnName, searchName,) {
  try {
    const query = `
      SELECT id FROM ${tableName} 
      WHERE ${columnName} = $1
    `;
    // console.log(query);
    const result = await client.query(query, [searchName]);
    // console.log(result);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      // console.log('No matching record found.');
      return null; 
    }
  } catch (error) {
    console.error('Error executing query:', error);
    return null;
  }
}


async function findBankOrPortfolioID() {
  const bankID = await getIDByName('cities', 'name', 'hj');
  const portfolioID = await getIDByName('zones', 'name', 'hj');

  console.log('Bank ID:', bankID);
  console.log('Portfolio ID:', portfolioID);
}

findBankOrPortfolioID()
  .then(() => client.end())
  .catch(err => {
    console.error('Error:', err);
    client.end();
  });




// Your existing connection setup code
// const { Client } = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'CG_Database',
//   password: '123456789',
//   port: 5432,
// });

// client.connect();

// // Function to get the ID based on name
// async function getIDByName(tableName, columnName, searchName) {
//   try {
//     const query = `
//       SELECT id FROM ${tableName} 
//       WHERE ${columnName} = $1
//     `;
    
//     const result = await client.query(query, [searchName]);
    
//     if (result.rows.length > 0) {
//       return result.rows[0].id;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error executing query:', error);
//     return null;
//   }
// }

// // Function to insert data into a table
// async function insertData(tableName, columns, values) {
//   try {
//     const query = `
//       INSERT INTO CG_Database.${tableName} (${columns.join(', ')})
//       VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
//       RETURNING id;
//     `;
//     console.log(query);
//     const result = await client.query(query, values);
    
//     if (result.rows.length > 0) {
//       return result.rows[0].id;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error executing query:', error);
//     return null;
//   }
// }

// // Usage example
// async function findBankOrPortfolioID() {
//   const bankID = await getIDByName('cities', 'name', 'hj');
//   const portfolioID = await getIDByName('zones', 'name', 'hj');

//   console.log('Bank ID:', bankID);
//   console.log('Portfolio ID:', portfolioID);

//   // Insert data into a table (Example)
//   const insertedRowID = await insertData('cities', ['name', 'stateId'], ['ludhi', '2']);
//   console.log('Inserted Row ID:', insertedRowID);
// }

// findBankOrPortfolioID()
//   .then(() => client.end())
//   .catch(err => {
//     console.error('Error:', err);
//     client.end();
//   });
