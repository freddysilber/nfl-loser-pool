# NFL Looser Pool

## Description

A simple game you can play to compete against a team of people for the biggest loosing team of the NFL season.

### Getting Started

1. You need to set up a ```.env``` with the following contents:
```bash
# You can use this port or whatever port you desire... I used this one becuase this is what the native api is set up for
VITE_DEV_API=http://localhost:8080
```

2. Fork and clone the api [here](https://github.com/freddysilber/nfl-looser-pool-api)
	* Make sure to follow the set up instructions in the readme!

### Developing

Once you've created a project and installed dependencies with `npm install` (or `npm install` or `yarn`), start a development server:

-   Make sure to start the [api]('https://github.com/freddysilber/nfl-looser-pool-api') first!

```bash
	npm i
	npm run dev
	# or start the server and open the app in a new browser tab
	npm run dev -- --open
```

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
