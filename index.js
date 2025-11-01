const express =  require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);
 
app.get('/', (req, res) =>{
    res.send('Hello world');
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);
       

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
                res.status(500).json({message: error.message});

    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: "product not found"});
        }

        res.status(200).json({message: "Product deleted succsessfullt"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
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