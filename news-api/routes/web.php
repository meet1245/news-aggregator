<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BBCNewsController;
use App\Http\Controllers\GuardianController;
use App\Http\Controllers\NewsAPIController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::post('login', [AuthController::class, 'login'])->name('login');

// Route::get('/news', [NewsController::class, 'index']);
// Route::get('/guardian-news', [GuardianController::class, 'search']);

// <?php

// use App\Http\Controllers\GuardianController;
// use App\Http\Controllers\NewsController;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');



// Route::post('/register', 'AuthController@register');
// Route::post('/login', 'AuthController@login');

// Route::group(['middleware' => ['auth:api']], function() {

//     Route::get('/news', [NewsController::class, 'index']);
//     Route::get('/guardian-news', [GuardianController::class, 'search']);
// });


