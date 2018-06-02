// Constructor
function HtmlOverlay(options) {
  this.position = options.position;
  this.html = options.html;
  this.divClass = options.divClass;
  this.align = options.align;
  this.isDebugMode = options.debugMode;
  this.setMap(options.map);

  this.ifNotUndefined = function(arg, callback) {
    if (typeof arg === 'undefined') return;
    return callback();
  };

  this.isBoolean = arg => {
    if (typeof arg === 'boolean') {
      return true;
    } else {
      return false;
    }
  };

  this.isNotUndefined = arg => {
    if (typeof arg !== 'undefined') {
      return true;
    } else {
      return false;
    }
  };

  this.hasContent = arg => {
    console.log(arg.length);
    if (arg.length > 0) {
      return true;
    } else {
      return false;
    }
  };
}

HtmlOverlay.prototype = new google.maps.OverlayView();

HtmlOverlay.prototype.onAdd = function() {
  // Create div element.
  this.div = document.createElement('div');
  this.div.style.position = 'absolute';

  // Validate and set custom div class
  if (this.isNotUndefined(this.divClass) && this.hasContent(this.divClass))
    this.div.className = this.divClass;

  // Validate and set custom HTML
  if (this.isNotUndefined(this.html) && this.hasContent(this.html))
    this.div.innerHTML = this.html;

  // If debug mode is enabled custom content will be replaced with debug content
  if (this.isBoolean(this.isDebugMode) && this.isDebugMode) {
    this.div.className = 'debug-mode';
    this.div.innerHTML =
      '<div style="height: 10px; width: 10px; background: red; border-radius: 100%;"></div>' +
      '<div style="position: absolute; top: 5px; padding: 5px; width: 130px; text-align: center; font-size: 18px; text-transform: uppercase; font-weight: bolder; background: red; color: white; font-family: Arial;">Debug mode</div>';
    this.div.setAttribute(
      'style',
      'position: absolute;' +
        'border: 5px dashed red;' +
        'height: 150px;' +
        'width: 150px;' +
        'display: flex;' +
        'justify-content: center;' +
        'align-items: center;'
    );
  }

  // Add element to the "overlayMouseTarget" pane.
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
