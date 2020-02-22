const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
	// for mac osx
	mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
	// mainWindow.loadURL();


	const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
	
	// use node.js path is to compatible with multiple platforms
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

	// need variable to prevent from garbage collected
	tray = new TimerTray(iconPath, mainWindow);

});

ipcMain.on('update-timer', (event, timeLeft) => {
	tray.setTitle(timeLeft);
});