<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectTo(){
        
        // User role
        $userId = Auth::id();

        $role = DB::table('usuario_rols')->select('tipoUsuario')->where('id_usuario', $userId)->first();
        
        // Check user role
        switch ($role->tipoUsuario) {
            case 'Visualizador':
                   return ('/visualizador');
                break;
            case 'Evaluador':
                  return ('/evaluacion');
                break; 
            case 'Experto':
                    return ('/evaluacion'); 
                break;
            case 'Calidad':
                   return ('/gestion-calidad');
                break;
            default:
                 return ('/visualizador');


           
        }
    }

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/login');
    }
}
