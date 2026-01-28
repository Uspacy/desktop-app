import { ipcRenderer } from 'electron';

// Send notification to main process (uses native Electron Notification)
window.addEventListener('showNotification', (e: CustomEvent<{ title: string; body: string; icon?: string; data?: unknown }>) => {
	ipcRenderer.send('show-notification', e.detail);
});

// Receive notification click from main process
ipcRenderer.on('notification-clicked', (_, data: unknown) => {
	const event = new CustomEvent('desktopNotificationClick', { detail: data });
	window.dispatchEvent(event);
});

// Badge count
window.addEventListener('setBadgeCount', (e: CustomEvent) => {
	const { count = 0 } = e.detail;
	ipcRenderer.send('update-badge', count);
});
