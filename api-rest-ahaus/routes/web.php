<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Middleware\ApiAuthMiddleware;
use App\Http\Middleware\Cors;

Route::get('/', function () {
    return view('welcome');
});

Route::post('api/user/register', 'UserController@register');
Route::post('api/user/login', 'UserController@login');
Route::put('api/user/update', 'UserController@update')->middleware(ApiAuthMiddleware::class);
Route::post('api/user/upload', 'UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('api/user/avatar/{filename}', 'UserController@getImage');
Route::get('api/user/detail/{id}', 'UserController@detail');
Route::delete('api/user/delete/{id}', 'UserController@destroy');


Route::resource('api/community', 'CommunityController');

Route::post('api/unit/regng serve
ister', 'UnitController@register');