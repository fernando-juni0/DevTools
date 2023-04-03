document.querySelectorAll('.menu-button').forEach(element => {
    element.addEventListener('click', event=>{
        let downloads = document.getElementById('main-downloads')
        let otimi = document.getElementById('main-otimizacao')
        let config = document.getElementById('main-configs')
        switch (element.getAttribute('data-menu')) {
            case 'downloads':
                downloads.style.display = 'block'
                otimi.style.display = 'none'
                config.style.display = 'none'
                break;
            case 'otimizacao':
                downloads.style.display = 'none'
                otimi.style.display = 'block'
                config.style.display = 'none'
                break;
            case 'configs':
                downloads.style.display = 'none'
                otimi.style.display = 'none'
                config.style.display = 'block'
                break;
        }
    })
});



// download-Script
var downloadSelected = []
document.querySelectorAll('.downloads-inputs').forEach(itens=>{
    itens.addEventListener('change', async (res)=>{
        let data = itens.getAttribute('data-value')
        let inc = downloadSelected.includes(data)

        if (inc == false) {
            downloadSelected.push(data)
        }else{
            const index = downloadSelected.indexOf(data);
            if (index > -1) {
                downloadSelected.splice(index, 1);
            }
        }
    })
})



document.getElementById('baixar').addEventListener('click',()=>{
   if (downloadSelected.length <= 0 ) {
    alert('Selecione um Item')
   }else{
        window.electronAPI.downloadData(downloadSelected)
        document.querySelectorAll('.downloads-inputs').forEach(itens=>{
            itens.checked = false;
        })
        downloadSelected.length = 0
        alert('Baixando...')
   }
    
})


// otimizacao-script


var otmiSelected = []
document.querySelectorAll('.otmi-inputs').forEach(itens=>{
    itens.addEventListener('change', async (res)=>{
        let data = itens.getAttribute('data-value')
        let inc = otmiSelected.includes(data)

        if (inc == false) {
            otmiSelected.push(data)
        }else{
            const index = otmiSelected.indexOf(data);
            if (index > -1) {
                otmiSelected.splice(index, 1);
            }
        }
    })
})


document.getElementById('otimizar').addEventListener('click',()=>{
    if (otmiSelected.length <= 0 ) {
     alert('Selecione um Item')
    }else{
        window.electronAPI.otimizacaoData(otmiSelected)
        document.querySelectorAll('.downloads-inputs').forEach(itens=>{
            itens.checked = false;
        })
        otmiSelected.length = 0
        alert('Otimizando...')
    }
     
 })