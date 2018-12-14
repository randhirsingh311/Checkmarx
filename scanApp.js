if (process.argv.length !== 5) {
  console.log('  Usage: node scanApp.js [<domain>\\]<username> <password> <appId-from-IAP>');
  return console.log('Example: node scanApp.js sys_cool_account Pa$$w0rd 11007');
}

var userMatch = process.argv[2].match(/(?:(.*?)\\)?(.*)/)

var codeScan = require('./index')({
  domain: userMatch[1],
  username: userMatch[2],
  password: process.argv[3]
});

return codeScan.getBranchesByApp({app: process.argv[4]})
  .then(function(branches) {
    return codeScan.scan({branches: branches});
  })
  .catch(function(error) {
    console.error('[scanApp] Error: ', error);
    process.exitCode = 1;
  });
