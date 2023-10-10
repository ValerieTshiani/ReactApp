//for routing
const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');
require('dotenv/config');

router.get('/tweets', async (req, res) => {
    // const str =  [{
    //     "name" : "cider kai",
    //     "msg" : "this is my first tweet" ,
    //     "username" : "actual words"

    // }];
    // res.end(JSON.stringify('str'));
    

    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT u.username, u.fullname, t.tweet FROM users as u INNER JOIN tweets as t ON u.id=t.user_id`;
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

    // res.end ('NA')

    pool.getConnection( (err, conn) => {
        if (err) throw err;

        const qry = `INSERT INTO tweets (tweet, user_id) VALUES(?,?)`;
        conn.query(qry, [userTweet, userId], (err, result) => {
            conn.release();
            if (err) throw err;
            console.log('Tweet added!');
        });

        res.redirect(process.env.redirect_url + '/tweets');
        res.end();
    });
});

// Users routes
router.get('/users', async (req, res) => {
   
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT *  FROM users `;
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

   // res.end ('NA')

   pool.getConnection( (err, conn) => {
       if (err) throw err;

       const qry = `INSERT INTO users (username, firstname, lastname,email, cellphone, entry_date) VALUES(?,?,?,?,?,now())`;
       conn.query(qry, [user_name, first_name, last_name, email, cellphone], (err, result) => {
           conn.release();
           if (err) throw err;
           console.log('User Added added!');
       });

       res.redirect(process.env.redirect_url + '/Users');
       res.end();
   });
});
router.post('/deleteUser', async (req, res) => {
    const user_id =  req.body.userid
     console.log('user_id', user_id)

   // res.end ('NA')

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

   // res.end ('NA')

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

module.exports = router;