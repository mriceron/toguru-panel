# Toguru management panel
Webpanel for managing [Toguru](https://github.com/AutoScout24/toguru) toggles.

![Toguru management panel screen](http://i.piccy.info/i9/15a363204b2e3280e3af68a8936c387c/1489583710/133191/1116036/Screen_Shot_2017_03_15_at_14_14_45.png)

## Usage
Download last version (1.0.0) of toguru-panel [here](https://github.com/AutoScout24/toguru-panel/releases/download/1.0.0/toguru-panel.zip) and configure it!

### Configuration
In `config.json` file you can configure toguru-panel for you own purposes.
- `apiUrl` - link to your Toguru service instance
- `slackLink` (optional) - Link on your Slack channel for support. To find out team id please use this [team.info API](https://api.slack.com/methods/team.info) and for channel id use this [channels.list API](https://api.slack.com/methods/channels.list).

### Build
If you want to build your distributive of toguru-panel manually, you might have preinstalled [NodeJS](https://nodejs.org/) and [Gulp](http://gulpjs.com/).  
To run production build, use: `gulp dist:production`.

### Development
If you want to develop toguru-panel, use default gulp task. It will serve application with watches and fast development builds.

## Licence
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
