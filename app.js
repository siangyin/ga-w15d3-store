require("dotenv").config();

const express = require("express");
const app = express();
// const router = express.Router();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/connect");
// const products = require("./routes/products");
const Product = require("./models/products");
const methodOverride = require("method-override");

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(express.json());
app.use(methodOverride("_method"));
// app.use("/api", products);

app.get("/allproducts", (req, res) => {
	res.redirect("/index");
});


// Routes
app.get("/index", async (req, res) => {
	try {
		const productsDB = await Product.find({});
		res.render("index.ejs", { title: "All Products", productsDB });
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

app.get("/products/:id", async (req, res) => {
	try {
		let routeID = req.params.id;
		const productsDB = await Product.findOne({ _id: routeID });
		res.render("show.ejs", { title: "View Product", productsDB });
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

app.get("/new", (req, res) => {
	res.render("create.ejs", { title: "Create New Item" });
});

app.post("/newitem", async (req, res) => {
	try {
		const newItem = await Product.create(req.body);
		console.log(`item created ${newItem}`);
		const productsDB = await Product.find({});
		res.render("index.ejs", { title: "All Products", productsDB });
	} catch (err) {
		console.log(err)
	}
});

// to be continue, editing update submit no response
app.get("/products/:id/editing", async (req, res) => {
	try {
		let routeID = req.params.id;
		const productsDB = await Product.findOne({ _id: routeID });
		res.render("edit.ejs", { title: "Editing Product", productsDB });
		res.redirect("/index");
	} catch (err) {
		console.log(err);
	}
});


app.patch("/products/:id", async (req, res) => {
	try {
		const { id: routeID } = req.params;
		const updatedItem = await Product.findOneAndUpdate(
			{ _id: routeID },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		res.redirect("/index");
	} catch (err) {
		console.log(err);
	}
});

app.delete("/products/:id", async (req, res) => {
	try {
		const productsDB = await Product.findOneAndDelete({ _id: req.params.id });
		res.redirect("/index");
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

app.patch("/products/:id/buy", async (req, res) => {
	try {
		const { id: routeID } = req.params;
		const product = await Product.findOne({ _id: routeID });
  const qty = product.qty - 1;
		const buyItem = await Product.findOneAndUpdate(
			{ _id: routeID },
			{ qty: qty },
			{
				new: true,
				runValidators: true,
			}
		);
		console.log("buying")
			res.redirect(`/products/${routeID}`);
	} catch (err) {
		console.log(err);
	}
});


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
