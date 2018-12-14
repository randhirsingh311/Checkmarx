# intc-code-scan
### Purpose
intc-code-scan is used for programmatic kick-off of appsec portal scans (checkmarx). 
This is primarily done via a team city build step. Under the covers it calls the appsecapi directly.
This module is designed to take the "hard" out of it.

### Installation
preferred: if you are using [_pixi_](http://pixi-ui.apps1-fm-int.icloud.intel.com/#/) as your npm repository then install normally
```
npm install --save intc-code-scan
```
if not using pixi
```
npm install --save intc-code-scan --registry https://pixi.intel.com/
```

### Usage
__Prerequisites:__
* You need a sys_ account which you are probably already using to run your build agent although there's no need for them to be the same.
* The sys_ account must be added to your application in appsec portal in the programmatic scan section. In the [AppSec Portal - static code scan](https://appsec.intel.com/#/stars/surf) choose your application -> static code scan -> programmatic scan (left nav).
* Add all needed repositories into the "repository scanning" section of App Sec Portal.
* Decide if you want to rescan all branches associated with your application, or target specific branch rescans

__Re-scan all application-related branches__
```
node scanApp.js <sys_ACCOUNT> <password> <AppId from IAP>
// example:
node node_modules/intc-code-scan/scanApp.js sys_5starassetmgr superSecretPassword 11007
```

__Re-scan specific branches__
```
node scanBranches.js <sys_ACCOUNT> <password> <comma separated branch ids from appsec portal>
// example:
node node_modules/intc-code-scan/scanBranches.js sys_5starassetmgr superSecretPassword 3262
```

__Team city sample usage__
![team city sample setup](https://github.intel.com/drpresto/intc-code-scan/raw/master/pix/teamCitySample.png)


### Features
  * Run scan - fire and forget step - we use this during development to catch things early, but not necessarily stop deployment in dev.
  * _not implemented yet_ - Wait for scan results - Once implemented this will allow team city builds to wait for results before proceeding.
