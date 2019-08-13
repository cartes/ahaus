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

        Schema::create('units', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('community_id');
            $table->foreign('community_id')->references('id')->on('communities');
            $table->string('name')->comment('nombre de la Unidad. Ejemplo: 801, 30A');
            $table->float('metros');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('role_id')->default(\App\Role::REGULAR);
            $table->foreign('role_id')->references('id')->on('roles');
            $table->unsignedInteger('community_id');
            $table->foreign('community_id')->references('id')->on('communities');
            $table->unsignedInteger('unit_id')->nullable();
            $table->foreign('unit_id')->references('id')->on('units');
            $table->string('name');
            $table->string('surname');
            $table->string('tax_id');
            $table->string('email')->unique();
            $table->timestamp('birth_date')->nullable();
            $table->string('profesion')->nullable();
            $table->string('institute')->nullable();

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
        Schema::dropIfExists('roles');
    }
}
