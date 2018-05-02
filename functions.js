exports.featuresListToCollection = (list) => ({
    "type": "FeatureCollection",
    "features": list
});

exports.polygonsWithInPolygon = (polygons, withInPolygon) => (
    polygons.reduce((result, nextPolygon) => {
        let { geometry: { coordinates }, properties, id } = nextPolygon
        // use coordinates[0] because booleanWithin doesn't accept MultiPolygon
        let polygon = turf.polygon(coordinates[0], properties, { id })
        if (turf.booleanWithin(polygon, withInPolygon)) {
            result.push(polygon);
        }
        return result
    }, [])
);

exports.findFeatureById = (features, id) => (
    features.find(feature => feature.id === id)
)

exports.setMapBounds = (map, featureCollection) => {
    var bbox = turf.bbox(featureCollection);
    var bboxPolygon = turf.bboxPolygon(bbox);
    var leafletPolygon = L.geoJSON(bboxPolygon, {
        onEachFeature(feature, layer) {
            L.Util.setOptions(layer, { 
                interactive: true,
                fill: false,
                color: "#ffffff"
            });
        }
    })
    map.fitBounds(leafletPolygon.getBounds());
    leafletPolygon.addTo(map);
}