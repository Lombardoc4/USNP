// Check user
app.get('/', async (req, res) => {
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