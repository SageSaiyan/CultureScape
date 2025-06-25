maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: culturalsite.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(culturalsite.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${culturalsite.title}</h3><p>${culturalsite.location}</p>`
            )
    )
    .addTo(map)