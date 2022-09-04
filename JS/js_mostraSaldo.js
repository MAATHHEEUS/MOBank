var mostra = document.getElementById('mostrasaldo')
mostra.addEventListener('click', mostrasaldo)
function mostrasaldo() {
    var saldo = document.getElementById('valorsaldo')
    if (saldo.innerText == "saldo R$ xxx,xx") {
        saldo.innerText = "saldo R$ 123,45"
    }else {
        saldo.innerText = "saldo R$ xxx,xx"
    }
} 