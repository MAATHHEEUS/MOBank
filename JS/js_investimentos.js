//Variáveis
let bot_transferir = document.getElementById('botDetalhes')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/investimentos.php"
var msg = document.getElementById('msg')

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

var id_conta = Number(obj.id)
var saldo = Number(obj.saldo)

//Funções 
function transferir() {
    cad_transferir()
}

function cad_transferir() {
    var dados = new FormData() 
    dados.append('acao', 'cad_transferir')
    dados.append('id_conta', id_conta)
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
                        document.getElementById('grid').removeAttribute("hidden")
                        $('#grid').html(resposta.grid)
                        break;
                }
            }
        } )
}