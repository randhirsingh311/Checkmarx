if (process.argv.length !== 5) {
  console.log('  Usage: node scanBranches.js [<domain>\\]<username> <password> <comma-separated-branch-ids>');
  return console.log('Example: node scanBranches.js sys_cool_account Pa$$w0rd 4,13,177');
}

var userMatch = process.argv[2].match(/(?:(.*?)\\)?(.*)/)

var codeScan = require('./index')({
  domain: userMatch[1],
  username: userMatch[2],
  password: process.argv[3]
});

codeScan.scan({branches: process.argv[4].split(',')})
  .catch(function(error) {
    console.error('[scanBranches] Error: ', error);
    process.exitCode = 1;
  });

