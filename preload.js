const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    downloadData: (data) => ipcRenderer.send('download-data', data),
    otimizacaoData: (data) => ipcRenderer.send('otimizacao-data', data),
    configData: (data) => ipcRenderer.send('config-data', data),
})