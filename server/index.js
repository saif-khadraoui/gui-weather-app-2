const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UsersModel = require("./utils/models/User")

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 1999
const mongodb_password = "ZGinYe4ggKtnB73b"

mongoose.connect(`mongodb+srv://saifkhadraoui656:${mongodb_password}@cluster0.affvno1.mongodb.net/`).then((response) => {
    if(response){
        console.log("connected to db")
    }
})

app.post("/api/register", async(req,res) => {
    const { email, username, password } = req.body;

    const user = new UsersModel({
        email: email,
        username: username,
        password: password
    })

    try{
        const response = user.save()
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.get("/api/login", async(req, res) => {
    const { username, password } = req.query;

    try{
        const response = await UsersModel.find({ username: username, password: password })
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.get("/api/getProfile", async(req, res) => {
    const { id } = req.query;

    try{
        const user = await UsersModel.find({ _id: id })
        res.send(user)
    } catch(err){
        console.log(err)
        res.send(err)
    }
})




app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})