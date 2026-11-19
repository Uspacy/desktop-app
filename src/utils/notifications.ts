import { Notification } from 'electron';

import { clearBadge } from './badge';

// The references kept. Electron doesn't always emit 'close' when a notification goes away, so the set would otherwise
// only grow; the oldest one is closed when it drops out, so that logout still leaves none of the app's notifications
const MAX_TRACKED = 200;

// The notifications on screen and in the notification center, kept to close them on logout
const shown = new Set<Notification>();

export const trackNotification = (notification: Notification) => {
	shown.add(notification);
	if (shown.size > MAX_TRACKED) {
		const oldest: Notification = shown.values().next().value;
		shown.delete(oldest);
		oldest.close();
	}
	const forget = () => shown.delete(notification);
	notification.on('click', forget);
	notification.on('close', forget);
};

// Logout: the next user of this computer doesn't see the previous user's notifications and unread count
export const clearNotifications = () => {
	shown.forEach((notification) => notification.close());
	shown.clear();
	clearBadge();
};
