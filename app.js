var koa = require('koa')
// var co = require('co')
var bodyParser = require('koa-bodyparser')
var compress = require('koa-compress')
var router = require('koa-router')()
var _ = require('lodash')
var yaml = require('js-yaml')
var fs = require('fs')
var exec = require('co-exec')
var request = require('request-promise')
var req = require('request')
var app = koa()

var defaults = {
  options: {
    debug: false,
    compress: true
  },
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Content-Type': 'text/html'
  },
  process_before: '',
  run: '',
  process_after: ''
}

try {
  var rules = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'))
  _.forEach(rules, (v, path) => {
    router.all(path, function*(next) {
      const {options: {debug}, headers, run, process_before, process_after } = Object.assign({}, defaults, v)
      console.log(path);
      this.set(headers)

      if (debug) console.log('this is set to: ', this)

      if (debug && process_before) console.log('Process before: ', process_before)

      process_before && eval(process_before.trim())

      if (debug && run) console.log('Shell code: ', eval('`' + run + '`'))
      if (run) this.body = yield exec(eval('`' + run + '`'))

      if (debug) console.log('Process after: ', process_after)
      process_after && eval(process_after)

      console.log (this.response.status + "\t" + this.request.method + "\t" + path)
      yield next

    })
  })
} catch (e) {
  console.log(e)
}

app
  .use(function*(next){
    this.set({'Access-Control-Allow-Origin': "*", "Access-Control-Allow-Headers": "Content-Type"})
    yield next
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
  }))

app.listen(3337)
