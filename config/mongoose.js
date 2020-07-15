const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/contacts_list_db');
mongoose.connect(
   "mongodb+srv://sonu:sonu@free-cluster-t4e4s.mongodb.net/Contact_List?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connection to db"));
db.once("open", function () {
   console.log("Successfully connect to the database");
});
