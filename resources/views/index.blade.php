<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>TellMe</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{asset('css/app.css')}}" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{asset('js/app.js')}}"></script>
        
        <script>
            document.addEventListener('DOMContentLoaded', () => {

                // Get all "navbar-burger" elements
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
              
                // Check if there are any navbar burgers
                if ($navbarBurgers.length > 0) {
              
                  // Add a click event on each of them
                  $navbarBurgers.forEach( el => {
                    el.addEventListener('click', () => {
              
                      // Get the target from the "data-target" attribute
                      const target = el.dataset.target;
                      const $target = document.getElementById(target);
              
                      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                      el.classList.toggle('is-active');
                      $target.classList.toggle('is-active');
              
                    });
                  });
                }
              
              });
        </script>
        
    </body>
</html>
