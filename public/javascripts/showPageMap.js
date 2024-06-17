// const campground = require("../../models/campground");
const loc=campground.geometry.coordinates;
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
center:campground.geometry.coordinates,
// center:[-74.5,40],
zoom: 5// starting zoom
});

new mapboxgl.Marker()
    .setLngLat(loc)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)