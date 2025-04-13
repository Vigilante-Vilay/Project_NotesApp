const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const userRouter = require("./Routes/UserRoutes");
const notesRouter = require("./Routes/NotesRoutes");


app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/notes",notesRouter);

app.listen(100,()=>{
    console.log("Backend is running...")
});