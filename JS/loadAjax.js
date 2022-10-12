var msg = document.getElementById('msg')
    $.getJSON("cadastro.php", "campo1=dado1&campo2=dado2&campo3=dado3", function( data ) {
    msg.innerHTML = data.nome;
    msg.innerHTML += data.idade
}); 
