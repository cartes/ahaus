<?php

namespace App\Http\Controllers;

use App\Community;
use Illuminate\Http\Request;

class CommunityController extends Controller
{

    public function __construct()
    {
        $this->middleware("api.auth", [
            "except" => ['index']
        ]);
    }

    public function index()
    {
        $communities = Community::all();

        $data = [
            'status' => 'success',
            'code' => 200,
            'community' => $communities
        ];

        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $community = Community::find($id);

        if (is_object($community)) {
            $data = [
                "status" => "success",
                "code" => 200,
                "community" => $community
            ];
        } else {
            $data = [
                "status" => "error",
                "code" => 404,
                "message" => __("Comunidad no existe")
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if (!empty($params_array) && !empty($params)) {
            $validate = \Validator::make($params_array, [
                'name' => 'required|alpha',
                'description' => 'required|alpha',
                'address' => 'required|alpha',
                'email' => 'required|email|unique:communities,email',
                'phone' => 'required',
                'unidades' => 'required|integer'
            ]);

            if ($validate->fails()) {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => __('La comunidad no se ha creado'),
                    'errors' => $validate->errors()
                ];
            } else {
                $community = new Community();

                $community->name = (isset($params_array['name'])) ? $params_array['name'] : null;
                $community->description = (isset($params_array['description'])) ? $params_array['description'] : null;
                $community->address = (isset($params_array['address'])) ? $params_array['address'] : null;
                $community->email = (isset($params_array['email'])) ? $params_array['email'] : null;
                $community->phone = (isset($params_array['phone'])) ? $params_array['phone'] : null;
                $community->unidades = (isset($params_array['unidades'])) ? $params_array['unidades'] : null;

                $community->save();

                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'message' => __('La comunidad ha sido creada existosamente'),
                    'community' => $community
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

    public function update($id, Request $request)
    {
        $json = $request->input('json', null);

        $params_array = json_decode($json, true);

        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'name' => 'required'
            ]);

            unset($params_array['id']);
            unset($params_array['created_at']);

            if ($validate->fails()) {
                $data = [
                    "status" => "error",
                    "code" => 400,
                    "message" => __('Faltan datos'),
                    "error" => $validate->errors()
                ];
            } else {
                $community = Community::where('id', $id)->update($params_array);

                $data = [
                    'status' => 'success',
                    "code" => 200,
                    "category" => $params_array
                ];
            }
        } else {
            $data = [
                "status"  => "error",
                "code"  => 400,
                "message" => __("No se ha recibido ningún dato")
            ];
        }

        return response()->json($data, $data['code']);
    }
}
