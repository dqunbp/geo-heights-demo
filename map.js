var map = new L.Map('map');
map.setView([55.878358755645088, 37.705021995236301], 16, false);

new L.TileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga', {
  maxZoom: 18,
  maxNativeZoom: 20
}).addTo(map);


var osmb = new OSMBuildings(map).load();
osmb.style({
  color: '#deebf4',
  roofColor: '#828886',
  shadows: true
});