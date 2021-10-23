const MongoClient = require("mongodb").MongoClient;
const {Connection} = require('./Connection')

function insert(client){

}

function find (name, query, cb) {
    Connection.open().then((client) => {
        const collection = client.db("WebAppData").collection("Schools");
        collection.find(query).toArray(cb);
    }).catch((error) => {
        console.log(error)
    });
}

module.exports = {find}
