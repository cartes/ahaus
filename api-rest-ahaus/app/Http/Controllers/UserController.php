<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware("api.auth", [
            "except" => ['index', 'login', 'store']
        ]);
    }

    public function login(Request $request)
    {

        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if (!empty($params_array) && !empty($params)) {
            $validate = \Validator::make($params_array, [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validate->fails()) {
                $signup = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => __('Login no valido'),
                    'errors' => $validate->errors()
                ];
            } else {
                $jwtAuth = new JwtAuth();
                $pwd = hash("sha256", $params->password);

                $signup = $jwtAuth->signup($params->email, $pwd);
            }
        } else {
            $signup = [
                'status' => 'error',
                'code' => 400,
                'message' => __('Debes ingresar datos validos')
            ];
        }

        return response()->json($signup, 200);
    }

    public function register(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if (!empty($params_array) && !empty($params)) {
            $validate = \Validator::make($params_array, [
                'name' => 'required|alpha',
                'surname' => 'required|alpha',
                'tax_id' => 'required|unique:users,tax_id',
                'email' => 'required|email,unique',
                'password' => 'required|min:4',
            ]);

            if ($validate->fails()) {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => __('El usuario no se ha creado'),
                    'errors' => $validate->errors()
                ];
            } else {
                $pwd = hash("sha256", $params->password);
                if (!empty($params_array['birth_date'])) {
                    $birth = Carbon::createFromFormat('d-m-Y', $params_array['birth_date'])->toDateString();
                }

                $user = new User();
                $user->tax_id = (isset($params_array['tax_id'])) ? $params_array['tax_id'] : null;
                $user->name = (isset($params_array['name'])) ? $params_array['name'] : null;
                $user->surname = (isset($params_array['surname'])) ? $params_array['surname'] : null;
                $user->email = (isset($params_array['email'])) ? $params_array['email'] : null;
                $user->community_id = (isset($params_array['community_id'])) ? $params_array['community_id'] : null;
                $user->role_id = (isset($params_array['role_id'])) ? $params_array['role_id'] : 2;
                $user->birth_date = (isset($birth)) ? $birth : null;
                $user->profesion = (isset($params_array['profesion'])) ? $params_array['profesion'] : null;
                $user->institute = (isset($params_array['institute'])) ? $params_array['institute'] : null;
                $user->password = (isset($pwd)) ? $pwd : null;

                $user->save();

                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'message' => __('El usuario ha sido creado'),
                    'user' => $user
                ];
            }
        } else {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => __('No se han enviado datos')
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function detail($id) {
        $user = User::find($id);

        if(is_object($user)) {
            $data = [
                'status' => 'success',
                'code' => '200',
                'user' => $user
            ];
        } else {
            $data  = [
                'status' => 'error',
                'code' => '404',
                'message' => __('El usuario ' . $id . ' no existe')
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function update(Request $request)
    {
        $token = $request->header('Authorization');
        $jwt = new JwtAuth();

        $checkToken = $jwt->checkToken($token);

        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if ($checkToken && !empty($params_array)) {

            $user = $jwt->checkToken($token, true);

            $validate = \Validator::make($params_array, [
                'name' => 'required|alpha',
                'surname' => 'required|alpha',
                'tax_id' => 'required|unique:users,id,' . $user->sub,
                'email' => 'required|email'
            ]);

            unset($params_array['id']);
            unset($params_array['role_id']);
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remember_token']);

            if ($validate->fails()) {
                $data = [
                    'status' => 'error',
                    'code' => 200,
                    'message' => __('Error en la validación'),
                    'errors' => $validate->errors()
                ];
            } else {
                $user_update = User::where('id', $user->sub)->update($params_array);
                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'user' => $user,
                    'changes' => $params_array
                ];
            }

        } else {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => __('Usuario no identificado')
            ];
        }

        return response()->json($data, $data['code']);
    }
}
