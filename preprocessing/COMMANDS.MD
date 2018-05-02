Preprocessing commands
------------------------

- Raw data example in `raw_data/mytishi_footprints.geojson`.

- Convert FeatureCollection to array of features  and set id's:

```sh
jq --compact-output '.features | to_entries | map( .value + {id: (.key + 1)})' input > output
```

- Set id's and rename `building_height` key to `height`:

```sh
jq --compact-output '.features | to_entries | map( .value + {id: (.key + 1)} | .properties.building_height as $height | del(.properties.building_height) | setpath(["properties","height"]; $height))' input > output
```

