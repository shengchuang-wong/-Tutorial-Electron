const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {

	constructor(url) {
		super({
			height: 500,
			width: 300,
			// hide menu bar
			frame: false,
			// disallow user to resiz the window
			resizable: false,
			// not visible during first startup
			show: false,
			// to run smooth or full performance
			webPreferences: { backgroundThrottling: false }
		});

		this.loadURL(url);
		this.on('blur', this.onBlur.bind(this));
	}

	onBlur() {
		this.hide();
	}

}

module.exports = MainWindow;