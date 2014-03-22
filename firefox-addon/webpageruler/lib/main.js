var widgets = require('sdk/widget');
var data = require('sdk/self').data;

var rulerToggled = false;

function toggleActivation() {
  rulerToggled = !rulerToggled;
  return rulerToggled;
}

exports.main = function() {

  var widget = widgets.Widget({
    id: 'toggle-switch',
    label: 'Webpage Ruler',
    contentURL: data.url('ruler.png'),
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('widget/bob.js')
  });

  widget.port.on('left-click', function() {
    console.log('activate/deactivate');
    widget.contentURL = toggleActivation() ?
              data.url('ruler-blue.png') :
              data.url('ruler-blue.png');
  });

  widget.port.on('right-click', function() {
      console.log('show annotation list');
  });
}