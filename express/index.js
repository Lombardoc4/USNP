require('dotenv').config()
const express = require('express');
const cors = require('cors');
const {compare} = require('bcrypt');
const  { connectToDatabase }  = require("./util/mongodb");
const ObjectId = require('mongodb').ObjectId;
// const bodyParser = require('body-parser')


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json())
// app.use(express.urlencoded());
// Add New User


// Check user
app.post('/auth/login', async (req, res) => {
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

    delete user?.password;
    res.json(user)
});

app.post('/api/user/farms', async (req, res) => {
    const farms = req.body.farms.map(f=> new ObjectId(f))
    const { db } = await connectToDatabase();
    const userFarms = await db.collection('farms').find({"_id" : {"$in" : farms}}).limit(6).toArray();
    res.json(userFarms)
    // const userFarms
})

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
