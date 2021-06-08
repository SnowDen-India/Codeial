const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },

    //this defines the object of the liked object

    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },

    //this defines which is liked post or comment
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']

    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports=Like;