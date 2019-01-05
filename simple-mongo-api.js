require ('dotenv').config()

var express = require('express')
var app = express()
var port = process.env.PORT || 4001
var mongodbUri = process.env.MONGO_CONNECTION_STRING
var mongoose = require('mongoose')
mongoose.connect(mongodbUri, { useNewUrlParser: true, useFindAndModify: false, 'useCreateIndex': true })

var Schema = mongoose.Schema

var blacklistedSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    blacklisted: Object,
})

var BlacklistedModel = mongoose.model('user', blacklistedSchema)

app.get('/user/:id', async (req, res) => {
    var user = await BlacklistedModel.findOne({'_id': mongoose.Types.ObjectId(req.params.id)}, {'_internal': 1}).exec()
    res.send(user)
})

app.listen(port)