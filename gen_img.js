const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function generateImage(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing. Please add it to the .env file.');
  }

  const url = 'https://api.openai.com/v1/images/generations';
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  const data = {
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  };

  try {
    const response = await axios.post(url, data, { headers });
    const imageBase64 = response.data.data[0].b64_json;
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync('generated_image.png', buffer);
    console.log('Image saved as generated_image.png');
  } catch (error) {
    console.error('Error generating image:', error.response ? error.response.data : error.message);
  }
}

// Example usage:
const prompt = 'A serene landscape with mountains during sunset';
generateImage(prompt);
