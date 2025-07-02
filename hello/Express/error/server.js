const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

// Regular middleware that simulates an error
router.use('/cause-error', (req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 500;
  next(err);
});

// A route that works fine
router.get('/', (req, res) => {
  res.send('Hello, World!');
 // next()
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500); // Set the status code to the error's status or default to 500
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Use the router
app.use('/', router);

app.listen(port, () => {
  console.log('Server is running on port', port);
});
