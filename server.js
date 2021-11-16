const express = require("express");
const mongoose = require("mongoose");
const uri = require("../env.json");
const port = 3001;
const socket = require("socket.io");
const cors = require("cors");
const LaboratoryQueue = require("./models/LaboratoryQueue");
const UserSchema = require("./models/UsersSchema");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

const Registration = require("./routes/Auth/Reg");
app.use("/registration", Registration);
const Login = require("./routes/Auth/Login");
app.use("/login", Login);
const log = require("./login/loginCreateuser");
app.use("/home", log);

const GetUsers = require("./routes/getUsers");
app.use("/users", GetUsers);

const Check = require("./routes/checkUserRole");
const administratorSchema = require("./models/administratorSchema");
const queueSchema = require("./models/queueSchema");
app.use("/check", Check);

mongoose.connect(uri.BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});
const InvoiceGenerator = require("./InvoiceGenerator");
const item = require("./config/intems");
const ig = new InvoiceGenerator(item);
ig.generate();

app.get("/", (req, res) => {
  console.log("req.body");
  const administrator = new administratorSchema({
    username: "laborator",
    password: bcrypt.hashSync("laborator", 7),
    role: "laborator",
  });
  administrator.save((err, doc) => {
    if (!err) {
      res.json(doc);
    }
  });
});
io = socket(server);
const connection = mongoose.connection;
const changeStream = queueSchema.watch();

io.of("api/socket").on("connection", (socket) => {
  socket.emit("connection", null);
  console.log(socket.id);
  socket.emit("join_room", "hello client");
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });
  changeStream.on("change", (change) => {
    console.log(change, "Asdad");
    socket.emit("newUserAdministrator");
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

connection.once("open", () => {
  console.log("MongoDB database connected");
  console.log("Setting change streams");
});
