//for routing
const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');
require('dotenv/config');

router.get('/tweets', async (req, res) => {
    console.log('we have entereed')
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT u.username, u.firstname, t.tweet FROM users as u INNER JOIN tweets as t ON u.id=t.user_id  order by t.id desc`;
            console.log('qryccccc', qry)
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});

router.post('/addTweet', async (req, res) => {
     const userTweet = req.body.tweetInput;
    const userId = 4; // 1=codrkai, 2=eaglefang

    pool.getConnection( (err, conn) => {
        if (err) throw err;
        try {
            const qry = `INSERT INTO tweets (tweet, user_id) VALUES(?,?)`;
            conn.query(qry, [userTweet, userId], (err, result) => {
                conn.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error adding tweet' });
                  } else {
                    console.log('Tweet added!');
                    res.json({ message: 'Tweet added successfully' });
                  }
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error adding tweet' });
        }
       
    });
});

// Users routes
router.get('/users', async (req, res) => {
   
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT *  FROM users order by id desc `;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});

router.get('/getSingleUser', async (req, res) => {
    const user_id =  req.body.userid
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT *  FROM users where id = ? `;
            conn.query(qry, [user_id], (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});


router.post('/addUser', async (req, res) => {
    const user_name =  req.body.username;
    const first_name = req.body.firstname;
    const last_name = req.body.lastname;
    const email = req.body.email;
    const cellphone = req.body.cellphone

   pool.getConnection( (err, conn) => {
       if (err) throw err;

       const qry = `INSERT INTO users (username, firstname, lastname,email, cellphone, entry_date) VALUES(?,?,?,?,?,now())`;
       conn.query(qry, [user_name, first_name, last_name, email, cellphone], (err, result) => {
           conn.release();
           if (err) throw err;
           console.log('User Added added!');
       });

       res.redirect('https://valerietshiani.co.za/users');
       res.end();
   });
});
router.post('/deleteUser', async (req, res) => {
    const user_id =  req.body.userid
     console.log('user_id', user_id)

   pool.getConnection( (err, conn) => {
       if (err) throw err;

       const qry = `DELETE FROM users where id = ?`;
       conn.query(qry, [user_id], (err, result) => {
           conn.release();
           if (err) throw err;
           console.log('User Deleted!');
       });

       res.redirect(process.env.redirect_url + '/Users');
       res.end();
   });
});
router.post('/editUser', async (req, res) => {
    const user_id =  req.body.userid
    const user_name =  req.body.username;
    const first_name = req.body.firstname;
    const last_name = req.body.lastname;
    const email = req.body.email;
    const cellphone = req.body.cellphone
    const password = req.body.password
     console.log('the body', req.body)

   pool.getConnection( (err, conn) => {
       if (err) throw err;

       const qry = `UPDATE  users 
                    SET username = ?, firstname = ?, lastname = ?, email = ?, cellphone = ?, password = ? 
                    WHERE id = ?`;
       conn.query(qry, [user_name, first_name, last_name, email, cellphone, password,  user_id], (err, result) => {
           conn.release();
           if (err) throw err;
           console.log('User Updated!');
       });
     // add feedback from DB for success or no success, you need a try catch here
       res.redirect(process.env.redirect_url + '/Users');
       res.end();
   });
});

/// Handles login
router.post('/login', async (req, res) => {
    const userEmail = req.body.email;
   const userPassword = req.body.password; 

   console.log('userEmail' , userEmail )
   console.log('userPassword', userPassword)

   pool.getConnection( (err, conn) => {
       if (err) throw err;
       try {
           const qry = `Select * from users where (email = ?  or username = ?) and password = ? `;
           conn.query(qry, [userEmail, userEmail, userPassword], (err, result, data) => {
               conn.release();
               if (err  || result.length === 0) {
                   console.log(err);
                   res.status(500).json({ message: 'Login details not found', result : [] });
                 } else {
                        console.log('Login successfully');
                        console.log('results', result)
                        res.json({ message: 'Login successfully', result: result });

                  }
                 
                 
           });
       }
       catch (error) {
           console.log(error);
           res.status(500).json({ message: 'Error in login' });
       }
      
   });
});

module.exports = router;