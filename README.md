# Google maps custom HTML overlay

This plugin makes it possible to simply add html overlay to google maps.

![html-overlay-example](https://raw.githubusercontent.com/Chmylov/google-maps-html-overlay/develop/example/html-overlay-example.PNG)

### CodePen

Check it out on [CodePen](https://codepen.io/Chmylov/pen/ELdVmm)

Latest version: `1.0.0`

## Install

Download `googleMapsHtmlOverlay.min.js` from the `dist` folder and add it to your project.

## Usage

After adding `googleMapsHtmlOverlay.min.js` to your project, for example like this: `<script src="googleMapsHtmlOverlay.js"></script>`, add the following to your javaScript file or script tag to create overlay:

```
var overlay = new GoogleMapsHtmlOverlay({
    map: map, // bind googleMapsHtmlOverlay to a map
    position: { lat: 52.2215372, lng: 6.8936619}, // Place overlay on specific point
    html:'<h1>HTML</h1>', // Html goes here
    divClass: 'html-overlay-wrapper' // Set div class on overlay
});
```

To get position of the overlay:

```
overlay.getPosition();
```

## API

### GoogleMapsHtmlOverlay([options])

#### Defaults overview

```
new GoogleMapsHtmlOverlay({
    map: '',        // required
    position: {},   // required
    html: '',       // required
    divClass: '',
    align: 'center center',
    debug: false,
    onClick: ''
})
```

#### Options properties

**map**

Type: `Object`

Google maps API goes here

**position**

Type: `Object`

Set position for HTML overlay

Example: `{ lat: 52.2215372, lng: 6.8936619 }`

**html**

Type: `String`

**divClass**

Type: `String`

Set css class on the HTML overlay

**align**

Type: `String`

Default: `['center', 'center']`

Position overlay relative to the initial position. <br />Possibilities: `['left' || 'center' || 'right' , 'top' || 'center' || 'bottom']`

**debug**

Type: `Boolean`

Default: `false`

Turn on the debug mode for testing or for demoing.

![debug-example](https://raw.githubusercontent.com/Chmylov/google-maps-html-overlay/develop/example/debug-example.PNG)

**onClick**

Type: `Function`

Do something if overlay is clicked.

## License

[MIT](https://raw.githubusercontent.com/Chmylov/google-maps-html-overlay/develop/LICENSE)
