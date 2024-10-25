const fs = require('fs');
const axios = require('axios');

// Read and parse the JSON file
const fileContent = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const stadiums = fileContent.data; // Access the array inside the "data" property

async function importData() {
  const token = '51c710cf1f7cb1e3263efb8aab3611d7565630777371ab7f96e977da51a63528d1e35cf773a9f09dee84c0a268afa4f51d6b0d120014ee46a58e7d8941d32c7f7b7a644e8fb774b5cb0a8a4ccf6388da45e86926f8e9f5d2c311cb83f7466dbcb6b457e78514a8bc89ae62758efdf7cc9ce270fcfe5bed6b93e742bae04ebf2a'; // Get this from Strapi admin panel
  
  try {
    for (const stadium of stadiums) {
      console.log(`Importing stadium: ${stadium.name}`);
      
      await axios.post('http://localhost:1337/api/stadiums', {
        data: {
        //   stadium_id: stadium.id,
        //   country_id: stadium.country_id,
        //   city_id: stadium.city_id,
          Name: stadium.name,
        //   address: stadium.address,
        //   zipcode: stadium.zipcode,
          latitude: stadium.latitude,
          longitude: stadium.longitude,
          capacity: stadium.capacity,
        //   image_path: stadium.image_path,
        //   city_name: stadium.city_name,
        //   surface: stadium.surface,
        //   national_team: stadium.national_team
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