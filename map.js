var map = new L.Map('map');
map.setView([55.87835875564509, 37.7050219952363], 16, false);

new L.TileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', {
  maxZoom: 18,
  maxNativeZoom: 22
}).addTo(map);

var osmb = new OSMBuildings(map);
osmb.style({
  color: '#deebf4',
  roofColor: '#828886',
  shadows: true
});

exports.map = map;
exports.osmb = osmb;