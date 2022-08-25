<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\customerModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Config;
use JWTAuth;
use File;

class customerController extends Controller
{
    function __construct(){
        Config::set('jwt.user', \App\Models\customerModel::class);
        Config::set('auth.providers', ['users'=> [
            'driver' => 'eloquent',
            'model' => \App\Models\customerModel::class,
        ]]);
    }

    public function login(Request $req){
        $credentials = $req->only('username', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'error'=>'invalid_credentials'
                ],400);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error'=>'could_not_create_token'
            ],500);
        }
        $user=JWTAuth::user();
        return response()->json(compact('token','user'));
    }
    public function getCustomer()
    {
        $dt_customer=customerModel::get();
        return response()->json($dt_customer);
    }
    public function createcustomer(Request $req)
    {
        $validator = Validator::make($req->all(),[
            'nama_customer'=>'required',
            'alamat'=>'required',
            'username'=>'required',
            'password'=>'required',

        ]);
        if($validator->fails()){
            return Response()->json($validator->errors()->toJson());
        }

        $name = $req->file('foto')->getClientOriginalName();
        $path = $req->file('foto')->store('public/files');
        $save = new File;
        $save->name = $name;
        $save->path = $path;

        $save = customerModel::create([
            'nama_customer' =>$req->get('nama_customer'),
            'alamat'        =>$req->get('alamat'),
            'username'      =>$req->get('username'),
            'password'      =>Hash::Make($req->get('password')),
            'foto'          => $name,
        ]);
        if($save){
            return Response()->json(['status'=>true, 'message' =>'Sukses Menambah Customer']);
        } else {
            return Response()->json(['status'=>false, 'message' =>'Gagal Menambah Customer']);
        }
    }
    public function getsCustomer()
    {
        $getcustomer=customerModel::join('customer','customer.id','customer.id_customer')
        ->get();
        return Response()->json(['data'=>$getcustomer]);
    }
    public function update(Request $req, $id)
        {
            $validator = Validator::make($req->all(),[
                'nama_customer'=>'required',
                'alamat'=>'required',
                'username'=>'required',
                'password'=>'required',
            ]);
            if($validator->fails()){
                return Response()->json($validator->errors()->toJson());
            }
            $ubah=customerModel::where('id_customer',$id)->update([
                'nama_customer'    =>$req->get('nama_customer'),
                'alamat'      =>$req->get('alamat'),
                'username'      =>$req->get('username'),
                'password'      =>Hash::Make($req->get('password')),
            ]);
            if($ubah){
                return Response()->json(['status'=>true, 'message' =>'Sukses Mengubah Customer']);
            } else {
                return Response()->json(['status'=>false, 'message' =>'Gagal Mengubah Customer']);
            }
        }
        public function getdetail($id)
        {
            $dt=customerModel::where('id_customer',$id)->first();
            return Response()->json($dt);
        }
        public function destroy($id)
        {
            $hapus=customerModel::where('id_customer',$id)->delete();
            if($hapus){
                return Response()->json(['status'=>true, 'message' =>'Sukses Hapus Customer']);
            } else {
                return Response()->json(['status'=>false, 'message' =>'Gagal Hapus Customer']);
            }
        }
    }
