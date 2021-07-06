const {Schema, model, Types} = require('mongoose')
const schema = new Schema({
    date:  { type: Date, default: Date.now } ,
    text: {type: String, required: true},
    isCompleted: { type: Boolean, required: true},
    owner: { type: Types.ObjectId, required: true}

})
module.exports = model("todos", schema)