const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    downloadData: (data) => ipcRenderer.send('download-data', data),
})