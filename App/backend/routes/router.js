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
            const qry = `SELECT username, fullname, entry_date  FROM users `;
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

// router.post('/addUser', async (req, res) => {
//     const user_name = 
//     const full_name =

//    // res.end ('NA')

//    pool.getConnection( (err, conn) => {
//        if (err) throw err;

//        const qry = `INSERT INTO users (username, fullname, entry_date) VALUES(?,?,now())`;
//        conn.query(qry, [user_name, full_name], (err, result) => {
//            conn.release();
//            if (err) throw err;
//            console.log('User Added added!');
//        });

//        res.redirect(process.env.redirect_url + '/addUsers');
//        res.end();
//    });
// });

module.exports = router;