//dependencies
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

//Scripts
import addBooks from "./question4_CreateBook.js";
import updateBook from "./question4_UpdateBook.js";
import deleteBook from "./question4_deleteBook.js";
import readBook from "./question4_readBook.js";
import authorBook from "./question1_authorFiltering.js";
import yearBook from "./question1_yearFiltering.js";
import validateYear from "./question2_validateYear.js"

//running all dependencies
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// testing
let port = process.env.PORT || 8001
app.get("/", (req,res)=>{
    res.send("<h1>Hii</h1>");
});

//running scripts
app.post("/add",addBooks);
app.post("/update/:id",updateBook);
app.post("/delete/:id",deleteBook);
app.post("/read",readBook);
app.post("/author",authorBook);
app.post("/year",validateYear,yearBook);
//connection
app.listen(port,()=>{
    console.log("Server Connected on the PORT");
})