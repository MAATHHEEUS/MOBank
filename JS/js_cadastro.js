//Variáveis
let bot_cadastra = document.getElementById('bot_cadastrar')
bot_cadastra.addEventListener('click', cadastrar)
let dados = new FormData()
let formPHP = "../PHP/cadastro.php"
var msg = document.getElementById('msg')
const camposFormulario = document.querySelectorAll("[required]");

const tiposErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        patternMismatch: "Por favor, preencha uma senha válida com 6 dígitos.",
        tooShort: "O campo de senha não tem caractéres suficientes."
    },
    CPF: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    dt_nascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if(campo.name == "dt_nascimento" && campo.value != ""){
        if(!verificaIdade(campo))campo.setCustomValidity("O usuário não é maior de idade!");
    }
    tiposErro.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });
    const validadorDeInput = campo.checkValidity();
    if(!validadorDeInput)msg.textContent = mensagem;
    else msg.textContent = "";
}

function verificaIdade(campo) {
    const dtNasc = new Date(campo.value);
    const dtAtual = new Date();
    // Pega a data de nascimento e soma 18 anos
    const dtMais18 = new Date(dtNasc.getUTCFullYear() + 18, dtNasc.getUTCMonth(), dtNasc.getUTCDate());

    // Se a data atual é superior a data quando o usuário fez 18 
    return dtAtual >= dtMais18;
}

//Funções 
function cadastrar() {
    var CPF = document.getElementById('CPF').value.replace(/\.|-/g, "");
    var nome = document.getElementById('nome').value
    var senha = document.getElementById('senha').value
    if(Number(CPF) <= 0 || nome === '' || senha.length !== 6) {
        msg.innerHTML = `DADOS INVÁLIDOS!!!`
        alert(`DADOS INVÁLIDOS!!!`)
    }else if(validarCPF(CPF) == false){
        msg.innerHTML = `CPF INVÁLIDO!!!`
        alert(`CPF INVÁLIDO!!!`)
    }else {
        dados.append('cpf', CPF)
		dados.append('nome', nome)
		dados.append('senha', senha)
		dados.append('email', document.getElementById('email').value)
        dados.append('tipo_conta', document.getElementById('tipo_conta').value)
        enviar()
    }
}

function enviar(){
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
            if (resposta.tipo === 'OK') {
                alert(`PARABÉNS!!! VOCÊ AGORA É UM CLIENTE MOBANK\n Sua conta é: ${resposta.conta}\n Sua agência é: ${resposta.agencia}\n Com senha: ${resposta.senha}`)
                // Volta para pagina de login
                open("../HTML/index.html","_self")    
            }
        } )
}

//Validação de CPF(Sim validação na controller!)
function validarCPF(CPF) {
    if(validaNumerosRepetidos(CPF))return false;
    var soma = 0
    var resto = 0

    // --- PRIMEIRO DÍGITO --- //
    for (let index = 1; index <= 9; index++) {//multiplica os 9 primeiros digitos por numeros decrescente de 10 a 2 e soma tudo
        soma += parseInt(CPF.substring(index-1, index)) * (11-index)
    }
    //console.log(soma)
    resto = (soma * 10) % 11 //resto da divisão por 11 multiplicado por 10
    //console.log(resto)
    if(resto == 10 || resto == 11) {//se resto for 10 ou 11 será considerado 0. Senão fica com resto da divisão mesmo
        resto = 0
    }
    if(resto != parseInt(CPF.substring(9, 10))) {//verifica se o primeiro dígito verificador é diferente do resto
        return false
    }
    soma = 0

    
    // --- SEGUNDO DÍGITO --- //
    for (let index = 1; index <= 10; index++){
        soma += parseInt(CPF.substring(index-1, index)) * (12-index)
    }
    //console.log(soma)
    resto = (soma * 10) % 11
    //console.log(resto)
    if(resto == 10 || resto == 11) {
        resto = 0
    }
    if(resto != parseInt(CPF.substring(10, 11))) {//verifica se o segundo dígito verificador é diferente do resto
        return false
    }
    return true
}

function validaNumerosRepetidos(CPF) {
    const lista = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    return lista.includes(CPF);
}