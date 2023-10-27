import { app, BrowserWindow, Menu } from 'electron';
import isDev from 'electron-is-dev';

import { detectAuthPage } from './window';

export const getTemplateMenu = (mainWindow: BrowserWindow) => {
	const isMac = process.platform === 'darwin';
	const isAuthPage = detectAuthPage(mainWindow);

	const template: unknown[] = [
		...(isMac
			? [
					{
						label: app.name,
						submenu: [
							{ role: 'about' },
							{ type: 'separator' },
							{ role: 'hide' },
							{ role: 'hideOthers' },
							{ role: 'unhide' },
							{ type: 'separator' },
							{
								label: 'Logout',
								id: 'logout-item',
								visible: !isAuthPage,
								click: () => {
									mainWindow.webContents.loadURL('https://auth.uspacy.com?logout');
								},
							},
							{ type: 'separator', id: 'logout-separator', visible: !isAuthPage },
							{ role: 'quit' },
						],
					},
			  ]
			: []),
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				...(isMac
					? [
							{ role: 'pasteAndMatchStyle' },
							{ role: 'delete' },
							{ role: 'selectAll' },
							{ type: 'separator' },
							{
								label: 'Speech',
								submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
							},
					  ]
					: [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
			],
		},
	];
	return Menu.buildFromTemplate(template);
};

export const setApplicationMenu = (mainWindow: BrowserWindow) => {
	if (isDev) return;
	const menu = getTemplateMenu(mainWindow);
	mainWindow.webContents.on('did-navigate-in-page', () => {
		const isAuthPage = detectAuthPage(mainWindow);
		const logoutItem = menu.getMenuItemById('logout-item');
		const logoutSeparator = menu.getMenuItemById('logout-separator');
		logoutItem.visible = !isAuthPage;
		logoutSeparator.visible = !isAuthPage;
	});
	Menu.setApplicationMenu(menu);
};
