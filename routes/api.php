<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'genres','middleware' => 'auth:sanctum'], function() {
    Route::get('/', [GenreController::class,'index']);
    Route::post('add', [GenreController::class,'store']);
    Route::post('update/{id}', [GenreController::class,'update']);
    Route::get('edit/{id}', [GenreController::class,'edit']);
    Route::delete('delete/{id}', [GenreController::class,'destroy']);
});

Route::group(['prefix' => 'books','middleware' => 'auth:sanctum'], function() {
    Route::get('/', [BookController::class,'index']);
    Route::post('add', [BookController::class,'store']);
    Route::post('update/{id}', [BookController::class,'update']);
    Route::get('edit/{id}', [BookController::class,'edit']);
    Route::get('create', [BookController::class,'create']);
    Route::delete('delete/{id}', [BookController::class,'destroy']);
    Route::delete('lender/{id}', [BookController::class,'lender']);
    Route::delete('return/{id}', [BookController::class,'return']);
});

Route::group(['prefix' => 'lenders','middleware' => 'auth:sanctum'], function() {
    Route::get('/', [LendBookController::class,'index']);
});

