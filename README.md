# Trappfika

## Development

You need `node` installed.

Check the JS code with JSHint.

### Running a local server to serve the static files

Just do

`node web.js`

### Using your own firebase db

Edit `trappfika.js` and set `firebaseBaseUrl` to something like `https://your-db-name.firebaseio.com/`

### Running Protractor tests

#### Installing Protractor

Install Protractor with

`npm -g protractor`

On windows, it will install somewhere like `**/Users/**/AppData/**/npm/node_modules/protractor`

Run `./node_modules/protractor/bin/install_selenium_standalone` to install selenium.

And then start it with `selenium/start`. I had to modify the start script slightly, adding `.exe` to `chromedriver`.

#### Running the tests

Have the static file server up and running.

Have the selenium server started.

Run tests like

`protractor test/conf.js`
