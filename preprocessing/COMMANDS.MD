Preprocessing commands
------------------------

- Raw data example:
```js
{
    "type": "Feature",
    "geometry": {
        "type":"MultiPolygon",
        "coordinates": [[[
            [37.702728419774594,55.92135444520788],
            [37.702728419774594,55.92131530427053],
            [37.703050706148055,55.92131530427053],
            [37.703050706148055,55.92135444520788],
            [37.702728419774594,55.92135444520788]
        ]]]
        },
        "properties": {
            "type":"other",
            "building_height": 0,
            "iou": 0
        }
}       
```

- Convert FeatureCollection to array of features  and set id's:

```sh
jq --compact-output '.features | to_entries | map( .value + {id: (.key + 1)})' input.geojson > output.geojson
```

- Set id's and rename `building_height` key to `height`:

```sh
jq --compact-output '.features | to_entries | map( .value + {id: (.key + 1)} | .properties.building_height as $height | del(.properties.building_height) | setpath(["properties","height"]; $height))' input.geojson > output.geojson
```

