<?php

namespace App\Helpers;

use App\User;
use Firebase\JWT\JWT;

class JwtAuth
{
    public $key;

    public function __construct()
    {
        $this->key = 'udKhKwTvGJMB5bSdUmth';
    }

    public function checkToken($jwt, $getIdentity = false)
    {
        $auth = false;

        try {
            $jwt = str_replace('"', '', $jwt);
            $decoded = JWT::decode($jwt, $this->key, ["HS256"]);
        } catch (\UnexpectedValueException $e) {
            $auth = false;
        } catch (\DomainException $e){
            $auth = false;
        }

        if (!empty($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        } else {
            $auth = false;
        }

        if ($getIdentity) {
            return $decoded;
        }
        return $auth;
    }

    public function signup($email, $password, $get_token = null)
    {
        $user = User::where([
            'email' => $email,
            'password' => $password
        ])->first();

        $signup = false;

        if (is_object($user)) {
            $signup = true;
        }

        if ($signup) {
            $token = [
                'sub' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'surname' => $user->surname,
                'taxId' => $user->tax_id,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            ];
            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);

            if (is_null($get_token)) {
                $data = $jwt;
            } else {
                $data = $decoded;
            }
        } else {
            $data = [
                'status' => 'error',
                'code' => 200,
                'message' => __('Login incorrecto')
            ];

        }

        return $data;
    }
}