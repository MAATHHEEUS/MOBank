<?php

$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "MOBANK";
$porta = "3306";

#cria a conexão
$conn = mysqli_connect($servidor, $usuario, $senha, $banco, $porta);

#checa a conexão
if (!$conn) {
    $conect = false;
    $error = mysqli_connect_error();
}
else{
    $conect = true;
}