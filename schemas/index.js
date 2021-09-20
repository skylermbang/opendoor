const mongoose = require("mongoose");

const connect = () => {
  mongoose

    //  test:test id/pws @ ip
    //  mongodb://test:test@13.125.199.244:27017 => aws
    // mongodb://localhost/asg2 => local
    //mongodb://test:test@3.34.142.192:27017

    .connect("mongodb://localhost/asg2", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
