//Variáveis
bot_acessar = document.getElementById('bot_acessar')
bot_cadastra = document.getElementById('bot_cadastrar')
let agencia = 0
let conta = 0
let senha = 0
bot_acessar.addEventListener('click', validar)
bot_cadastra.addEventListener('click', cadastrar)

//funções
function validar() {// validar se o cliente digitou corretamente e se o mesmo existe
    agencia = document.getElementById('agencia').value
    conta = document.getElementById('conta').value
    senha = document.getElementById('senha').value
    if(Number(agencia) <= 0 || Number(conta) <= 0) {
        alert('Agência ou Conta Inválidos!')
    }else{
        //if(VALIDAR SE CLIENTE EXISTE NO BANCO DE DADOS) {}
        //if(VALIDAR SE SENHA ESTÁ CORRETA) {}
        alert('Tudo OK!')
        //ir para pag iframe
        open("../HTML/frame.html","blank") 
    }
    
}