import gulp from 'gulp';
import chalk from 'chalk';
import browserSync from 'browser-sync';

const bs = browserSync.create('ionic');

let bsInit = function (paths, openOverride) {
  var bsOptions = {
    server: {
      baseDir: paths
    },
    port: 5000
  };
  // if (options.proxy) {
  //   var url = require('url');
  //   var proxyMiddleware = require('proxy-middleware');
  //   var process = require('process');
  //   var path = require('path');
  //   var proxyConfs = require(path.join(process.cwd(), 'package.json'))['generator-m-ionic'].proxies;
  //
  //   console.log('[' + chalk.green('proxy') + '] ' + chalk.bold('Proxy Configuration:'));
  //   console.log(chalk.dim(' ---------------------------------------'));
  //   var middleware = [];
  //   for (var proxyConf, i = 0; (proxyConf = proxyConfs[i]); i++) {
  //     var proxyOptions = url.parse(proxyConf.proxyMapTo);
  //     proxyOptions.route = proxyConf.proxyMapFrom;
  //
  //     middleware.push(proxyMiddleware(proxyOptions));
  //
  //     console.log('   Map From: ' + chalk.green(proxyConf.proxyMapFrom));
  //     console.log('     Map to: ' + chalk.green(proxyConf.proxyMapTo));
  //     console.log(chalk.dim(' ---------------------------------------'));
  //   }
  //   bsOptions.server.middleware = middleware;
  // }
  // if (options.open === false) {
  //   bsOptions.open = false;
  // }
  if (openOverride !== undefined) {
    bsOptions.open = openOverride;
  }
  bs.init(bsOptions);
};

gulp.task('serve', ['build'], () => {
  bsInit(gulp.paths.dist); //serve
  console.log(chalk.magenta('bsInit run'));
  // gulp.watch(`${gulp.paths.dist}/**/*`, ['build'],  () => {
  //   bs.reload();
  // });
});
