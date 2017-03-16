# Toguru management panel
Webpanel for managing [Toguru](https://github.com/AutoScout24/toguru) toggles.

## Usage
Download last version (1.0.0) of toguru-panel [here](#) and configure it!

### Configuration
In `config.json` file you can configure toguru-panel for you own purposes.
- `apiUrl` - link to your Toguru service instance
- `slackLink` (optional) - Link on your Slack channel for support. To find out team id please use this [team.info API](https://api.slack.com/methods/team.info) and for channel id use this [channels.list API](https://api.slack.com/methods/channels.list)
- `hashRouting` (optional, true/false) - enable hash routing for cases when toguru-panel must be served from filesystem.

### Build
If you want to build your distributive of toguru-panel manually, you might have preinstalled [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/).  
To run production build, use: `gulp dist:production`.

### Development
If you want to develop toguru-panel, use default gulp task. It will serve application with watches and fast development builds.

## Licence
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
