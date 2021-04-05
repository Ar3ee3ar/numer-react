const mongoose = require('mongoose')
const Schema = mongoose.Schema
console.log("in-model")
const example = new Schema(
    {
        method: {type: String, required:true},
        fx: {type: String, required:false},
        xl: {type: Number, required: false},
        xr: {type: Number, required: false},
        x: {type: Number,required: false},
        row: {type:Number ,required:false},
        column: {type: Number, required:false},
        A:{type:[[Number]],required:false},
        B:{type:[[Number]],required:false},
        initial:{type:[Number],required:false},
        all_point:{type: Number, required:false},
        x_target:{type: Number, required:false},
        inter_point:{type: Number, required:false},
        array_x:{type:[Number],requird:false},
        array_y:{type:[Number],requird:false},
        point:{type:[Number],requird:false},
        m:{type: Number, required:false},
        array_x_multi:{type:[[Number]],requird:false}
    },
    { timestamps: true },
)
console.log("out-model")
module.exports = mongoose.model('examples',example)