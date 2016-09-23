<?php namespace App\Http\Controllers;

use App;
use \Firebase\JWT\JWT;
use Hash;
use Config;
use Validator;
use App\Models\User;
use App\Models\Picture;
use App\Models\Vote;
use Illuminate\Http\Request;
use GuzzleHttp;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    protected function createToken()
    {
        $payload = [
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, getenv('APP_KEY'));
    }

    public function get(Request $request)
    {
        $data = ["success" => true, "message" => "yay!"];
        return response()->json($data);
    }

    public function login(Request $request)
    {
        $password = $request->get("password");

        if ($password == getenv("PASSWORD")) {
            return response()->json(['token' => $this->createToken()], 200);
        } else {
            return response()->json(["error" => true, "message" => "la password es incorrecta"], 409);
        }
    }
}
