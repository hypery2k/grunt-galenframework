load('../gl.js');

forAll(config.getDevices(), function (device) {
  test('Containers position on ' + device.deviceName, function () {
    gl.openPage(device, config.getProjectSubpage('/static/sample.html'), 'sample subpage');

    gl.runSpecFile(device, './test/sample.gspec');
  });
});
