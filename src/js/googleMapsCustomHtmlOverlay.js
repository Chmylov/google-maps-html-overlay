// Constructor
function HtmlOverlay(options) {
  this.position = options.position;
  this.html = options.html;
  this.divClass = options.divClass;
  this.align = options.align;
  this.setMap(options.map);

  this.ifNotUndefined = function(arg, callback) {
    if (typeof arg === 'undefined') return;
    return callback();
  };
}

HtmlOverlay.prototype = new google.maps.OverlayView();

HtmlOverlay.prototype.onAdd = function() {
  // Create the div element.
  this.div = document.createElement('div');
  this.div.style.position = 'absolute';

  // Validate and set custom div class
  this.ifNotUndefined(this.divClass, () =>
    this.div.classList.add(this.divClass)
  );

  // Validate and set custom HTML
  this.ifNotUndefined(this.html, () => {
    this.div.innerHTML = this.html;
  });

  // Add the element to the "overlayMouseTarget" pane.
  this.getPanes().overlayMouseTarget.appendChild(this.div);

  // Add listener to the element.
  var me = this;
  google.maps.event.addDomListener(this.div, 'click', function() {
    google.maps.event.trigger(me, 'click');
  });
};

HtmlOverlay.prototype.draw = function() {
  var positionCorrectionAfterMapDrag = this.getProjection().fromLatLngToDivPixel(
    new google.maps.LatLng(this.position)
  );

  switch (this.align) {
    case 'center center':
      var positionRelativeToDivTop = this.div.offsetHeight / 2;
      var positionRelativeToDivLeft = this.div.offsetWidth / 2;
      break;
    case 'left center':
      var positionRelativeToDivTop = this.div.offsetHeight / 2;
      var positionRelativeToDivLeft = this.div.offsetWidth;
      break;
    case 'right center':
      var positionRelativeToDivTop = this.div.offsetHeight / 2;
      var positionRelativeToDivLeft = 0;
      break;
    case 'center top':
      var positionRelativeToDivTop = this.div.offsetHeight;
      var positionRelativeToDivLeft = this.div.offsetWidth / 2;
      break;
    case 'center bottom':
      var positionRelativeToDivTop = 0;
      var positionRelativeToDivLeft = this.div.offsetWidth / 2;
      break;
  }

  // Set new position on drag
  this.div.style.top =
    positionCorrectionAfterMapDrag.y - positionRelativeToDivTop + 'px';
  this.div.style.left =
    positionCorrectionAfterMapDrag.x - positionRelativeToDivLeft + 'px';
};
