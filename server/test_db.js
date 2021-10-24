const {Connection} = require('./mongo/Connection')
const {find1, getPrompts} = require('./mongo/functions')
Connection.open().then((client) => {
    console.log('Hello tahj')
});

// find1('Schools', {}, function (err, docs) {
//     console.dir(docs);
// });

getPrompts('Clemson','Watt')
