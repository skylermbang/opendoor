const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://localhost3/opendoor2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true,
        })
        .catch((err) => {

            console.log(err)
        }
        );
};

mongoose.connection.on("error", (err) => {

    console.error("Mongo DB connection error", err);
});

module.exports = connect;
