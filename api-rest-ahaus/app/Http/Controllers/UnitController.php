<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function register(Request $request) {
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        if (!empty($params_array) && !empty($params)) {
            $validate = \Validator::make($params_array, [
                'community_id' => 'required|integer',
                'name' => 'required',
                'meters' => 'required|between:1,5000.99'
            ]);

            if ($validate->fails()) {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => __('La unidad no se ha creado'),
                    'errors' => $validate->errors()
                ];
            } else {
                $unit = new Unit();

                $unit->community_id = (isset($params_array['community_id'])) ? $params_array['community_id'] : null;
                $unit->name = (isset($params_array['name'])) ? $params_array['name'] : null;
                $unit->meters = (isset($params_array['meters'])) ? $params_array['meters'] : null;

                $unit->save();

                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'unit' => $unit
                ];
            }
        } else {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => __('No se han enviado los datos')
            ];
        }

        return response()->json($data, $data['code']);
    }
}
