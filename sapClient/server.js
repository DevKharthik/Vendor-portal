// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const xml2js = require('xml2js');
const https = require('https');
const rfqRoute = require('./vendorRfqRoute');

// Import route files
const vendorLoginRoute = require('./vendorLoginRoute');
const vendorProfileRoute = require('./vendorProfileRoute');
const vendorRfqRoute = require('./vendorRfqRoute'); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route mounting
app.use('/api/vendor/login', vendorLoginRoute);  // if you move login to route file
app.use('/api/vendor/profile', vendorProfileRoute);
app.use('/api/vendor/rfq', rfqRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
