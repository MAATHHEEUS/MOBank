//Variáveis
let bot_transferir = document.getElementById('gerar')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/extrato.php"
var msg = document.getElementById('msg')

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

var id_conta = obj.id
var saldo = obj.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})

//Funções 
function transferir() {
    cad_transferir()
}

function cad_transferir() {
    var dados = new FormData() 
    dados.append('acao', 'cad_transferir')
    dados.append('id_conta', id_conta)
    dados.append('periodo', periodo)
    enviar(dados)
}

function enviar(dados){
    //ajax
    $.ajax({
        url: formPHP,
        method: 'post',
        data: dados,
        processData: false,
        contentType: false,
        dataType: 'json'
        }).done(function(resposta){
            msg.innerHTML = resposta.msg
            if (resposta.tipo === 'E') {
                alert(resposta.msg)
                return
            }
            else{
                switch (dados.get('acao')) {
                    case 'cad_transferir':
                        document.getElementById('gridTransferencias').removeAttribute("hidden")
                        $('#gridTransferencias').html(resposta.gridTransferencias)
                        document.getElementById('gridPix').removeAttribute("hidden")
                        $('#gridPix').html(resposta.gridPix)
                        document.getElementById('gridBoletos').removeAttribute("hidden")
                        $('#gridBoletos').html(resposta.gridBoletos)
                        break;
                }
            }
        } )
}