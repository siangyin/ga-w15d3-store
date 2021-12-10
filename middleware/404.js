const pg404Middleware = (req, res) =>
	res.status(404).send("<h1>Route not found</h1>");

module.exports = pg404Middleware;
