const {Connection} = require('./Connection')
const {find} = require('./functions')
Connection.open().then((client) => {
    console.log('Hello tahj')
});

find('Schools', {}, function (err, docs) {
    console.dir(docs);
});
