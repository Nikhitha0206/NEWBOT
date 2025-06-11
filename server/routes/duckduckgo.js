const express = require('express');
const axios = require('axios');
const { tempAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', tempAuth, async (req, res) => {
    const query = req.query.q;
    if (!query || query.trim() === '') {
        return res.status(400).json({ message: 'Query parameter "q" is required.' });
    }

    try {
        const response = await axios.get('https://api.duckduckgo.com/', {
            params: {
                q: query,
                format: 'json',
                no_redirect: 1,
                no_html: 1,
                skip_disambig: 1
            }
        });

        const data = response.data;

        // Extract relevant info from DuckDuckGo response
        const result = {
            heading: data.Heading || '',
            abstract: data.Abstract || '',
            abstractText: data.AbstractText || '',
            abstractURL: data.AbstractURL || '',
            relatedTopics: data.RelatedTopics || []
        };

        res.status(200).json(result);
    } catch (error) {
        console.error('DuckDuckGo search error:', error.message || error);
        res.status(500).json({ message: 'Failed to fetch DuckDuckGo search results.' });
    }
});

module.exports = router;
