import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/items", async(req,res) =>{
    try{
        const item = req.body["text"];

        const query = await connection.query(`
        INSERT INTO list
        (item) VALUES ($1)
        `, [item])
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.get("/items", async (req,res)=>{
    try{
        const query = await connection.query(`
            SELECT * FROM list
            `)
        res.send(query.rows)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

export default app;
