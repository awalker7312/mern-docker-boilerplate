const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('Hello World! - Connected to backend successfully!');
});

module.exports = router;