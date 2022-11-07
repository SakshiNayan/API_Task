const mongoose= require('mongoose')

const orderSchema = new mongoose.Schema({
    cust_Id:{
        type :String,
        reuired: true
    },
    product_Id:{
        type: String,
        required: true,
    },
    Item_name:{
        type: String
    },

    Quantity:{
        type: Number
    }
})

const OrderModal = mongoose.model("order", orderSchema);
module.exports = OrderModal;