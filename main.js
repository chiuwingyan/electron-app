const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // activate 只会在【首次启动应用程序】、【在程序已经运行后再次打开程序】或【单击应用程序的坞站或任务栏图标时】重新激活它。如果是使用 Cmd+Tab 切换，是不会激活的，这个时候需要 did-become-active 。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
