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
$agencia = $_POST['agencia'];
$password = $_POST['senha'];
$conta = $_POST['conta'];
$acao = $_POST['acao'];

if($acao == 'buscaCliente'){
    #qry de Busca
    $qry = "SELECT u.senha, u.nome, c.id_conta, c.agencia, c.saldo
    FROM contas c JOIN acessos a ON c.id_conta = a.conta
    JOIN usuarios u ON u.id_usuario = a.usuario_id
    WHERE c.id_conta = '$conta' AND c.agencia = '$agencia' AND u.senha = '$password'";
    
    #Executa a query
    $resultado = mysqli_query($conn, $qry);

    #Testa execução da qry
    if (!$resultado){   
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao recuperar os dados do usuário: " . mysqli_error($conn)
        ));
        return;
    }

    #Recebe e verifica se retornou algum usuário
    $row = mysqli_fetch_assoc($resultado);
    if($row === null){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Dados não encontrados, verifique os dados digitados!"
        ));
        return;
    }
    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Cliente OK",
        'nome' => $row['nome'],
        'saldo' => $row['saldo'],
        'id_conta' => $row['id_conta']
    ));
    return;
}
