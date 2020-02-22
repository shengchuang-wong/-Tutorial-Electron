const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.on('closed', () => app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add New Todo'
	});
	addWindow.loadURL(`file://${__dirname}/add.html`);
	// to release the dump address memory, good practices
	addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
	mainWindow.webContents.send('todo:add', todo);
	// close still have address memory left
	addWindow.close();
	// addWindow = null;
});

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{ 
				label: 'New Todo',
				click() { createAddWindow(); }
			},
			{
				label: 'Clear Todos',
				click() {
					mainWindow.webContents.send('todo:clear');
				}
			},
			{ 
				label: 'Quit',
				// accelerator: 'Command+Q',
				// accelerator: (() => {
				// 	if(process.platform === 'darwin') {
				// 		return 'Command+Q';
				// 	} else {
				// 		return 'Ctrl+Q';
				// 	}
				// })(),
				accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q' ,
				click() {
					app.quit();
				}
			}
		]
	}
];

// to make menu bar in osx displayed label properly
if(process.platform === 'darwin') {
	menuTemplate.unshift({});
}

// porudction, development, staging, test
if(process.env.NODE_ENV !== 'production') {
	menuTemplate.push({
		label: 'DEVELOPER!!!',
		submenu: [
			{
				// electron have some preset role, refer to documentation
				role: 'reload'
			},
			{
				label: 'Toggle Developer Tools',
				// windows usually is [ctrl + shift + i]
				accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'F12',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
}