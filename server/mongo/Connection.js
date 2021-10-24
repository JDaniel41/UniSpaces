const MongoClient = require("mongodb").MongoClient;

class Connection {
    static async open() {
        console.log(this.url);
        console.log(process.env);
        if (this.client) return this.client;

        try {
            this.client = await MongoClient.connect(this.url);
            return this.client;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

Connection.db = null;
Connection.url = `mongodb+srv://tahja:${process.env.MONGO_PASSWORD}@cluster0.cj6cb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = { Connection };
