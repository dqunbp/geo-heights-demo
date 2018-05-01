'use strict';
console.log('Hell world!');

import {
    map,
    osmb,
    featureGroup,
    drawControl,
    drawControlRemove
} from './map';
// import { osmb } from './map';
import {
    findFeatureById,
    polygonsWithInPolygon,
    featuresListToCollection
} from './functions';

const fs = require('fs');
var rawdata = fs.readFileSync('./data/mytishi.geojson', 'utf8'),
    mytishi = JSON.parse(rawdata);

// osmb.set(
//     featuresListToCollection(mytishi)
// );

var setWithInBuildings = function (polygon) {

}

osmb.click(function (e) {
    console.log(e);
    var json = findFeatureById(mytishi, e.feature);
    var content = '<b>FEATURE ID ' + e.feature + '</b>';
    content += '<br><em>Height</em> ' + json.properties.height;
    content += '<br><em>IOU</em> ' + json.properties.iou;
    L.popup({ maxHeight: 200, autoPanPaddingTopLeft: [50, 50] })
        .setLatLng(L.latLng(e.lat, e.lon))
        .setContent(content)
        .openOn(map);
});

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    try {
        var withInPolygon = layer.toGeoJSON()
        var polygons = polygonsWithInPolygon(
            mytishi,
            withInPolygon
        );
        osmb.set(
            featuresListToCollection(polygons)
        )
    } catch (error) {
        console.log(error);
    }


    L.Util.setOptions(layer, { interactive: true, fill: false });
    featureGroup.addLayer(layer);
    drawControl.remove();
    drawControlRemove.addTo(map);
});
map.on(L.Draw.Event.DELETED, function (event) {
    var layers = event.layers;
    osmb.set();
    if (layers && layers.getLayers().length > 0) {
        drawControlRemove.remove();
        drawControl.addTo(map);
    }
});