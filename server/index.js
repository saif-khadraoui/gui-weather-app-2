const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UsersModel = require("./utils/models/User")
const bcrypt = require('bcrypt');


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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UsersModel({
        email: email,
        username: username,
        password: hashedPassword
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
        const user = await UsersModel.findOne({ username: username });

        // Check if user exists
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Passwords match
            res.send("Login successful");
        } else {
            // Passwords do not match
            res.status(400).send("Incorrect username or password.");
        }


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

app.post("/api/updateLocationPreference", async(req, res) => {
    const { userId, savedLocations } = req.body;

    try{
        for(let i=0; i<=savedLocations.length-1; i++){
            await UsersModel.findOneAndUpdate({_id: userId}, {$push: {
                locations: savedLocations[i]
            }})
        }
        // const response = await UsersModel.findOneAndUpdate({_id: userId}, {$push: {
        //     locations: savedLocations
        // }})
        res.send("items added")
    } catch(err){
        console.log(err)
        res.send(err)
    }
})


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
