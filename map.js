
var google = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', { id: 1 }),
    osm = L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', { id: 2 }),
    map = new L.Map('map', {
        center: [55.87835875564509, 37.7050219952363],
        zoom: 16,
        layers: [google]
    });

var baseLayers = {
    "Google": google,
    "OSM": osm
}
L.control.layers(baseLayers, undefined, { position: 'topright', collapsed: false }).addTo(map);

var featureGroup = new L.FeatureGroup().addTo(map),
    drawControl = new L.Control.Draw({
        draw: {
            polygon: {
                icon: new L.DivIcon({
                    iconSize: new L.Point(7, 7),
                    className: 'point'
                })
            },
            rectangle: false,
            polyline: false,
            circle: false,
            marker: false,
            circlemarker: false,
        },
        edit: false
    })
drawControlRemove = new L.Control.Draw({
    draw: false,
    edit: {
        edit: false,
        featureGroup
    }
});

map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    featureGroup.addLayer(layer);
    drawControl.remove();
    drawControlRemove.addTo(map);
});

map.on(L.Draw.Event.DELETED, function (event) {
    drawControlRemove.remove();
    drawControl.addTo(map);
});

var osmb = new OSMBuildings(map);
osmb.style({
    color: '#deebf4',
    roofColor: '#828886',
    shadows: true
});

exports.map = map;
exports.osmb = osmb;