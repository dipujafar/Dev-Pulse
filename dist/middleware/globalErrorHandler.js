const globalErrorHandle = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};
export default globalErrorHandle;
//# sourceMappingURL=globalErrorHandler.js.map