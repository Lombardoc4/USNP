require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {compare} = require('bcrypt');
const  { connectToDatabase }  = require("./util/mongodb");
// const bodyParser = require('body-parser')


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json())
// app.use(express.urlencoded());
// Add New User
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Check user
app.post('/auth/login', async (req, res) => {
    console.log(req.body.email)
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({
        email: req.body.email + '',
    })
    console.log('minished', user)
    if (!user)
        return res.send('No Data');

    // const checkPassword = await compare(req.body.password, user.password)
    const checkPassword = true

    if (!checkPassword)
        return res.send('Incorrect Password')

    console.log('dbUSe', user)
    delete user?.password;
    res.json(user)
    // const { email } = req.params;
    // const currUser = await db
    //     .collection("users")
    //     .findOne({email: email});
    // res.json(currUser);
});

app.get('/api/plants', async (req, res) => {
    const { db } = await connectToDatabase();
    const allPlants = await db.collection('generalPlants').find({}).toArray();
    console.log('minished', allPlants)
    // if (!user)
        // return res.send('No Data');

    // const checkPassword = await compare(req.body.password, user.password)
    // const checkPassword = true

    // if (!checkPassword)
        // return res.send('Incorrect Password')

    // console.log('dbUSe', user)
    // delete user?.password;
    res.json(allPlants)
    // const { email } = req.params;
    // const currUser = await db
    //     .collection("users")
    //     .findOne({email: email});
    // res.json(currUser);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
