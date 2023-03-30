const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { exec, spawn} = require('child_process');


const createWindow = () => {
    const win = new BrowserWindow({
        maxWidth: 800,
        maxHeight: 600,
        minHeight:600,
        minWidth: 800,
        webPreferences: {
            nodeIntegration:true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    
    ipcMain.on('download-data', (event, data) => {
        var array_data = []
        data.forEach(itens=> {
            switch (itens) {
                case 'nav-1':
                    
                    array_data.push('choco install GoogleChrome')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install GoogleChrome"']);
                    break;
                case "nav-2":
                    array_data.push('choco install opera-gx')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install opera-gx"']);
                    break;
                case "nav-3":
                    array_data.push('choco install firefox')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install firefox"']);
                    break;
                case "nav-4":
                    array_data.push('choco install microsoft-edge')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install microsoft-edge"']);
                    break;
                case "drive-1":
                    array_data.push('choco install vcredist2017; choco install vcredist2019; choco install vcredist2015')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install vcredist2017; choco install vcredist2019; choco install vcredist2015"']);
                    break;
                case "drive-2":
                    array_data.push('choco install dotnet48')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install dotnet48"']);
                    break;
                case "drive-3":
                    array_data.push('iwr -Uri https://aka.ms/winget-cli -OutFile winget-cli.appxbundle; Add-AppxPackage .\winget-cli.appxbundle')
                    // exec(`start powershell.exe -NoExit -Command ";exit"`);
                    break;
                case "drive-4":
                    array_data.push('choco install driverbooster')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install driverbooster"']);
                    break;
                case "other-1":
                    array_data.push('choco install obs-studio')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install obs-studio"']);
                    break;
                case "other-2":
                    array_data.push('choco install cpu-z')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install cpu-z"']);
                    break;
                case "other-3":
                    array_data.push('winget install TranslucentTaskbar')
                    // exec(`start powershell.exe -NoExit -Command "winget install TranslucentTaskbar;exit"`);
                    break;
                case "other-4":
                    array_data.push('choco install winrar')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install winrar"']);
                    break;
                case "other-5":
                    array_data.push('winget install Microsoft.WindowsTerminal')
                    // exec(`start powershell.exe -NoExit -Command "winget install Microsoft.WindowsTerminal;exit"`);
                    break;
                case "other-6":
                    array_data.push('winget install Microsoft.PowerShell')
                    // exec(`start powershell.exe -NoExit -Command "winget install Microsoft.PowerShell;exit"`);
                    break;
                case "other-7":
                    array_data.push('winget install Microsoft.PowerToys')
                    // exec(`start powershell.exe -NoExit -Command "winget install Microsoft.PowerToys;exit"`);
                    break;
                case "other-8":
                    array_data.push('winget install Spotify')
                    // exec(`start powershell.exe -NoExit -Command "winget install Spotify;exit"`);
                    break;
                case "other-0":
                    array_data.push('winget install AmazonMusic')
                    // exec(`start powershell.exe -NoExit -Command "winget install AmazonMusic;exit"`);
                    break;
                case "game-1":
                    
                    break;
                case "game-2":
                    
                    break;
                case "game-3":
                    
                    break;
            
                case "dev-1":
                    array_data.push('choco install git')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install git"']);
                    break;
                case "dev-2":
                    array_data.push('choco install nodejs')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install nodejs"']);
                    break;
                case "dev-3":
                    array_data.push('choco install python')
                    // spawn('powershell.exe', ['-Command', 'Start-Process powershell -Verb RunAs -ArgumentList "choco install python"']);
                    break;
                case "dev-4":
                    array_data.push('winget install Microsoft.VisualStudioCode')
                    // exec(`start powershell.exe -NoExit -Command "winget install Microsoft.VisualStudioCode;exit"`);
                    break;
                case "dev-5":
                    array_data.push('winget install Microsoft.VisualStudio')
                    // exec(`start powershell.exe -NoExit -Command "winget install Microsoft.VisualStudio;exit"`);
                    break;   
            
            }
        })
        let convertData = array_data.toString().replace(/,/g, ';')
        spawn('powershell.exe', ['-Command', `Start-Process powershell -Verb RunAs -ArgumentList "${convertData}"`]);
    })

    installChocolatey()
    async function installChocolatey() {
      
        // comando para instalar o Chocolatey
        const command = 'Import-Module Microsoft.PowerShell.Security; Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://chocolatey.org/install.ps1\'))';
      
        // executa o PowerShell como administrador
        const powershell = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', command], { shell: true });
      
        powershell.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      
        powershell.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
      
        return new Promise((resolve, reject) => {
          powershell.on('close', (code) => {
            if (code === 0) {
              console.log('Chocolatey instalado com sucesso.');
              resolve();
            } else {
              reject(`Processo filho saiu com código ${code}`);
            }
          });
        });
      }




    win.loadFile('views/index.html')
}



app.whenReady().then(() => {
    createWindow()
})

