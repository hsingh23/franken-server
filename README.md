# franken-server
A koa server that loads routes from a yaml file with string interpolation. Execs and evals

commands for maximum justice. It is best used for wrapping apis (to support cors call, or transform the data, or return jsonp), command and control, and rapidly prototyping an idea.

After an initial run with config.yaml, you should look at app.js to see how things a hooked up. Install packages that do what you want. Modify the Dockerfile.

Try it:

1. Copy config-example.yaml to config.yaml
2. Run `node app.js` or `npm run start` to start the app

It will read the lines from the config file.  For the demo to work you
need curl, pup and jq installed

1. https://stedolan.github.io/jq/download/
2. https://github.com/ericchiang/pup/releases
3. https://curl.haxx.se/download.html

Hit the localhost:3337/photos/some+query endpoint on the server
to see some rad json.

Docker:

If you want to go the docker route you can take inspiration from the docker file included. You may need to tweak it to fit your needs



> Make your microservers faster with franken server
