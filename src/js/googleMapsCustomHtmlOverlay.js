function HtmlOverlay(options) {
  // Constructor
  this.setMap(options.map);
  this.position = options.position;
  this.html = options.html;
  this.divClass = options.divClass;
  this.align = options.align;
  this.isDebugMode = options.debug;
  this.onClick = options.onClick;

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
    if (arg.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  this.isString = arg => {
    if (typeof arg === 'string') {
      return true;
    } else {
      return false;
    }
  };

  this.isFunction = arg => {
    if (typeof arg === 'function') {
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
  if (
    this.isNotUndefined(this.html) &&
    this.hasContent(this.html) &&
    this.isString(this.html)
  )
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

  // Add element to clickable layer
  this.getPanes().overlayMouseTarget.appendChild(this.div);

  // Add listener to the element.
  google.maps.event.addDomListener(this.div, 'click', event => {
    google.maps.event.trigger(this, 'click');
    if (this.isFunction(this.onClick)) this.onClick();
    event.stopPropagation();
  });
};

HtmlOverlay.prototype.draw = function() {
  // Calculate positon of div
  var positionInPixels = this.getProjection().fromLatLngToDivPixel(
    new google.maps.LatLng(this.position)
  );

  // Align HTML overlay relative to original position
  var divOffset = {
    y: undefined,
    x: undefined
  };

  switch (this.align) {
    case 'left top':
      divOffset.y = this.div.offsetHeight;
      divOffset.x = this.div.offsetWidth;
      break;
    case 'left center':
      divOffset.y = this.div.offsetHeight / 2;
      divOffset.x = this.div.offsetWidth;
      break;
    case 'left bottom':
      divOffset.y = 0;
      divOffset.x = this.div.offsetWidth;
      break;
    case 'center top':
      divOffset.y = this.div.offsetHeight;
      divOffset.x = this.div.offsetWidth / 2;
      break;
    case 'center center':
      divOffset.y = this.div.offsetHeight / 2;
      divOffset.x = this.div.offsetWidth / 2;
      break;
    case 'center bottom':
      divOffset.y = 0;
      divOffset.x = this.div.offsetWidth / 2;
      break;
    case 'right top':
      divOffset.y = this.div.offsetHeight;
      divOffset.x = 0;
      break;
    case 'right center':
      divOffset.y = this.div.offsetHeight / 2;
      divOffset.x = 0;
      break;
    case 'right bottom':
      divOffset.y = 0;
      divOffset.x = 0;
      break;
    default:
      divOffset.y = this.div.offsetHeight / 2;
      divOffset.x = this.div.offsetWidth / 2;
  }

  // Set position
  this.div.style.top = positionInPixels.y - divOffset.y + 'px';
  this.div.style.left = positionInPixels.x - divOffset.x + 'px';
};

HtmlOverlay.prototype.getPosition = function() {
  return this.position;
};
