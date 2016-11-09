# franken-server
A koa server that loads routes from a yaml file and execs and evals
commands for maximum justice

Try it:

1. Copy config-example.yaml to config.yaml
2. Run `node app.js` to start the app

It will read the lines from the config file.  For the demo to work you
need curl, pup and jq installed

1. https://stedolan.github.io/jq/download/
2. https://github.com/ericchiang/pup/releases
3. https://curl.haxx.se/download.html

Hit the localhost:3337/photos/html/some+query endpoint on the server
to see some rad json.

> Make your microservers faster with franken server
