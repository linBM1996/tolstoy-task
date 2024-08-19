const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
/* const csrf = require('csurf');
const cookieParser = require('cookie-parser'); */

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
/* app.use(cookieParser()); */

//---Security---

// Use Helmet to set secure HTTP headers
app.use(helmet());
/* // CSRF protection
const csrfProtection = csrf({ cookie: true });
// Endpoint to get CSRF token
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// Apply CSRF protection to sensitive routes
app.use('/fetch-metadata', csrfProtection); */

//---Rate Limiting---

// Set up rate limiting
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter to the fetch-metadata endpoint
app.use('/fetch-metadata', limiter);


//fetch metadata for URLs and handle errors
app.post('/fetch-metadata', async (req, res) => {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Please provide an array of URLs.' });
    }

    try {
        const metadataPromises = urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
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
        console.error('Error fetching metadata:', error);
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