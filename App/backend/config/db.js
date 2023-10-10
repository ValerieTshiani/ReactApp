const mysql =require("mysql");
require('dotenv/config');

// const pool = mysql.createPool({
//   connectionLimit: 10,    // the number of connections will node hold open to our database
//   password: "password", //process.env.DB_PASSWORD
//   user: "root_v2", //process.env.DB_USER
//   database: "tester2023_10-08",//process.env.DB_DATABASE
//   host:  "sxb1plzcpnl503464.prod.sxb1.secureserver.net" //"localhost", //process.env.DB_HOST
//   //port: "3306"//process.env.PORT

// });
const pool = mysql.createPool({
  connectionLimit: 10,    // the number of connections will node hold open to our database
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host:  process.env.DB_HOST
  //port: "3306"//process.env.PORT

});

// let db = {}; //create an empty object  that you will use later to write  and export your queries. 

// db.getAllEmployees = () =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM Employee ',  (error, employees)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(employees);
//         });
//     });
// };
// getOneEmployee = (id) =>{
//   return new Promise((resolve, reject)=>{
//       pool.query('SELECT * FROM Employee WHERE id= ?', [id], (error, employee)=>{
//           if(error){
//               return reject(error);
//           }
//           return resolve(employee);
//       });
//   });
// };
// insertEmployee = (name, position, wage) =>{
//   return new Promise((resolve, reject)=>{
//       pool.query('INSERT INTO Employee (name, position, wage) VALUES (?, ?, ?)', [name, position, wage], (error, result)=>{
//           if(error){
//               return reject(error);
//           }
           
//             return resolve(result.insertId);
//       });
//   });
// };

// updateEmployee = (name, position, wage, id) =>{
//   return new Promise((resolve, reject)=>{
//       pool.query('UPDATE Employee SET name = ?, position= ?, wage= ? WHERE id = ?', [name, position, wage, id], (error)=>{
//           if(error){
//               return reject(error);
//           }
           
//             return resolve();
//       });
//   });
// };

// deleteEmployee = (id) =>{
//   return new Promise((resolve, reject)=>{
//       pool.query('DELETE Employee WHERE id= ?', [id], (error)=>{
//           if(error){
//               return reject(error);
//           }
//             return resolve();
       
//       });
//   });
// };

module.exports = pool