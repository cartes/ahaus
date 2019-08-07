<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    const ADMIN = 1;
    const REGULAR = 2;
    const CLIENT = 3;
}
