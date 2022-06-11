const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const dotenv = require("dotenv");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(cors());

// endpoints
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.use("/static", express.static("public"));

//listner
app.listen(port, () => console.log("Server Running on", port));
