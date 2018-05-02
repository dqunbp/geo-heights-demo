'use strict';
console.log('Hell world!');

import {
    map,
    osmb,
    featureGroup,
    drawControl,
    drawControlRemove
} from './map';
import {
    setMapBounds,
    findFeatureById,
    polygonsWithInPolygon,
    featuresListToCollection
} from './functions';

var colors = {
    house: { material: "tar_paper", roofMaterial: "wood" },
    other: { material: "brick", roofMaterial: "stone" },
    apartments: { material: "panel", roofMaterial: "concrete" }
}

const fs = require('fs');
var rawdata = fs.readFileSync('./data/mytishi.geojson', 'utf8'),
    mytishi = JSON.parse(rawdata);

setMapBounds(
    map,
    featuresListToCollection(mytishi)
)

osmb.click(function (e) {
    console.log(e);
    var json = findFeatureById(mytishi, e.feature);
    var content = '<b>FEATURE ID ' + e.feature + '</b>';
    content += '<br><em>Type</em> ' + json.properties.type;
    content += '<br><em>Height</em> ' + json.properties.building_height;
    content += '<br><em>IOU</em> ' + json.properties.iou;
    L.popup({ maxHeight: 200, autoPanPaddingTopLeft: [50, 50] })
        .setLatLng(L.latLng(e.lat, e.lon))
        .setContent(content)
        .openOn(map);
});

osmb.each(function (feature) {
    let { type, building_height: height } = feature.properties;
    if (type && colors[type]) {
        let { material, roofMaterial } = colors[type];
        Object.assign(feature, {
            properties: {
                height,
                material,
                roofMaterial
            }
        });
    };
});

let currentlLayer

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

    if (currentlLayer) {
        featureGroup.removeLayer(currentlLayer);
    };

    featureGroup.addLayer(layer);
    currentlLayer = layer;
});