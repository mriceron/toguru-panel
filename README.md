# Toguru management panel
Webpanel for managing [Toguru](https://github.com/AutoScout24/toguru) toggles.

![Toguru management panel screen](http://i.piccy.info/i9/fd46649a24540d43e8e21ef2ff696767/1489583829/72496/1116036/Screen_Shot_2017_03_15_at_14_16_24.jpg)

## Usage
Download last version (1.1.5) of toguru-panel [here](https://github.com/AutoScout24/toguru-panel/releases/download/1.1.5/toguru-panel.zip), configure it and run! 

### Configuration
In `config.json` file you can configure toguru-panel for your own purposes.
- `apiUrl` - link to your Toguru service instance
- `slackLink` (optional) - Link on your Slack channel for support. To find out team id please use this [team.info API](https://api.slack.com/methods/team.info) and for channel id use this [channels.list API](https://api.slack.com/methods/channels.list)
- `hashRouting` (optional, true/false) - enable hash routing for cases when toguru-panel must be served from filesystem
- `entriesPerPage` (optional) - configure how much entries must be per one page of list.

### Build
If you want to build your distributive of toguru-panel manually, you might have preinstalled [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/).  
To run production build, use: `gulp dist:production`.

### Development
If you want to develop toguru-panel, use default gulp task. It will serve application with watches and fast development builds.

To override default api url for development, please use --apiUrl parameter.  
`gulp --apiUrl https://toguru.autoscout24.com`.

### Docker

You can install and run the application through a docker container using `./npm` script (pipes all commands to npm running inside a node docker container)

- Install deps: `./npm install`
- Run dev server: `./npm run gulp`

## Licence
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
