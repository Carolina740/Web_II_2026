<?php
// Enviar headers CORS siempre, incluso en errores
function send_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");
}
send_cors_headers();

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//datos de conexion a la base de datos
$servername="127.0.0.1";
$username="root";
$password="";
$dbname="doguito_petshop";

//crear variable de conexion
$conn = new mysqli($servername, $username, $password, $dbname);

//verificar conexion
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Conexión mala: " . $conn->connect_error]));
}

//metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM productos WHERE id=?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $producto = $result->fetch_assoc();
            echo json_encode($producto);
        } else {
            $result = $conn->query("SELECT * FROM productos");
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"] ?? uniqid();
        $nombre = $input["nombre"];
        $precio = $input["precio"];
        
        $stmt = $conn->prepare("INSERT INTO productos (id, nombre, precio) VALUES (?, ?, ?)");
        $stmt->bind_param("ssd", $id, $nombre, $precio);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Producto creado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"];
        $nombre = $input["nombre"];
        $precio = $input["precio"];
        
        $stmt = $conn->prepare("UPDATE productos SET nombre=?, precio=? WHERE id=?");
        $stmt->bind_param("sds", $nombre, $precio, $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Producto actualizado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        break;
        
    case 'DELETE':
        $id = $_GET["id"];
        $stmt = $conn->prepare("DELETE FROM productos WHERE id=?");
        $stmt->bind_param("s", $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Producto eliminado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

$conn->close();
?>