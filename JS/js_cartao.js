//Variáveis
let bot_transferir = document.getElementById('bot_transferir')
bot_transferir.addEventListener('click', transferir)
let formPHP = "../PHP/cartao.php"
var msg = document.getElementById('msg')

//Pega os dados salvos no dadosLocais (LocalStorage)
var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

var id_conta = obj.id
var saldo = obj.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})

//Funções 
function transferir() {
    // Campos Obrigatórios
    var senha = document.getElementById('senha').value

    if(Number(senha) <= 0) {
        alert('Dados digitados Inválidos!')
        return
    }

    cad_transferir()
}

function cad_transferir() {
    var tipoCartao = document.querySelector('input[name="tipoCartao"]:checked').value
    var senha = document.getElementById('senha').value
    var dados = new FormData() 
    dados.append('acao', 'cad_transferir')
    dados.append('tipoCartao', tipoCartao)
    dados.append('senha', senha)
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
                        alert('Numero do cartão solicitado: ' + resposta.numeroCartao)
                        //ir para pag iframe
                        open("../HTML/frame.html","_self")
                        // salva os dados no dadosLocais (LocalStorage)
                        var dadosLocais = JSON.stringify({
                            saldo : resposta.saldo,
                            id : id_conta
                        });
                        localStorage.setItem("storage", JSON.stringify(dadosLocais));
                        break

                    case 'carregaCartoes':
                        $('#grid').html(resposta.grid)
                        break    
                }
            }
        } )
        return
}

$('#botNovo').click(
    function(){
        document.getElementById('cad').removeAttribute("hidden")
        return
})

$( document ).ready(function() {
    carregaCartoes();
    return
});

function carregaCartoes() {
    var dados = new FormData() 
    dados.append('acao', 'carregaCartoes')
    dados.append('id_conta', id_conta)
    enviar(dados)
    return
}