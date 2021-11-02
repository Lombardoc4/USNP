require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {compare} = require('bcrypt');
const  { connectToDatabase }  = require("./util/mongodb");
const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser')
const stripeRouter = require('./routes/stripe');


const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(cors());
app.use(express.json())
// app.use(express.urlencoded());
// Add New User

// ***
// *** Stripe Test

app.use('/stripe', stripeRouter);

// *** Stripe Test
// ***


// Check user
app.post('/auth/login', async (req, res) => {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({
        email: req.body.email + '',
    })
    const err = {}
    if (!user) {
        err.email='User does not exist'
        return res.json({err: err});
    } else {
        err.email=false;
    }
    // const checkPassword = await compare(req.body.password, user.password)
    const passwordPass = true;

    err.password = !passwordPass ? 'Incorrect Password' : '';
    if (err.password)
        return res.json({err: err});

    delete user?.password;
    res.json(user)
});

app.post('/api/user/farms', async (req, res) => {
    const farms = req.body.farms.map(f=> new ObjectId(f))
    const { db } = await connectToDatabase();
    const userFarms = await db.collection('farms').find({"_id" : {"$in" : farms}}).toArray();
    res.json(userFarms)
    // const userFarms
})

app.post('/api/user-dash/farms', async (req, res) => {
    const farms = req.body.farms.map(f=> new ObjectId(f))
    const { db } = await connectToDatabase();
    const userFarms = await db.collection('farms').find({"_id" : {"$in" : farms}}).limit(6).toArray();
    res.json(userFarms)
    // const userFarms
})

app.get('/api/farms', async (req, res) => {

    const { db } = await connectToDatabase();
    const allFarms = await db.collection('farms').find({}).toArray();
    res.json(allFarms)
});

// TODO: figure out how users obtain plants to their name
// todo: -> Comes from orders & Inventory input
// app.post('/api/user/plants', async (req, res) => {
//     const plants = req.body.plants.map(p=> new ObjectId(p))
//     const { db } = await connectToDatabase();
//     const userFarms = await db.collection('generalPlants').find({"_id" : {"$in" : plants}}).toArray();
//     res.json(userFarms)
//     // const userFarms
// })

app.get('/api/plants', async (req, res) => {
    const { db } = await connectToDatabase();
    const allPlants = await db.collection('generalPlants').find({}).toArray();
    res.json(allPlants)
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
