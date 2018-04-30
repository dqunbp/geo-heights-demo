'use strict';
console.log('Hell world!');

import { map } from './map';
import { osmb } from './map';
import {
    findFeatureById,
    polygonsWithInPolygon,
    featuresListToCollection
} from './functions';

const fs = require('fs');
var rawdata = fs.readFileSync('./data/mytishi.geojson', 'utf8');
var mytishi = JSON.parse(rawdata);

osmb.set(
    featuresListToCollection(mytishi)
);

osmb.click(function (e) {
    console.log(e);
    var json = findFeatureById(mytishi, e.feature);
    var content = '<b>FEATURE ID '+ e.feature +'</b>';
    content += '<br><em>Height</em> '+ json.properties.height;
    content += '<br><em>IOU</em> '+ json.properties.iou;
    L.popup({ maxHeight:200, autoPanPaddingTopLeft:[50,50] })
      .setLatLng(L.latLng(e.lat, e.lon))
      .setContent(content)
      .openOn(map);
});