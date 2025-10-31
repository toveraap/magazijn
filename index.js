const express =  require('express');
const mongoose = require('mongoose');
const app = express();



app.get('/', (req, res) =>{
    res.send('Hello world');
});

app.post('/api/products', (req, res) => {
    res.send('data recieved');
});

mongoose.connect("mongodb+srv://zanevanhooren_db_user:FzXXRivQoZReNT5K@cluster0.kcgmsuw.mongodb.net/Node-Api?appName=Cluster0")
.then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
    console.log('running');
});
})
.catch(() => {
    console.log('connection failed');
});