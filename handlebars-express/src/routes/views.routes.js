import { Router } from "express";


const router = Router();


//routes
router.get("/", (req,res)=>{
    
    //indicar la vista
    res.render("home");
});


export {router as viewsRouter};