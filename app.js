var koa = require('koa')
var bodyParser = require('koa-bodyparser')
var compress = require('koa-compress')
var router = require('koa-router')()
var _ = require('lodash')
var yaml = require('js-yaml')
var fs = require('fs')
var exec = require('co-exec')
var request = require('request')
var app = koa()

var defaults = {
  options: {
    debug: false,
    compress: false
  },
  headers: {},
  process_before: '',
  run: '',
  process_after: ''
}

try {
  var rules = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'))
  _.map(rules, (v, path) => {
    router.all(path, function*(next) {
      const {options: {debug, compress}, headers, run, process_before, process_after } = Object.assign({}, defaults, v)

      this.set(headers)

      if (debug) console.log('Process before: ', process_before)
      eval(process_before)

      if (debug) console.log('Shell code: ', eval('`' + run + '`'))
      this.body = yield exec(eval('`' + run + '`'))

      if (debug) console.log('Process after: ', process_after)
      eval(process_after)

      console.log (this.response.status + "\t" + this.request.method + "\t" + path)
      yield next

    })
  })
} catch (e) {
  console.log(e)
}

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress({
    flush: require('zlib').Z_SYNC_FLUSH
  }))

app.listen(3337)
