const app = require('./src/app'); // app init
const mongoose = require('mongoose');

// database init
// replace with actual db password
const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);

// mongoDB init
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
}).then((con) => console.log('DB connection created!'));

// port init
const port = process.env.PORT;

// server start
app.listen(port, () => {
    console.log(`app running on port ${port}`)
});
