@extends('layouts.auth')

@section('content')
<h1 class="title">{{ __('Reset Password') }}</h1>
<div class="box">
    
    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        
        @if (session('status'))
            <div class="notification is-success" role="alert">
                {{ session('status') }}
            </div>
        @endif
        <div class="field">
            <div class="control">
                <div class="control has-icons-left has-icons-right">
                    <input id="email" type="email"  placeholder="Email" class="input {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                </div>
            </div>
            @if ($errors->has('email'))
            <p class="help is-danger">{{ $errors->first('email') }}</p>
            @endif
        </div>
        <div class="field">
            <p class="control">
              <button class="button is-primary is-fullwidth">
                {{__("Send Reset Password Link")}}
              </button>
            </p>
        </div>
    </form>
</div>

@endsection
