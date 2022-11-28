'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const semver = require('semver')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpackDevServer.config')
const getClientEnvironment = require('../config/env')
const react = require(require.resolve('react', { paths: [paths.appPath] }))
// const { copyPublicFolder } = require('./utils');

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles(paths.requiredFiles)) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(process.env.HOST))}`))
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`)
  console.log(`Learn more here: ${chalk.yellow('https://cra.link/advanced-config')}`)
  console.log()
}
// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    return choosePort(HOST, DEFAULT_PORT)
  })
  .then((port) => {
    if (port == null) {
      // We have not found a port.
      return
    }
    process.env.REACT_APP__HOST__ = HOST
    process.env.REACT_APP__PORT__ = port
    const config = configFactory('development')
    /** 改动：手动 HRM，在 crx 中必须带上 hostname、port 否则无法热更新，坑了很久。。。 */
    const pages = Object.entries(require('../config/pageConf'))
    const watchRunDir = []
    pages.forEach((cur) => {
      const [name, { template }] = cur
      const url = config.entry[name]
      if (url) {
        if (template) {
          // https://webpack.js.org/guides/hot-module-replacement/#via-the-nodejs-api
          config.entry[name] = [
            'webpack/hot/dev-server.js',
            `webpack-dev-server/client/index.js?hot=true&live-reload=true&hostname=${HOST}&port=${port}`,
            url,
          ]
        } else {
          watchRunDir.push(`src/pages/${name}/`)
        }
      }
    })
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name

    const useTypeScript = fs.existsSync(paths.appTsConfig)
    const urls = prepareUrls(protocol, HOST, port, paths.publicUrlOrPath.slice(0, -1))
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config,
      urls,
      useYarn,
      useTypeScript,
      webpack,
    })

    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic, paths.publicUrlOrPath)
    /** 改动：SSE 通知 chrome.runtime.reload */
    const SSEStream = require('ssestream').default
    let sseStream
    // Serve webpack assets generated by the compiler over a web server.
    const serverConfig = {
      ...createDevServerConfig(proxyConfig, urls.lanUrlForConfig),
      host: HOST,
      port,
      setupMiddlewares: (middlewares, _devServer) => {
        if (!_devServer) {
          throw new Error('webpack-dev-server is not defined')
        }
        /** 改动：/reload path SSE */
        middlewares.unshift({
          name: 'handle_content_change',
          // `path` is optional
          path: '/reload',
          middleware: (req, res) => {
            console.log('sse reload')
            sseStream = new SSEStream(req)

            sseStream.pipe(res)
            res.on('close', () => {
              sseStream.unpipe(res)
            })
          },
        })

        return middlewares
      },
    }
    const devServer = new WebpackDevServer(serverConfig, compiler)
    // Launch WebpackDevServer.
    devServer.startCallback(() => {
      if (isInteractive) {
        clearConsole()
      }

      if (env.raw.FAST_REFRESH && semver.lt(react.version, '16.10.0')) {
        console.log(chalk.yellow(`Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`))
      }

      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(urls.localUrlForBrowser)

      /** 改动：监听 public/* ，复制最新到 build，之前 copy 配置不对的临时方案 */
      // fs.watch(paths.appPublic, (eventType, filename) => {
      //   // console.log(`event type is: ${eventType}`);
      //   if (filename && !filename.endsWith('.html') && !filename.endsWith('~'))
      //     fs.copyFile(`${paths.appPublic}/${filename}`, `${paths.appBuild}/${filename}`, () => {
      //       console.log(`--- copy ${paths.appPublic}/${filename} to ${paths.appBuild}/${filename} ---`);
      //     });
      // });
      /** 改动：console.log 监听文件变化 */
      let contentOrBackgroundIsChange = false
      compiler.hooks.watchRun.tap('WatchRun', (comp) => {
        if (comp.modifiedFiles) {
          const changedFiles = Array.from(comp.modifiedFiles, (file) => `\n  ${file}`).join('')
          console.log('FILES CHANGED:', changedFiles)
          if (watchRunDir.some((p) => changedFiles.includes(p))) {
            contentOrBackgroundIsChange = true
          }
        }
      })

      compiler.hooks.done.tap('contentOrBackgroundChangedDone', () => {
        if (contentOrBackgroundIsChange) {
          contentOrBackgroundIsChange = false
          console.log('--------- 发起 chrome reload 更新 ---------')
          sseStream?.writeMessage(
            {
              event: 'content_changed_reload',
              data: {
                action: 'reload extension and refresh current page',
              },
            },
            'utf-8',
            (err) => {
              sseStream?.unpipe()
              if (err) {
                console.error(err)
              }
            }
          )
        }
      })

      compiler.hooks.failed.tap('contentOrBackgroundChangeError', () => {
        contentOrBackgroundIsChange = false
      })
    })

    ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close()
        process.exit()
      })
    })

    if (process.env.CI !== 'true') {
      // Gracefully exit when stdin ends
      process.stdin.on('end', function () {
        devServer.close()
        process.exit()
      })
    }
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
