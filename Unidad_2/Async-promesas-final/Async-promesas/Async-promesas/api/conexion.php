<?php
function send_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");
}
send_cors_headers();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
try {
    $conn = new PDO("mysql:host=127.0.0.1;dbname=doguito_petshop", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(["error" => "Conexión mala: " . $e->getMessage()]));
}

// Conexión a PostgreSQL (Supabase) - Descomenta esta sección para usar Supabase
/*
try {
    $conn = new PDO(getenv('DATABASE_URL'));
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(["error" => "Conexión mala: " . $e->getMessage()]));
}
*/
//metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET'://guion bajo es palabra reservada en php, se usa para acceder a variables globales, en este caso a la variable que contiene el metodo de la peticion
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM clientes WHERE id = ?");
            $stmt->execute([$id]);
            $cliente = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($cliente);
        } else {
            $stmt = $conn->prepare("SELECT * FROM clientes");
            $stmt->execute();
            $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clientes);
        }
        break;
        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);//leemos y decodificamos el json
            $id = $input["id"] ?? uniqid();//si no se especifica un id, generamos uno unico
            $nombre = $input["nombre"];
            $email = $input["email"];
            $stmt = $conn->prepare("INSERT INTO clientes (id, nombre, email) VALUES (?, ?, ?)");
            if ($stmt->execute([$id, $nombre, $email])) {
                http_response_code(201);
                echo json_encode(["message" => "Creado exitosamente", "id" => $id]);//mensaje de exito, y el id del cliente creado
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error: " . $stmt->errorInfo()[2]]);
            }
            break;
        case 'PUT'://actualizar
            $input = json_decode(file_get_contents("php://input"), true);//leemos y decodificamos el json
            $id = $input["id"];
            $nombre = $input["nombre"];
            $email = $input["email"];
            $stmt = $conn->prepare("UPDATE clientes SET nombre=?, email=? WHERE id=?");
            if ($stmt->execute([$nombre, $email, $id])) {
                http_response_code(201);
                echo json_encode(["message" => "Actualizado exitosamente", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error: " . $stmt->errorInfo()[2]]);
            }
            break;
        case 'DELETE'://eliminar
            $id = $_GET["id"];
            $stmt = $conn->prepare("DELETE FROM clientes WHERE id=?");
            if ($stmt->execute([$id])) {
                http_response_code(200);
                echo json_encode(["message" => "Eliminado exitosamente", "id" => $id]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Error: " . $stmt->errorInfo()[2]]);
            }
            break;

                default:
                    http_response_code(405);//error 405 metodo no permitido o no logrado
                    echo json_encode(["error" => "Todo mal"]);//mensaje de error, y el mensaje del error que se produjo
                    break;
            
}
// Cerrar conexión (opcional para PDO)
$conn = null;
?>
