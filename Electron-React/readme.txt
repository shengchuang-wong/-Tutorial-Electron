Steps to create electron project
================================
1. npm init
2. npm install  --save electron
3. create "index.js"
4. create "index.html"
5. modify package.json "scripts"
"electron": "electron ." <<< default will start index.js since "main" == "index.js"
6. npm run electron

- CTRL + R to refresh <<< refresh only .html not .js

7. Communication between mainWindow and Electron App
ipcRenderer.send -> ipcMain.on (window -> app)
mainWindow.webContents.send -> ipcRenderer.on(app -> window)

Note:
=====
1. mainWindow can use common js module (e.g. require('fs'))
2. https://www.wikihow.com/Install-FFmpeg-on-Windows <<< To install ffmpeg
