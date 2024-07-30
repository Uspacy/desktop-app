import isDev from 'electron-is-dev';

import { getClusterByLocale } from './locale';

export const getStartUrl = () => {
	if (isDev) return 'https://stage3.staging.uspacy.tech';
	// if (isDev) return 'http://localhost:3002';
	const cluster = getClusterByLocale();
	return `https://auth.uspacy.${cluster}`;
};
