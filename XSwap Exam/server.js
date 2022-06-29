const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "xswap-exam"
});


app.post('/api/login', async (req, res) => {

    const schema = Joi.object({
        email : Joi.string()
            .email()
            .required(),
        
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(8),
    });

    try {
        
        await schema.validateAsync(req.body);

        db.query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [req.body.email, req.body.password],
            (err, result) => {
                if(err) {
                    res.send({error: err});
                }
                
                if(result.length > 0) {
                    res.json(result);
                }else{
                    res.json({message : "Wrong username or password."});
                }   
            }
        );
        
    }catch (err) {
        res.json({
            error : err.details
        });
    }
   
});

app.post('/api/register', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (email, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    );

    res.sendStatus(201);
});



app.listen(3001, () => console.log(`Listening on port 3001`));