var _ = require('lodash');

module.exports = function (config) {

  var username = config.username;
  var password = config.password;
  var domain = config.domain || 'amr';
  var apiRoot = config.apiRoot || 'https://appsecapi.intel.com/v1';


  return {
    scan: scan,
    getScanResults: getScanResults,
    getBranchesByApp: getBranchesByApp
  };

  function scan(options) {
    var scanUsername = options.username || username;
    var scanPassword = options.password || password;
    var scanDomain = options.domain || domain;
    var scanApiRoot = options.apiRoot || apiRoot;
    var branches = options.branches;

    if (branches) {
      var request = require('intc-request');

      var requestOptions = {
        authType: 'isso',
        url: scanApiRoot + '/branches',
        username: scanUsername,
        password: scanPassword,
        domain: scanDomain,
        // resolveWithFullResponse: true,
        body: {
          "data": {
            "id": branches,
            "type": "branch",
            "attributes": {
              "nextScanAt": "2016-01-01",
              "status": "awaitingscan",
              "errorCount": 0
            }
          }
        }
      };
      return request.put(requestOptions);
    }
    else {
      return Promise.reject(new Error('No branches specified to rescan'));
    }

  }

  function getScanResults(options) {
    throw new Error('this feature not yet implemented');
  }

  function getBranchesByApp(options) {
    var localUsername = options.username || username;
    var localPassword = options.password || password;
    var localDomain = options.domain || domain;
    var localApiRoot = options.apiRoot || apiRoot;

    var appId = options.app;

    if (appId) {
      var request = require('intc-request');

      var requestOptions = {
        authType: 'isso',
        url: localApiRoot + '/projects?filter={"externalId":"' + appId + '"}&include=branches&linkRelated',
        username: localUsername,
        password: localPassword,
        domain: localDomain
      };
      // get request for project, include will put branches in the same payload (included section).
      return request.get(requestOptions)
        .then(function(results) {
          if (!results.included) {
            throw new Error('Branches found for application');
          }
          // grab only active branches
          var branches = _.filter(results.included, function(include) {
            return ((include.type == 'branch') && (include.attributes.active == true));
          });
          // we just want the id
          return _.map(branches, 'id');
        })
    }
    else {
      return Promise.reject(new Error('No branches specified to rescan'));
    }

  }

};

