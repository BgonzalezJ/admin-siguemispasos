<?php namespace App\Http\Controllers;

use App;
use DB;
use GuzzleHttp;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Picture;

class PictureController extends Controller
{
    public function get(Request $request, $page = 0) {

        $offset = $page * getenv("LIMIT_PICTURES");
        $pictures = Picture::limit(getenv("LIMIT_PICTURES"))->orderBy('created_at', 'desc')->offset($offset)->get();

        $response = ["pictures" => $pictures, "nextPage" => ($page+1)];

        return response()->json($response, 200);
    }

    public function search() {

        $client = new GuzzleHttp\Client([
                'base_uri' => "https://api.instagram.com/"
        ]);

        $pictures = $client->get(
            "v1/tags/" . getenv("HASHTAG") . "/media/recent?access_token=" . getenv("IGTOKEN")
        );

        $pictures = json_decode($pictures->getBody(), true);

        $response = [];

        if (isset($pictures["data"])) {
            foreach ($pictures["data"] as $picture) {
                $link = $picture["link"];
                $image = $picture["images"]["standard_resolution"]["url"];
                $image = explode("?", $image);
                $image = $image[0];

                $pic = Picture::where(['link' => $link])->first();
                if (!$pic) {
                    $pic = new Picture;
                    $pic->image_url = $image;
                    $pic->link = $link;
                    $pic->active = false;
                    $pic->save();
                    array_push($response, $pic);
                }

            }
            return response()->json(["success" => true, "pictures" => $response], 200);
        } else {
            return response()->json(["error" => true, "message" => "Ocurrió un error al buscar las imágenes"], 409);
        }
    }

    public function publicar($id) {
        $picture = Picture::find($id);

        if (!$picture)
           return response()->json(["error" => true, "message" => "Imagen no existe"], 409); 

       $picture->active = !$picture->active;
       $picture->save();
       return response()->json(["success" => true, "picture" => $picture], 200); 


    }
}
