import isDev from 'electron-is-dev';

import { getClusterByLocale } from './locale';

export const getStartUrl = () => {
	if (true) return 'https://stage1.staging.uspacy.tech';
	if (isDev) return 'https://stage1.staging.uspacy.tech';
	// if (isDev) return 'http://localhost:3000';
	const cluster = getClusterByLocale();
	return `https://auth.uspacy.${cluster}`;
};
