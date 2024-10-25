// Import script example
const fs = require('fs');
const axios = require('axios');

const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

async function importData() {
  const token = 'ytW4u2UbJ/p4f+Bfvr0oVg==,nHAPHdc5/GW2aFMsDltM0w==,yUiYEb2EKIkEAB1QoMZebA==,IcykunhUw5MbdbH8Hdn8yg=='; // Generate this in Strapi admin
  
  for (const item of jsonData) {
    await axios.post('http://localhost:1337/api/stadiums', {
      data: item
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
}

importData();