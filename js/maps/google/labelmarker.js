// 由于异步JS，google.maps.OverlayView 不能总是保证加载完，故采用通过函数初始化的方式\
function initLabelMarker() {

    window.Label = function (opt) {
        this._position = opt.position;
        this._text = opt.text;
        this._className = opt.className || "labelDiv";
        this._div = null;
        this._offset = opt.offset;
        this.setMap(opt.map);
    }
    Label.prototype = new google.maps.OverlayView();
    Label.prototype.onAdd = function () {
        this._div = div = TUI.Dom.createElement("div");
        // this._div.style.border = "1px solid #FF0000";
        div.className = this._className;
        div.innerHTML = this._text;
        this.getPanes().overlayLayer.appendChild(div);
    };
    Label.prototype.draw = function () {
        if (this._div && this._position) {
            var overlayProjection = this.getProjection();
            var position = overlayProjection.fromLatLngToDivPixel(this._position);
            this._div.style.left = (position.x + this._offset.x / 2) + "px";
            this._div.style.top = (position.y - this._offset.y ) + "px";
        }
    };
    Label.prototype.onRemove = function () {
        this._div.parentNode.removeChild(this._div);
        delete this._div;
    };
    Label.prototype.setText = function (text) {
        this._text = text;
        if (this._div)
            this._div.innerHTML = this._text;
    };
    Label.prototype.getText = function (text) {
        return this._text;
    };
    Label.prototype.setPosition = function (lngLat) {
        this._position = lngLat;
        this.draw();
    };
    Label.prototype.show = function () {
        if (this._div)
            this._div.style.visibility = "visible";
    };
    Label.prototype.hide = function () {
        if (this._div)
            this._div.style.visibility = "hidden";
    };


    window.LabelMarker = function (opt) {
        var labelOpt = TUI.Core.copyPropertys(opt.labelOpt || {}, {map: opt.map, position: opt.position});
        if (labelOpt.text)
            this._label = new Label(labelOpt);
        this._marker = new google.maps.Marker(opt);
        // this.setMap(opt.map);
    }

    LabelMarker.prototype = new google.maps.OverlayView();
    LabelMarker.prototype.onAdd = function () {
    };

    LabelMarker.prototype.draw = function () {
    };

    LabelMarker.prototype.onRemove = function () {
        if (this._label)
            this._label.setMap(null);
        this._marker.setMap(null);
    };

    LabelMarker.prototype.setPosition = function (lngLat) {
        if (this._label)
            this._label.setPosition(lngLat);
        this._marker.setPosition(lngLat);
    };

    LabelMarker.prototype.setDraggable = function (ret) {
        var self = this;
        this._marker.setDraggable(ret);
        if (ret) {
            google.maps.event.addListener(this._marker, 'drag', function (e) {
                if (self._label)
                    self._label.setPosition(e.latLng);
            })
        }
    };

    LabelMarker.prototype.getMarker = function () {
        return this._marker;
    };

    LabelMarker.prototype.getLabel = function () {
        return this._label;
    };
};