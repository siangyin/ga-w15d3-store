require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// const router = express.Router();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const pg404Middleware = require("./middleware/404");
const errHandlerMiddleware = require("./middleware/err-handler");

//Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res
		.status(200)
		.send("<h1>W15D3 Mongoose Store</h1><a href='/products'>All Products</a>");
});

// products routes
app.get("/products", (req, res) => {
	res.status(200).send("<h1>all products</h1>");
});

app.get("/product/new", (req, res) => {
	res.status(200).send("<h1>NEW PRODUCT FORM</h1>");
});

app.post("/products", (req, res) => {
	console.log(req.body);
	res.status(201).json(req.body);
});

app.get("/products/:id", (req, res) => {
	const { id } = req.params;
	res.status(200).send(`<h1>show product id: ${id}</h1>`);
});

app.get("/products/:id/edit", (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	res.status(200).send(`<h1>SHOW FORM: editing product id: ${id}</h1>`);
});

app.put("/products/:id/edit", (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	res.status(200).send(`<h1>PUT : updating product id: ${id}</h1>`);
});

app.delete("/products/:id", (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	res.status(200).send(`<h1>DELETE : deleting product id: ${id}</h1>`);
});

// middlewares : page not found/ error-handler
app.use(pg404Middleware);
app.use(errHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log(`app on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
