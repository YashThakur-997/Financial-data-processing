// Centralized error handler middleware
function errorHandler(err, req, res, next) {
	// Log error details (never send stack trace to client in production)
	console.error(err);

	// Customize error response
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({ error: message });
}

module.exports = errorHandler;
