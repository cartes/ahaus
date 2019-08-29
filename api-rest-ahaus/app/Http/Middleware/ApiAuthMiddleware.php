<?php

namespace App\Http\Middleware;

use App\Helpers\JwtAuth;
use Closure;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $jwt = new JwtAuth();

        $checkToken = $jwt->checkToken($token);

        if ($checkToken) {

            return $next($request);

        } else {

            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => __('Usuario no identificado')
            ];

            return response()->json($data, $data['code']);

        }
    }
}
