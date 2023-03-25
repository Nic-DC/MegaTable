import mongoose from "mongoose";

/* ------------ ENHANCED VERSION OF ERROR HANDLERS ------------ */
export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
    console.error("Bad Request:", err);
    res.status(400).send({
      status: "error",
      message: err.message,
      details: err.errors,
      code: 400,
    });
  } else if (err instanceof mongoose.Error.CastError) {
    console.error("Bad Request (Cast Error):", err);
    res.status(400).send({
      status: "error",
      message: "You've sent a wrong _id in request params",
      details: err,
      code: 400,
    });
  } else {
    next(err);
  }
};

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    console.error("Not Found:", err);
    res.status(404).send({
      status: "error",
      message: err.message,
      code: 404,
    });
  } else {
    next(err);
  }
};

export const genericErrorHandler = (err, req, res, next) => {
  console.error("Generic Server Error:", err);
  res.status(500).send({
    status: "error",
    message: "Generic Server Error",
    details: err.message,
    code: 500,
  });
};

// This middleware function limits the number of requests a client
// can make to the server within a specified time window.
// This can help protect your server from excessive requests or potential DDoS attacks.
export const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    console.error("Rate Limit Exceeded:", req.ip);
    res.status(429).send({
      status: "error",
      message: "Too many requests, please try again later.",
      details: {
        limit: 100,
        windowMs: 15 * 60 * 1000,
        retryAfter: Math.ceil(res.get("Retry-After") / 60),
      },
      code: 429,
    });
  },
});

// export const badRequestHandler = (err, req, res, next) => {
//   if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
//     res.status(400).send({ message: err.message });
//   } else if (err instanceof mongoose.Error.CastError) {
//     res.status(400).send({ message: "You've sent a wrong _id in request params" });
//   } else {
//     next(err);
//   }
// };

// export const notFoundHandler = (err, req, res, next) => {
//   if (err.status === 404) {
//     res.status(404).send({ message: err.message });
//   } else {
//     next(err);
//   }
// };

// export const genericErrorHandler = (err, req, res, next) => {
//   console.log(err);
//   res.status(500).send({ message: "Generic Server Error" });
// };
