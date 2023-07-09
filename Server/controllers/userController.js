const postUser = require('../models/postUser')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const sign_up = async (req, res) => {
    
  postUser.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "E-mail already exists",
        });
      } else {

        postUser.find({name: req.body.name}).exec()
        .then(user2 => {
          if (user2.length > 0) {
            return res.status(409).json({
              message: "Username already taken"
            });
          }
          else{

            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              } else {
                const user = new postUser({
                  name : req.body.name,
                  email: req.body.email,
                  password: hash,
                  events_applied : [],
                  events_posted : [],
                  events_applied_approved : [],
                  events_posted_formed : [],
                });
    
                user
                  .save()
                  .then((result) => {
                    res.status(201).json({
                      message: "New User Created",
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({
                      error: err,
                    });
                  });
              }
            });

          }

        })        
      }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
};


//Login in the users
const sign_in = async (req, res) => {

  postUser.find({ email: req.body.email })
    .exec()
    .then(users => {
        if(users.length == 0){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result){

                const token = jwt.sign({
                    email:users[0].email,
                    userId: users[0]._id,
                    name:users[0].name
                },
                `${process.env.JWT_SECRET_KEY}`,
                {
                    expiresIn : "1h"
                }
                );


                return res.status(200).json({
                    message : "Authentication successfull",
                    token : token
                });
            }
            res.status(401).json({
                message: "Authentication failed"
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error : `err4, ${err}`
        });
    });
    
}

module.exports = {
  sign_up,
  sign_in
};
