<?php

namespace App\Http\Controllers;

use App\Books;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    /**
     * Вывол спмска книг
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $input = $request->all();

        if (Auth::check())
        {
            $id = Auth::id();
        }

        if($request->get('search')){

            $books = Books::where([["title", "LIKE", "%{$request->get('search')}%"],['user_id','=',$id]])

                ->paginate(10);

        }else{
            $books = Books::where('user_id','=',$id)->paginate(10);

        }

        return response($books);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Сохранение книги в БД
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function store(Request $request)
    {

        $input = $request->all();

        $books = Books::create($input);

        if (Auth::check())
        {
            $id = Auth::id();

        }else{

            $id = 1;
        }
        $user_id =$id;
        $books->user_id = $user_id;
        $books->save();
        return response($books);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Books  $books
     * @return \Illuminate\Http\Response
     */
    public function show(Books $books)
    {
        //
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function edit($id)
    {

        $Books = Books::find($id);

        return response($Books);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function update(Request $request,$id)
    {

        $input = $request->all();

        Books::where("id",$id)->update($input);

        $Books = Books::find($id);

        return response($Books);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        return Books::where('id',$id)->delete();
    }
}
