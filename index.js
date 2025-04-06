
require('dotenv').config();
const PresentationRouter = require("./src/routers/PresentationRouter");
// const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors"); 
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
/////////////////////////////////////
// const corsOptions = {
//   origin: ['https://taleem-help-backoffice.vercel.app/', 'http://localhost:5173' , 'https://taleem.help'],
//   methods: 'POST', // Specify the allowed HTTP methods, e.g., 'GET', 'POST', 'PUT', etc.
//   allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
// };
// app.use(cors('*', corsOptions)); //working
app.use(cors());
app.use(express.json());
app.use(cookieParser());
/////////////////////////Models////////////////////////
app.use('/presentation', PresentationRouter);
/////////////////////////Routes////////////////////////
// Root endpoint
app.get("/", async(req, res) => {
  return res.json({ message: "Welcome To Prisma ApI (By Taleem.help)" }).status(200);
});

///////////////////////////
app.listen(PORT, () => {
  console.log(`Presentations API running on port ${PORT}`);
});
