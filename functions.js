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