# tf-vue-leaflet-editable-polyline

vue2 component for tf-leaflet-editable-polyline

## Install

```
npm install tf-vue-leaflet-editable-polyline
```

## Usage

```
import EditablePolyline from "tf-vue-leaflet-editable-polyline"
```

```
<editable-polyline
    :points="points"
    :options="options"
    @ready="onReady"
    @change="onChange"
    @pointAdded="onPointAdded"
/>
```

```
components: { EditablePolyline }
```

## Options
| Option             | Default                  | Description                                                                |
| ------------------ | ------------------------ |-------------- |
| color              | L.Polyline default color | Max number of markers to display
| maxMarkers         | 100                      | Max number of markers to display
| pointIcon          | a dot icon               | L.Icon for a point
| newPointIcon       | -                        | L.Icon for a new point
| firstPointIcon     | -                        | L.Icon for the first point
| lastPointIcon      | -                        | L.Icon for the last point
| newPointOpacity    | 1.0                      | Opacity for a new point marker
| polygonMode        | false                    | True to connect the first and the last point and fill the area

## Events
| Event             |  Default                                                                                  |
| ----------------- | ------------------------ 
| @ready             | Fires after polyline added
| @change            | Fires after points changed with []point
| @pointAdded        | Fires after new point added with point
