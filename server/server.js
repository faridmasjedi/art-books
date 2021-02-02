const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended:true}) );
server.use(express.json());

const db = mysql.createPool({
    host: 'mysql',//'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'art'
})

server.post('/app/add', (req,res) => {
    let {form , name, artist, year, image} = req.body;
    
    let sqlQuery = 'INSERT INTO info (form,name,artist,year,image) VALUES (?,?,?,?,?);'
    db.query( sqlQuery, [form, name, artist, year, image] , (err,result) => {
        if (err) { 
            console.log(err);
        }else{
            let id = result.insertId
            res.send({id})
        }
        
    })
})

server.get('/app/get', (req,res) => {
    let sqlQuery = 'SELECT * FROM info';
    db.query( sqlQuery, (err,result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

server.get('/app/art/:id', (req, res) => {
    let id = req.params.id
    let sqlQuery = `SELECT * FROM info WHERE id=${id}`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

server.put(`/app/update/:id` , (req,res) => {
    let {id,form,name,artist,year,image} = req.body;
    let sqlQuery = `UPDATE info SET form='${form}',name='${name}',artist='${artist}',year='${year}',image='${image}' WHERE id=${id}`;
    db.query( sqlQuery, [form, name, artist, year, image] , (err,result) => {
        if (err) { 
            console.log(err);
        
        }else{
            console.log(result)
            res.send(result);
        }
    })    
})

server.delete('/app/delete/:id', (req,res) => {
    let {id} = req.params;
    let sqlQuery = `DELETE FROM info WHERE id=${id}`
    db.query(sqlQuery, (err,result) => {
        if (err) {
            console.log(err);
        }
    })
})

server.post('/app/filter', (req,res) => {
    let {form,name,artist} = req.body;
    
    let formCondition = (form !== undefined && form !== "all") ? `form="${form}"` : `form=form`;
    let nameCondition = (name !== undefined && name !== "") ? `name="${name}"` : `name=name`; 
    let artistCondition = (artist !== undefined && artist !== "") ? `artist="${artist}"` : `artist=artist`; 

    let sqlQuery = `SELECT * FROM info WHERE ${formCondition} AND ${nameCondition} AND ${artistCondition};`;

        db.query(sqlQuery, (err,result) => {
            if (err) {
                return (err);
            }else{
                res.send(result);
            }
        })  
})


const PORT = process.env.PORT || 2357;
server.listen( PORT, () => console.log(`
    ------------------------
    http://localhost:${PORT}
    ------------------------
`))