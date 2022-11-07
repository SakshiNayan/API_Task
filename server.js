const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const CustomerModal = require('./Modals/cutomer-modal');
const ProductModal = require('./Modals/product-modal');
const OrderModal = require('./Modals/order-modal');

//middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({
    extended: false
}));

//server connection
app.use(bodyParser.json())
let PORT = 3005

//database connection
mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment", {
    useNewUrlParser: true
});
let Connection = mongoose.connection
Connection.once("connected", () => {
    console.log("mongoDb sucessfully connected")
})

//Product
app.post('/product', async(req,res)=>{
    try{
        const new_Product = new ProductModal({
            product_Id : req.body.product_Id,
            product_type : req.body.product_type,
            Item_name : req.body.Item_name,
            product_price : req.body.product_price,
            Available_quantity : req.body.Available_quantity
        });
        await ProductModal.create(new_Product);
        res.status(200).send("Product is added Successfully ")
    }
    catch(err){
        res.status(400).send(err.message)
    }
})
app.get('/product',function(req,res){
    try{
        ProductModal.find().then((product)=>{
            res.status(200).send(product)
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }

});
app.get("/product/electronics",(req,res)=>{
    try{
        ProductModal.find({product_type:"Electronics"}).then((data)=>{
            //console.log(data)
            res.status(200).send(data)
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
});
app.get("/product/furniture",(req,res)=>{
    try{
        ProductModal.find({product_type:"Furniture"}).then((data)=>{
            //console.log(data)
            res.status(200).send(data)
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
});

//Customer
app.post("/customer",(req,res)=>{
    CustomerModal.find({Email : req.body.Email}).then((email)=>{
        if(!email.length){
            try{
                const new_Customer = new CustomerModal({
                    cust_Id: req.body.cust_Id,
                    cust_name: req.body.cust_name,
                    Email : req.body.Email,
                    balance: req.body.balance

                });
                CustomerModal.create(new_Customer);
                res.status(200).send("Customer is added Successfully")
            }
            catch(err){
                res.status(400).send(err)
            }
        }
        else{
            res.status(400).send("Email is already Exist!")
        }
    })
});
app.get('/customer',(req,res)=>{
    try{
        CustomerModal.find().then((cust)=>{
            res.status(200).send(cust)
        })
    }
    catch(err){
        res.status(400).send(err)
    }
});

//Order
app.post('/order', async(req,res)=>{
    try {
        const new_order = new OrderModal({
            cust_Id: req.body.cust_Id,
            product_Id: req.body. product_Id,
            Item_name: req.body.Item_name,
            Quantity: req.body.Quantity
        });
        await OrderModal.create(new_order);

        const item = await ProductModal.find({ product_Id: req.body.product_Id })
    
        if (item.length) {
            
            if (req.body.Quantity < item[0].Available_quantity) {
                const setquantity = item[0].Available_quantity - req.body.Quantity
                await ProductModal.updateOne({product_Id: req.body.product_Id }, { Available_quantity: setquantity })
                res.status(200).send('Order details added sucessfully')
            }  
            else { res.send("Out of Stock") }
            
        } else { res.send("No such product is avaliable") }
        // const cust_bal = await CustomerModal.find({cust_Id : req.body.cust_Id})
        // if(cust_bal.length){
        //     const curPrice = req.body.Quantity * req.body.product_price
        //     if(curPrice < req.body.balance){
        //         const setPrice = item[0].balance - curPrice
        //         await CustomerModal.updateOne({cust_Id: req.body.cust_Id},{balance: setPrice})
        //         res.status(200).send("Sufficient balance")
                    
        //     }else{
        //         res.send("Customer You have Insufficient Balance")
        //     }
        // }

    } catch (err) {
       res.status(400).send(err)
    }
});
app.get('/order', (req,res)=>{
    try {
        OrderModal.find().then((orders) => {
            res.status(200).send(orders)
        })
    } catch (err) {
       res.status(400).send(err)
    }
})




app.get('/',(req,res)=>{
    res.send('API TASK ASSIGNMENT')
})

app.listen(PORT, () => {
    console.log(`App is litening to ${PORT}`)
})