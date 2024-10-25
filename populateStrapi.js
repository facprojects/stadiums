const fs = require('fs');
const axios = require('axios');

// Read and parse the JSON file
const fileContent = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const stadiums = fileContent.data; // Access the array inside the "data" property

async function importData() {
  const token = 'ytW4u2UbJ/p4f+Bfvr0oVg==,nHAPHdc5/GW2aFMsDltM0w==,yUiYEb2EKIkEAB1QoMZebA==,IcykunhUw5MbdbH8Hdn8yg=='; // Get this from Strapi admin panel
  
  try {
    for (const stadium of stadiums) {
      console.log(`Importing stadium: ${stadium.name}`);
      
      await axios.post('http://localhost:1337/api/stadiums', {
        data: {
          stadium_id: stadium.id,
          country_id: stadium.country_id,
          city_id: stadium.city_id,
          name: stadium.name,
          address: stadium.address,
          zipcode: stadium.zipcode,
          latitude: stadium.latitude,
          longitude: stadium.longitude,
          capacity: stadium.capacity,
          image_path: stadium.image_path,
          city_name: stadium.city_name,
          surface: stadium.surface,
          national_team: stadium.national_team
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