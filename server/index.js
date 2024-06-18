const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/drugs', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${name}&search=0`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching drugs:', error.message);
    res.status(500).send('Error retrieving drugs');
  }
});

app.get('/api/spellingsuggestions', async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${name}`);
    res.json(response.data.suggestionGroup.suggestionList.suggestion || []);
  } catch (error) {
    console.error('Error fetching spelling suggestions:', error.message);
    res.status(500).send('Error retrieving spelling suggestions');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
