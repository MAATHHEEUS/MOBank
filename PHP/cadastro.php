<?php
# Includes
include_once "conexao.php";

#Se a conexão deu errado retorna
if($conect == false){
    echo json_encode(array(
        'tipo' => 'E',
        'msg' => $error
    ));
    return;
}
#Recece os dados do form
$cpf = $_POST['cpf'];
$nome = $_POST['nome'];
$email = $_POST['email'];
if($email === ''){
    $email = 'MOBANK@email.com';
}
$password = $_POST['senha'];
$tipo_conta = $_POST['tipo_conta'];

#Variáveis globais
$agencia = 1;

#qry de Inserção do usuário
$qry = "INSERT INTO usuarios VALUES(default, '$nome', '$cpf', '$email', '$password', default)";

#Excuta e testa execução da qry
if (!mysqli_query($conn, $qry)){
    echo json_encode(array(
        'tipo' => 'E',
        'msg' => "Erro ao inserir as informações do usuário: " . mysqli_error($conn)
    ));
	return;
}
#Pega o id_usuário retornado do insert
$id_usuario = mysqli_insert_id($conn);

#Se deu certo cadastra uma conta para o usuário e um acesso
$qry = "INSERT INTO contas VALUES(default, '$tipo_conta', '$agencia', default)";
#Executa consulta
mysqli_query($conn, $qry);
#Pega o id_conta retornado do insert
$id_conta = mysqli_insert_id($conn);

$qry = "INSERT INTO acessos VALUES(default, '$id_usuario', '$id_conta')";

echo json_encode(array(
    'tipo' => 'OK',
    'msg' => "Dados cadastrados com sucesso",
    'conta' => $id_conta,
    'agencia' => $agencia,
    'senha' => $password
));
return;