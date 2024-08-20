const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

const allowedOrigins = [
    'http://localhost:3001', // Your local development server
    'https://tolstoy-task-8epkyiycc-lin-ben-meirs-projects.vercel.app/' // Your Vercel deployment
  ];

const corsOptions = {
     origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow the request if the origin is in the allowedOrigins array or if there is no origin (e.g., server-side requests)
      callback(null, true);
    } else {
      // Reject the request if the origin is not allowed
      callback(new Error('Not allowed by CORS'));
    }
  },
    credentials: true, // Allow cookies
};

// Enable CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//---Security---
// Use Helmet to set secure HTTP headers
app.use(helmet());
// CSRF protection
const csrfProtection = csrf({ cookie: true });
// Endpoint to get CSRF token
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// Apply CSRF protection to sensitive routes
app.use('/fetch-metadata', csrfProtection);

//---Rate Limiting---
// Set up rate limiting
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter to the fetch-metadata endpoint
app.use('/fetch-metadata', limiter);


app.post('/fetch-metadata', async (req, res) => {
    try {
        const { urls } = req.body;

        if (!urls || !Array.isArray(urls)) {
            console.error('Invalid input:', req.body); // Log invalid input
            return res.status(400).json({ error: 'Please provide an array of URLs.' });
        }

        const metadataPromises = urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(`Failed to fetch URL: ${url}, Status: ${response.status}`); // Log fetch failure
                    throw new Error('Failed to fetch the URL');
                }
                const html = await response.text();
                const $ = cheerio.load(html);

                const title = $('head > title').text() || 'No title available';
                const description = $('meta[name="description"]').attr('content') || 'No description available';
                const image = $('meta[property="og:image"]').attr('content') || 'No image available';

                return { url, title, description, image };
            } catch (error) {
                console.error(`Error fetching URL ${url}:`, error.message);
                return { url, error: error.message };
            }
        });

        const metadata = await Promise.all(metadataPromises);
        console.log('Fetched metadata:', metadata);
        res.json(metadata);

    } catch (error) {
        console.error('Error in /fetch-metadata route:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching metadata.' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;