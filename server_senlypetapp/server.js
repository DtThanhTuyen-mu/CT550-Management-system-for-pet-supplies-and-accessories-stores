const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
dotenv.config();
const app = express();

// Ket noi den mongdb
mongoose.set("strictQuery", false);
mongoose
.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to mongodb "))
.catch((err) => console.log("Could not connect to database" + err));

//Midllewarers
const server = http.createServer(app);
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./models/Customer");
require("./models/News");
// Import cac routes
const customerRouter = require("./routes/customerRoutes");
const requireToken = require('./middlewares/authTokenRequired');
const postNews = require('./routes/newsRoutes');
const getNews = require('./routes/newsRoutes')
const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const Category = require("./models/Category");
const service = require("./routes/serviceRoutes");
const Service = require("./models/Service");
const Role = require("./models/Role");
const role = require("./routes/roleRoutes");
const staff = require("./routes/staffRoutes");
const schedule = require("./routes/scheduleRoutes");
const reschedule = require("./routes/reScheduleRoutes");
const payment = require("./routes/paymentRoutes");
const categoryservice = require("./routes/categoryServiceRoute");
const review = require("./routes/reviewRoutes");
const notification = require("./routes/notificationRoutes");
const chat = require("./routes/ChatsRoutes");
const salary = require("./routes/salaryRoute");
const pets = require('./routes/petRoutes');

app.use("/api", postNews);
app.use("/api", getNews);
app.use("/api", category);
app.use("/api", product);
app.use("/api", service);
app.use("/api", role); 
app.use("/api", staff); 
app.use("/api", schedule); 
app.use("/api", reschedule); 
app.use("/api", payment); 
app.use("/api", categoryservice); 
app.use("/api", review); 
app.use("/api", notification); 
app.use("/api", chat); 
app.use('/api', customerRouter);
app.use('/api', salary);
app.use('/api', pets);

const PORT = 3000;
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running at ${PORT}`);
  }
});
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3001",
        methods: ["GET", "POST"],
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
  users.push({ userId, socketId });
  !users.forEach((user) => {
    if(user.userId === userId && user.socketId !== socketId){
      user.socketId = socketId
    }
  })   
}

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)? users.find((user) => user.userId === userId):null;
}

io.on("connection", (socket) => {
  //khi ket noi
  console.log("a user connected. " + socket.id);

  // io.emit("Welcome", "Hello this is socket server!") gui tu server ve client
  // Lấy userId an socketio tu  user
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Gui va lay tin nhan
  socket.on("sendMessage", ({ senderId, senderName,receiverId, text }) => {
    // console.log("receiverId: ", receiverId);  console.log("users: ", users);
    const user = getUser(receiverId);
    user !== null ?
      io.to(user.socketId).emit("getMessage", {
        senderId,
        senderName,
        text
      })
      : null;
  });

//Khi ngat ket noi
  socket.on("disconnect", () => {
    console.log("a user disconnect!!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  })

})
