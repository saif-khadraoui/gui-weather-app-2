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

// connect to the database
mongoose.connect(`mongodb+srv://saifkhadraoui656:${mongodb_password}@cluster0.affvno1.mongodb.net/`).then((response) => {
    if(response){
        console.log("connected to db")
    }
})

// api endpoints to query the database

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

        const isMatch =  bcrypt.compare(password, user.password);

        if (isMatch) {
            // Passwords match
            res.send(user);
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
            console.log(savedLocations[i].id)
            const count = await UsersModel.find({_id: userId, locations: {$elemMatch: {id: savedLocations[i].id}}})
            console.log(count)
            if(count){
                await UsersModel.updateOne({ _id: userId }, {$push: {locations: savedLocations[i]}})
            } else{
                console.log("duplicate found: ", savedLocations[i].name)
            }
        }
        res.send("items added")
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/updateCropPreference", async(req, res) => {
    const { userId, savedCrops } = req.body;
    console.log(savedCrops)

    try{
        for(let i=0; i<=savedCrops.length-1; i++){
            console.log(savedCrops[i])
            const count = await UsersModel.find({_id: userId, crops: {$elemMatch: {id: savedCrops[i]}}})
            console.log(count)
            if(count){
                await UsersModel.updateOne({ _id: userId }, {$push: {crops: savedCrops[i]}})
            } else{
                console.log("duplicate found: ", savedCrops[i])
            }
        }
        res.send("items added")
    } catch(err){
        console.log(err)
        res.send(err)
    }
})

app.post("/api/deleteSavedLocation", async(req, res) => {
    const { userId, locationId } = req.body;
    console.log(userId, locationId)

    try{
        const response = await UsersModel.updateOne({_id: userId}, {
            $pull: {
                locations: 
                {
                    id: locationId
        }}})
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }

})

app.post("/api/deleteSavedCrop", async(req, res) => {
    const { userId, crop } = req.body;
    console.log(userId, crop)

    try{
        const response = await UsersModel.updateOne({_id: userId}, {
            $pull: {
                crops: crop
            }})
        res.send(response)
    } catch(err){
        console.log(err)
        res.send(err)
    }

})

// start the server
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
