const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
