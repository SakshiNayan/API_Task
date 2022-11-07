const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    cust_Id:{
        type :String,
        reuired: true
    },
    cust_name:{
        type :String,

    },
    Email:{
        type:String,
        reuired: true,
        unique: true
    },
    balance:{
        type : Number,
      
    },

});

const CustomerModal = mongoose.model("customer",customerSchema);
module.exports = CustomerModal;