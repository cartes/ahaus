<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request) {
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
                'community_id' => 'required|integer'
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
}
