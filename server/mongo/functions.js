const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const {Connection} = require('./Connection')

function insert(client){
    Connection.open().then((client) => {

    })
}
function find (name, query, cb) {
    Connection.open().then(async (client) => {
        
        var SchoolsSchema = new mongoose.Schema({
            Name: String,
            Buildings: Array,
            Building: Array
        })
        
        const doc = await SchoolsSchema.findOne();

        doc instanceof SchoolsSchema; // true
        doc instanceof mongoose.Model; // true
        doc instanceof mongoose.Document; // true

        const collection = client.db("WebAppData").collection("Schools");
        collection.find(query).toArray(cb);
    }).catch((error) => {
        console.log(error)
    });
}

module.exports = {find}
