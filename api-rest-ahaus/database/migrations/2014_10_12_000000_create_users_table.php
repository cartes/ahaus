<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('Nombre del Rol del usuario');
            $table->string('description');
        });

        Schema::create('comunity', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('Nombre de la comunidad');
            $table->string('description');
            $table->string('address');
            $table->string('email');
            $table->string('phone');
            $table->integer('unidades');
            $table->timestamps();
        });

        Schema::create('units', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('comunity_id');
            $table->foreign('comunity_id')->references('id')->on('comunity');
            $table->string('name')->comment('nombre de la Unidad. Ejemplo: 801, 30A');
            $table->float('metros');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('role_id')->default(\App\Role::REGULAR);
            $table->foreign('role_id')->references('id')->on('roles');
            $table->unsignedInteger('comunity_id');
            $table->foreign('comunity_id')->references('id')->on('comunity');
            $table->unsignedInteger('unit_id');
            $table->foreign('unit_id')->references('id')->on('units');
            $table->string('name');
            $table->string('surname');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->string('picture')->nullable();
            $table->timestamps();
        });

        Schema::create('user_social_accounts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('provider');
            $table->string('provider_uid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_social_accounts');
        Schema::dropIfExists('users');
        Schema::dropIfExists('units');
        Schema::dropIfExists('comunity');
        Schema::dropIfExists('roles');
    }
}
