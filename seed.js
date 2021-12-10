require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/products");
const jsonProductsDB = require("./products.json");

const startPopulate = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonProductsDB);
		console.log("Created!");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

startPopulate();
