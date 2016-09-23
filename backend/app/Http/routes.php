<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
    return $app->welcome();
});

$app->group(["prefix" => "auth", "namespace" => "App\Http\Controllers"], function ($app) {
	$app->get('/', [
	  'as' => 'getUser',
	  'middleware' => 'auth',
	  'uses' => 'UserController@get'
	]);

	$app->post('/', [
	  'as' => 'setUser',
	  'uses' => 'UserController@login'
	]);
});

$app->group(["prefix" => "pictures", "namespace" => "App\Http\Controllers"], function ($app) {
	$app->get('/page/{page}', [
	  'as' => 'getPictures',
	  'middleware' => 'auth',
	  'uses' => 'PictureController@get'
	]);	

	$app->get('/search', [
	  'as' => 'search',
	  'middleware' => 'auth',
	  'uses' => 'PictureController@search'
	]);

	$app->put('/publicar/{id}', [
	  'as' => 'publicar',
	  'middleware' => 'auth',
	  'uses' => 'PictureController@publicar'
	]);	
});