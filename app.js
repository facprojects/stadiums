// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHZvaWNlb3ZlciIsImEiOiJjbTJva2hiMGowN2loMmpzODk3dTRjOGxnIn0.LJNQLtjb9oBatJ-ofzuL8w';

// Initialize map
const map = new mapboxgl.Map({
    container: 'map', // ID of the map div
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [0, 0], // Initial map center
    zoom: 2 // Initial zoom level to see global view
});

const fetchStadiums = async (page = 1, pageSize = 100) => {
    const token = 'bb45b193e1d0852f1894477e9673f93ed5be2a71f9f587317137a69aad88d5d21959012a1ce60f137bac3f13868ad67850580ee227fa327bcae868a6a0b3f39590c26420394e075af42be3d2fed05501b2e7b0a3f272b2bb91c96b930858a7c96c474c50249ffa785c8ca82c4fe32fae275baf86fe65e593621f0a51bccefd8a'; // Replace with your actual token

    try {
        const response = await fetch(`http://localhost:1337/api/stadiums?pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data from Strapi API:', error);
    }
};

// Fetch all stadiums
const loadAllStadiums = async () => {
    let allStadiums = [];
    let page = 1;
    const pageSize = 100; // Adjust this to a number larger than your total count if needed

    while (true) {
        const data = await fetchStadiums(page, pageSize);
        allStadiums = allStadiums.concat(data.data);

        // Check if there are more items to fetch
        if (data.meta.pagination.pageCount <= page) {
            break;
        }
        page++;
    }
    return allStadiums;
};

// Usage
loadAllStadiums().then(data => {
    console.log(data)
    try {
    const stadiums = data; // Adjust based on your API response structure

        stadiums.forEach(item => {
            // Convert latitude and longitude to numbers
            const latitude = parseFloat(item.latitude);
            const longitude = parseFloat(item.longitude);

            // Create a marker for each item
            new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`
                    <h3>${item.Name}</h3>
                    <p>Capacity: ${item.capacity}</p>
                `))
                .addTo(map);
        });
    } catch (error) {
        console.error('Error loading data from Strapi API:', error);
    }
});
