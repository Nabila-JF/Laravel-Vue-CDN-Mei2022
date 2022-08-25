<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class customerModel extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $table = 'customer';
    protected $primarykey = 'id_customer';
    public $timestamps = false;
    public $fillable = [
        'nama_customer','alamat','username','password', 'foto'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return
     */
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    /**
     * @return
     */
    public function getJWTCustomClaims() {
        return[];
    }
}
