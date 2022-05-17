'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

/** 改动：多入口配置 */
const pages = Object.entries(require('./pageConf'));
const entry = pages.reduce((pre, cur) => {
  const [name, { entry, template }] = cur;
  if(entry) {
    const url = resolveModule(resolveApp,entry);
    pre[`${name}`] = template ? [
      // Runtime code for hot module replacement
      'webpack/hot/dev-server.js',
      // Dev server client for web socket transport, hot and live reload logic
      'webpack-dev-server/client/index.js?hot=true&live-reload=true',
      // Your entry
      url,
    ] : url;
  }
  return pre;
}, {});
const htmlPlugins = pages.reduce((pre, cur) => {
  const [name, { template, filename }] = cur;
  template && pre.push({
    name,
    filename: filename,
    template: resolveApp(template),
  });
  return pre;
}, []);
const requiredFiles = pages.reduce((pre, cur) => {
  const [name, { entry, template }] = cur;
  const entryReal = entry && resolveModule(resolveApp,entry);
  const templateReal =  template && resolveApp(template);
  entryReal && !pre.includes(entryReal) && pre.push(entryReal);
  templateReal && !pre.includes(templateReal) && pre.push(templateReal);
  return pre;
}, []);

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/pages/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
  /** 改动：新增参数 */
  entry,
  requiredFiles,
  htmlPlugins,
};



module.exports.moduleFileExtensions = moduleFileExtensions;