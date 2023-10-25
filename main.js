const { BrowserWindow, app } = require('electron');
const isDev = require('electron-is-dev');

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			devTools: isDev,
			preload: `${__dirname}/preload.js`,
		},
	});

	mainWindow.maximize();
	const { session } = mainWindow.webContents;
	const originUserAgent = session.getUserAgent();
	const userAgent = `${originUserAgent} (DesktopApp)`;

	if (isDev) mainWindow.loadURL('http://localhost:3002', { userAgent });
	// if (isDev) mainWindow.loadURL('https://stage1.staging.uspacy.tech', { userAgent });
	else mainWindow.loadURL('https://auth.uspacy.com', { userAgent });
};

app.whenReady().then(() => {
	createWindow();
});

app.once('window-all-closed', () => app.quit());
