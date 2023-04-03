const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { exec, spawn} = require('child_process');
const fs = require('fs')

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
        let array_data = []
        data.forEach(itens=> {
            switch (itens) {
                case 'nav-1':
                    array_data.push('choco install GoogleChrome')
                    break;
                case "nav-2":
                    array_data.push('choco install opera-gx')
                    break;
                case "nav-3":
                    array_data.push('choco install firefox')
                    break;
                case "nav-4":
                    array_data.push('choco install microsoft-edge')
                    break;
                case "drive-1":
                    array_data.push('choco install vcredist2017; choco install vcredist2019; choco install vcredist2015')
                    break;
                case "drive-2":
                    array_data.push('choco install dotnet48')
                    break;
                case "drive-3":
                    array_data.push('iwr -Uri https://aka.ms/winget-cli -OutFile winget-cli.appxbundle')
                    break;
                case "drive-4":
                    array_data.push('choco install driverbooster')
                    break;
                case "other-1":
                    array_data.push('choco install obs-studio')
                    break;
                case "other-2":
                    array_data.push('choco install cpu-z')
                    break;
                case "other-3":
                    array_data.push('winget install TranslucentTaskbar')
                    break;
                case "other-4":
                    array_data.push('choco install winrar')
                    break;
                case "other-5":
                    array_data.push('winget install Microsoft.WindowsTerminal')
                    break;
                case "other-6":
                    array_data.push('winget install Microsoft.PowerShell')
                    break;
                case "other-7":
                    array_data.push('winget install Microsoft.PowerToys')
                    break;
                case "other-8":
                    array_data.push('winget install Spotify')
                    break;
                case "other-0":
                    array_data.push('winget install AmazonMusic')
                    break;
                case "game-1":
                    
                    break;
                case "game-2":
                    
                    break;
                case "game-3":
                    
                    break;
            
                case "dev-1":
                    array_data.push('choco install git')
                    break;
                case "dev-2":
                    array_data.push('choco install nodejs')
                    break;
                case "dev-3":
                    array_data.push('choco install python')
                    break;
                case "dev-4":
                    array_data.push('winget install Microsoft.VisualStudioCode')
                    break;
                case "dev-5":
                    array_data.push('winget install Microsoft.VisualStudio')
                    break;  
            }
        })
        let convertData = array_data.toString().replace(/,/g, ';')
        spawn('powershell.exe', ['-Command', `Start-Process powershell -Verb RunAs -ArgumentList "${convertData}"`]);
    })

    ipcMain.on('otimizacao-data', (event, data) => {
        let array_data = []
        data.forEach(itens=>{
            switch (itens) {
                case 'otmi-1':
                    array_data.push('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61')
                    break;
                case 'otmi-2':
                    array_data.push('powercfg.exe /hibernate off')
                    break;
                case 'otmi-3':
                    array_data.push('Set-ExecutionPolicy bypass')
                    break;
                case 'otmi-4':
                    exec('cleanmgr.exe /sagerun:1')
                    break;
                case 'otmi-5':
                    tempFiles()
                    break;
                case 'otmi-6':
                    spawn('powershell.exe', ['-Command', `Start-Process powershell -Verb RunAs -ArgumentList "iwr -useb https://christitus.com/win | iex"`]);
                    break;
            }
        })
        let convertData = array_data.toString().replace(/,/g, ';')
        spawn('powershell.exe', ['-Command', `Start-Process powershell -Verb RunAs -ArgumentList "${convertData}"`]);
    })

    ipcMain.on('config-data', (event, data) => {

    })
    
    function tempFiles() {
        const conteudo = `color c
        /s /f /q c:/windows/temp/*.*
        rd /s /q c:/windows/temp
        md c:/windows/temp
        del /s /f /q C:/WINDOWS/Prefetch
        del /s /f /q %temp%/*.*
        rd /s /q %temp%
        md %temp%
        deltree /y c:/windows/tempor~1
        deltree /y c:/windows/temp
        deltree /y c:/windows/tmp
        deltree /y c:/windows/ff*.tmp
        deltree /y c:/windows/history
        deltree /y c:/windows/cookies
        deltree /y c:/windows/recent
        deltree /y c:/windows/spool/printers
        del c:/WIN386.SWP
        cls 
        FOR /F "tokens=1, 2 * " %%V IN ('bcdedit') DO SET adminTest=%%V
        IF (%adminTest%)==(Access) goto noAdmin
        for /F " tokens=*" %%G in ('wevtutil.exe el') DO (call :do_clear "%%G")
        echo.
        echo Event Logs have been cleared! ^<press any key^>
        goto theEnd
        :do_clear
        echo clearing %1
        wevtutil.exe cl %1
        goto :eof
        :noAdmin
        echo You must run this script as an Administrator !
        echo ^<press any key^>
        stop`

        fs.writeFile('C:/clear.bat', conteudo, (err) => {
            if (err) throw err;
            console.log('Arquivo criado com sucesso!');
        });
        exec(`start powershell.exe -NoExit -Command "cd C:/ ;./clear.bat;exit"`);
    }

    installChocolatey()
    async function installChocolatey() {
        const command = 'Import-Module Microsoft.PowerShell.Security; Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://chocolatey.org/install.ps1\'))';
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


