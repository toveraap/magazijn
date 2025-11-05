const express =  require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);
app.use(express.static('public'));

 
app.get('/', (req, res) =>{
    res.send('Hello world');
});

mongoose.connect("mongodb+srv://zanevanhooren_db_user:FzXXRivQoZReNT5K@cluster0.kcgmsuw.mongodb.net/Node-Api?appName=Cluster0")
.then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
    console.log('running');
    });
})
.catch(() => {
    console.log('connection failed to database!');
});