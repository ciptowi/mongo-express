require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Auth API, please visit the '/api/docs' endpoint to see the full documentation" });
});

const db = require("./app/models");
const Role = db.role;
const pass = encodeURIComponent(process.env.MONGO_PASS)
const doc = process.env.MONGO_DOC_NAME
db.mongoose
  .connect(`mongodb+srv://cipto:${pass}@cluster0.dwfw4.mongodb.net/${doc}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});