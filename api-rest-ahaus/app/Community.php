<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Community
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $name Nombre de la comunidad
 * @property string $description
 * @property string $address
 * @property string $email
 * @property string $phone
 * @property int $unidades
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereUnidades($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Community whereUpdatedAt($value)
 */
class Community extends Model
{
    //
}
