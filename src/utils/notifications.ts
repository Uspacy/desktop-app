import { Notification } from 'electron';

import { clearBadge } from './badge';

// Enough for a working day; older references are dropped (those notifications are not closed on logout)
const MAX_TRACKED = 200;

// The notifications on screen and in the notification center, kept to close them on logout
const shown = new Set<Notification>();

export const trackNotification = (notification: Notification) => {
	shown.add(notification);
	if (shown.size > MAX_TRACKED) shown.delete(shown.values().next().value);
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
