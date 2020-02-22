const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	console.log('App is now ready');
});

// receive data from mainWindow
ipcMain.on('video:submit', (event, path) => {
	ffmpeg.ffprobe(path, (err, metadata) => {
		mainWindow.webContents.send(
			'video:metadata', 
			metadata.format.duration
		);
	});
});