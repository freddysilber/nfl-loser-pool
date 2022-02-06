import type { NavTabs } from '../models/nav-tab.model';

export enum Routes {
	Home = '/',
	Game = '/game',
	Login = '/login',
	Rules = '/rules',
	Games = '/games',
	Signup = '/sign-up',
	Profile = '/profile',
}

const SHARED_ROUTES: NavTabs = [
	{ path: Routes.Home, label: 'Home' }
];

export class RouterHelper {
	/**
	 * TODO: add some admin routes
	 */
	public getRoutes(isAuthenticated: boolean): NavTabs {
		if (isAuthenticated) {
			return this._getAuthenticatedRoutes(/* isAdmin {boolean} */);
		} else {
			return this._getUnAuthenticatedRoutes();
		}
	}

	public static getAuthenticatedRoutes(): NavTabs {
		return [
			...SHARED_ROUTES,
			{ path: Routes.Rules, label: 'Rules' },
			{ path: Routes.Game, label: 'Game' },
			{ path: Routes.Games, label: 'My Games' },
			{ path: Routes.Profile, label: 'Profile' },
		];
	}

	public static getUnAuthenticatedRoutes(): NavTabs {
		return [
			...SHARED_ROUTES,
			{ path: Routes.Login, label: 'Log In' },
			{ path: Routes.Signup, label: 'Sign Up' },
		];
	}

	private _getAuthenticatedRoutes(): NavTabs {
		return RouterHelper.getAuthenticatedRoutes();
	}

	private _getUnAuthenticatedRoutes(): NavTabs {
		return RouterHelper.getUnAuthenticatedRoutes();
	}
}