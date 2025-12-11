import { importRemote as importRemoteMF } from 'module-federation-import-remote';
import { ComponentType, PropsWithChildren } from 'react';
export type Scope =
	| 'container'
	| 'auth'
	| 'chat'
	| 'profile'
	| 'newsfeed'
	| 'migration'
	| 'company'
	| 'tasks'
	| 'crm'
	| 'marketplace'
	| 'automations'
	| 'analytics'
	| 'trash'
	| 'marketing'
	| 'home';

export const getPortByScope = (scope: Scope) => {
	switch (scope) {
		case 'container':
			return 3000;
		case 'auth':
			return 3001;
		case 'chat':
			return 3002;
		case 'profile':
			return 3003;
		case 'newsfeed':
			return 3004;
		case 'migration':
			return 3005;
		case 'company':
			return 3006;
		case 'tasks':
			return 3007;
		case 'crm':
			return 3008;
		case 'marketplace':
			return 3009;
		case 'automations':
			return 3010;
		case 'analytics':
			return 3011;
		case 'marketing':
			return 3013;
		case 'trash':
			return 3014;
		case 'home':
			return 3015;
	}
};

export const getUrlByScope = (scope: Scope) => {
	const port = getPortByScope(scope);
	if (process.env.NODE_ENV === 'development' && port) {
		return `http://localhost:${port}`;
	}
	return `https://auth.uspacy.com/${scope === 'container' ? '' : scope}`;
};

type DefaultComponent<P = unknown> = (props: PropsWithChildren<P>) => JSX.Element;
export const importRemote = <P extends object>(scope: Scope, module: string, defaultComponent: DefaultComponent<P> = () => null) => {
	const url = getUrlByScope(scope);
	return importRemoteMF<{ default: ComponentType<P> }>({ url, scope, module }).catch((error) => {
		// eslint-disable-next-line no-console
		console.error(`[importRemote] Failed to load module "${module}" from scope "${scope}" (${url})`, error);
		return { default: defaultComponent };
	});
};
