import type { NavTab } from '../models/nav-tab.model';

export enum Routes {
	Home = '/',
	Game = '/game',
	Login = '/login',
	Rules = '/rules',
	Games = '/games',
	Signup = '/sign-up',
	Profile = '/profile',
}

const HOME_ROUTE: NavTab = { path: Routes.Home, label: 'Home' };

export class RouterHelper {
	public getRoutes(isAuthenticated: boolean): NavTab[] {
		if (isAuthenticated) {
			return RouterHelper.getAuthenticatedRoutes();
		} else {
			return RouterHelper.getUnAuthenticatedRoutes();
		}
	}

	public static getAuthenticatedRoutes(): NavTab[] {
		return [
			HOME_ROUTE,
			{ path: Routes.Rules, label: 'Rules' },
			{ path: Routes.Game, label: 'Game' },
			{ path: Routes.Games, label: 'My Games' },
			{ path: Routes.Profile, label: 'Profile' },
		];
	}

	public static getUnAuthenticatedRoutes(): NavTab[] {
		return [
			HOME_ROUTE,
			{ path: Routes.Login, label: 'Log In' },
			{ path: Routes.Signup, label: 'Sign Up' },
		];
	}
}