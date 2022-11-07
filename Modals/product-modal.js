const mongoose= require('mongoose')

const productSchema = new mongoose.Schema({
    product_Id:{
        type: String,
        required: true,
    },
    product_type:{
        type: String,
    
    },
    Item_name:{
        type: String
    },
    product_price:{
        type: Number
    },
    Available_quantity:{
        type: Number
    }
})

const ProductModal = mongoose.model("product",productSchema);
module.exports=ProductModal;