const fs = require('fs');
const axios = require('axios');

// Read and parse the JSON file
const fileContent = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const stadiums = fileContent.data; // Access the array inside the "data" property

async function importData() {
  const token = 'bb45b193e1d0852f1894477e9673f93ed5be2a71f9f587317137a69aad88d5d21959012a1ce60f137bac3f13868ad67850580ee227fa327bcae868a6a0b3f39590c26420394e075af42be3d2fed05501b2e7b0a3f272b2bb91c96b930858a7c96c474c50249ffa785c8ca82c4fe32fae275baf86fe65e593621f0a51bccefd8a'; // Get this from Strapi admin panel
  
  try {
    for (const stadium of stadiums) {
      console.log(`Importing stadium: ${stadium.name}`);
      await axios.post('http://localhost:1337/api/stadiums', {
        data: {
          Name: stadium.name,
          latitude: stadium.latitude,
          longitude: stadium.longitude,
          capacity: stadium.capacity,
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Import failed:', error.response?.data || error.message);
  }
}

importData();