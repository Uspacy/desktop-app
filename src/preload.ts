import { ipcRenderer } from 'electron';

// Send notification to main process (uses native Electron Notification)
window.addEventListener('showNotification', (e: CustomEvent) => {
	const { title, body, icon, data } = e.detail;
	ipcRenderer.send('show-notification', { title, body, icon, data });
});

// Receive notification click from main process
ipcRenderer.on('notification-clicked', (_, data) => {
	const event = new CustomEvent('desktopNotificationClick', { detail: data });
	window.dispatchEvent(event);
});

// Badge count
window.addEventListener('setBadgeCount', (e: CustomEvent) => {
	const { count = 0 } = e.detail;
	ipcRenderer.send('update-badge', count);
});
