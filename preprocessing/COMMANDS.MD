Preprocessing commands
------------------------

- Convert FeatureCollection to array of features:

```sh
jq --compact-output ".features" input.geojson > output.geojson
```

- Set id's and rename `building_height` key to `height`:

```sh
jq 'to_entries | map( .value + {id: (.key + 1)} | .properties.building_height as $height | del(.properties.building_height) | setpath(["properties","height"]; $height))' input.geojson > output.geojson

