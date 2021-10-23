const MongoClient = require("mongodb").MongoClient;

class Connection {
    static async open() {
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
Connection.url = `mongodb+srv://tahja:Q9S9MIlWT5fhCiGn@cluster0.cj6cb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = { Connection };