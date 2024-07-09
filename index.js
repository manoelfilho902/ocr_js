
function init() {
    const area = $('#drop-area');
    const inp = $('#inp-file');
    const inpSys = $('#inp-sys');

    let prevent = (event) => {
        event.preventDefault();
    }
    area.on('dragover dragenter', prevent)

    area.on('drop', (event) => {
        event.preventDefault();
        inp.prop('files', event.originalEvent.dataTransfer.files);
        orc();
    })

    area.on('click', (event) => {
        inp.trigger('click')
    })
    inp.on('change', (event)=>{
        orc(event)
    })

    inpSys.on('keyup', (event)=>{
        inpSys.val(inpSys.val().replace(/[^0-9]/g, ''))
    })
    
}

function orc() {
    const inpCli = $('#inp-cli');
    const inpSys = $('#inp-sys');
    const container = $('#container-lbl')

    const inp = document.getElementById('inp-file');

    Tesseract.recognize(inp.files[0]).then(function (result) {
        console.log(result.text);
        inpCli.val(result.text.replace(/[^0-9]/g, ''));
    }).finally(()=>{
        container.html('');
        container.append(`<label for="" style="${inpCli.val() === inpSys.val() ?  'color: limegreen;">Corresponden :)'  : 'color: red;">Diferentes :('}</label>`)
    })

}



$(document).ready(() => {
    init();
})