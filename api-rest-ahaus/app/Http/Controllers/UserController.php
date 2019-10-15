<?php

namespace App\Http\Controllers;

use App\Helpers\JwtAuth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware("api.auth", [
            "except" => ['index', 'login', 'store', 'getImage']
        ]);
        $this->middleware("cors");
    }

    public function getUsers($id = null) {
        if (!empty($id)) {
            $users = User::where('community_id', $id)->get();
        } else {
            $users = User::all();
        }
        $data = [
            'status'=> 'success',
            'code' => 200,
            'users' => $users
        ];

        return response()->json($data, $data['code']);
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

                if (!empty($params->gettoken)) {
                    $signup = $jwtAuth->signup($params->email, $pwd, true);
                }
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
                'email' => 'required|email',
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

    public function detail($id)
    {
        $user = User::find($id);

        if (is_object($user)) {
            $data = [
                'status' => 'success',
                'code' => '200',
                'user' => $user
            ];
        } else {
            $data = [
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

    public function destroy($id, Request $request)
    {
        $user = User::find($id);

        $user->delete();

        $data = [
            'status' => 'success',
            'code' => 200,
            'user' => $user
        ];

        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $image = $request->file("file0");

        // Validacion de imágenes

        $validate = \Validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);

        if (!$image || $validate->fails()) {
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            ];
        } else {
            $image_name = time() . $image->getClientOriginalName();
            \Storage::disk("users")->put($image_name, \File::get($image));

            $data = [
                'status' => 'success',
                'code' => 200,
                'image' => $image_name
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function getImage($filename) {
        $isset = \Storage::disk('users')->exists($filename);

        if ($isset) {
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        } else {
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'Archivo no existe'
            ];

            return response()->json($data, $data['code']);
        }
    }
}
