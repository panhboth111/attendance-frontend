const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    pwd : {
        type : String,
        required : true,
        min : 6
    },
    employee_Id : {
        type: Number,
        require: true
    }
})


module.exports = mongoose.model('Credentials', schema)