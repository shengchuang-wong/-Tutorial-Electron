1. To auto reload electron during development
> npm install --save-dev electron-reload
- In main.js/index.js, put the code 
require('electron-reload')(__dirname)

2. electron-window-state
- Allow electron app to stay on the place even it is closed then reopen

3. electron-packager (For distribution, and got one more method, go to documentation)
> electron-packager --eletron-version="[version]" --asar-true(this is to encrypt important files) --icon=icon --overwrite


!!! IMPORTANT !!!
This tutortial is outdated, check out latest one about "Application Distribution"

Tips
====
1. electron and electron-reload can install as developer dependencies
2. if npm package version have problem
> npm install -g electron-rebuild
> electron-rebuild -w [package name
3. Devtron can help in development
> npm install --save-dev devtron
Then, in electron app console type in
> require('devtron').install()