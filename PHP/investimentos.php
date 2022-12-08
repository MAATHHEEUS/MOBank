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
    $id_conta = $_POST['id_conta'];
    
    # Busca os investimentos do cliente
    $qry = "SELECT * FROM `investimentos` WHERE conta = $id_conta";
    $resultset = mysqli_query($conn, $qry);

    # Verifica se deu certo a consulta
    if (!$resultset){
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro ao consultar os investimentos. " . mysqli_error($conn)
        ));
        return;
        break;
    }

    # Verifica se retornou linhas
    $qntd = mysqli_num_rows($resultset);
    if ($qntd < 0) {
        echo json_encode(array(
            'tipo' => 'E',
            'msg' => "Erro: Nenhum investimento cadastrado para esse cliente!"
        ));
        return;
        break;
    }

    # Monta a grid de consulta
    $grid = "<table class='table table-holver table-striped table-bordered'>";
    $grid .= "<tr>";
    $grid .= "<th>#</th>";
    $grid .= "<th>Valor</th>";
    $grid .= "<th>Data</th>";
    $grid .= "<th>Rendimento</th>";
    $grid .= "<th>%</th>";
    $grid .= "<th>Origem</th>";
    $grid .= "</tr>";
    while($row = mysqli_fetch_assoc($resultset)){
        $grid .= "<tr>";
        $grid .= "<td>".$row['id_investimento']."</td>";
        $grid .= "<td>".$row['valor']."</td>";
        $grid .= "<td>".$row['dt_invest']."</td>";
        $grid .= "<td>".$row['rendimento']."</td>";
        $grid .= "<td>".$row['percentual_rend']."</td>";
        $grid .= "<td>".$row['tipo_invest']."</td>";
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