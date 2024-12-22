import { Router } from "express";


const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("Home", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/product/:id", async (req,res)=>{
    try{
        const productId = req.params.id;

        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        const data = await response.json();

        if (data.status === "error") {
            return res.status(404).render("error", { message: "Producto no encontrado" });
        }

        const product = data.payload;

        res.render("detail", { title: product.title, product });
    }catch(error){
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);    }
});

router.get("/cart/:id", async (req, res) => {
    try {
        const cartId = req.params.id;
        res.render("cart", { title: "Carrito", cartId });        
    } catch (error) {
        res.status(500).render("error", { message: error.message });
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
        res.render("realTimeProducts", { title: "Real Time" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;