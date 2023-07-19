import express from "express";
import handlebars from "express-handlebars";


import path from "path";
import { __dirname } from "./utils.js";

import productsRouter from "./routes/products.routes.js";
import { cartsRouter } from "./routes/cart.routes.js";
import {Server} from "socket.io";

const port = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer =app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.use(express.static(path.join(__dirname,"/public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));

app.set('view engine', '.hbs');

app.set('views', path.join(__dirname,"/views"));


//app.use(productsRouter);
const socketSever = new Server(httpServer);



socketSever.on("connection",(socketConnected)=>{
    console.log(`nuevo cliente conectado ${socketConnected.id}`)

    socketConnected.on("messageEvent",(data=>{
        console.log(`datos recibidos del cliente: ${data}`)
    }))

    setTimeout(()=>{
        socketConnected.emit("eventoIndividual","mensaje solo para el cliente actual")
    },4000)
});


app.get("/", (req, res) => {
    res.render("home");
  });
  
app.get("/tiemporeal", (req, res) => {
    res.render("realTimeProducts");
  });
  