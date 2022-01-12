import type { NavTabs } from '../models/nav-tabs.model';

export enum Routes {
	Home = '/',
	Game = '/game',
	Login = '/login',
	Rules = '/rules',
	Games = '/games',
	Signup = '/sign-up',
}

export class RouterHelper {
	public static getRoutes(isAuthenticated: boolean): NavTabs[] {
		if (isAuthenticated) {
			return [
				{ path: Routes.Home, label: 'Home' },
				{ path: Routes.Rules, label: 'Rules' },
				{ path: Routes.Game, label: 'Game' },
				{ path: Routes.Games, label: 'My Games' },
			];
		} else {
			return [
				{ path: Routes.Home, label: 'Home' },
				{ path: Routes.Login, label: 'Log In' },
				{ path: Routes.Signup, label: 'Sign Up' },
			];
		}
	}
}