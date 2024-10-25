// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHZvaWNlb3ZlciIsImEiOiJjbTJva2hiMGowN2loMmpzODk3dTRjOGxnIn0.LJNQLtjb9oBatJ-ofzuL8w';

// Initialize map
const map = new mapboxgl.Map({
    container: 'map', // ID of the map div
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [0, 0], // Initial map center
    zoom: 2 // Initial zoom level to see global view
});

// Function to load data from data.json and add markers
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.data.forEach(item => {
            // Convert latitude and longitude to numbers
            const latitude = parseFloat(item.latitude);
            const longitude = parseFloat(item.longitude);

            // Create a marker for each item
            new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`
                    <h3>${item.name}</h3>
                    <p>Address: ${item.address}</p>
                    <p>City: ${item.city_name}</p>
                    <p>Surface: ${item.surface}</p>
                    <p>Capacity: ${item.capacity}</p>
                    <img src="${item.image_path}" alt="${item.name}" width="100">
                `)) // Add popup with additional information
                .addTo(map);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));
