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

Route::get('/', function () {
    return view('welcome');
});

Route::post('api/user/register', 'UserController@register');
Route::post('api/user/login', 'UserController@login');
Route::post('api/user/update', 'UserController@update');

Route::post('api/community/register', 'CommunityController@register');

Route::post('api/unit/register', 'UnitController@register');