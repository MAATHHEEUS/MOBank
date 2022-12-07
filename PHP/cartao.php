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

#Recebe os dados do form
$acao = $_POST['acao'];

if($acao == 'cad_transferir'){
    $tipoCartao = $_POST['tipoCartao'];
    $senha = $_POST['senha'];
    $id_conta = $_POST['id_conta'];

    #Pega os dados gerados pelo sistema
    $numero = date("BHis")."";
    $bandeira = 'Elo';

    #Cadastra um pix
    $qry = "INSERT INTO `cartoes`(`id_cartao`, `conta`, `senha`, `numero`, `cod_verificador`, `bandeira`, `tipo_cartao`) VALUES (default,$id_conta,$senha,$numero,123,$bandeira,$tipoCartao)";

    #Executa query
    mysqli_query($conn, $qry);

    #Pega o id_cartao retornado do insert
    $id_cartao = mysqli_insert_id($conn);

    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Solicitação de cartão OK",
        'numeroCartao' => $numero,
    ));
    return;
}

if($acao == 'carregaCartoes'){
    $id_conta = $_POST['id_conta'];
    
    # Busca os cartões do cliente
    $qry = "SELECT * FROM `cartoes` WHERE conta = $id_conta";
    $resultset = mysqli_query($conn, $qry);

    # Verifica se deu certo a consulta
    if (!$resultset){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao consultar os cartões. " . mysqli_error($conn)
        ));
        return;
        break;
    }

    # Verifica se retornou linhas
    $qntd = mysqli_num_rows($resultset);
    if ($qntd < 0) {
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro: Nenhum cartão cadastrado para esse cliente!"
        ));
        return;
        break;
    }

    # Monta a grid de consulta
    $grid = "<table class='table table-holver table-striped table-bordered'>";
    $grid .= "<tr>";
    $grid .= "<th>#</th>";
    $grid .= "<th>Número</th>";
    $grid .= "<th>Ações</th>";
    $grid .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $grid .= "<tr>";
        $grid .= "<td>".$row['id_cartao']."</td>";
        $grid .= "<td>".$row['numero']."</td>";
        $grid .= "<td><button onclick=\"detalhes(".$row['id_cartao'].")\" class='btn btn-success'>Detalhes</button><button onclick=\"bloquear(".$row['id_cartao'].")\" class='btn btn-danger'>Bloquear</button></td>";
        $grid .= "</tr>";
    }
    $grid .= "</tr>";
    
    echo json_encode(array(
        'tipo' => 'OK',
        'msg' => "Pronto!",
        'grid' => $grid
    ));
    return;            
}