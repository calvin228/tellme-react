@extends('layouts.auth')

@section('content')
<h1 class="title">{{ __('Reset Password') }}</h1>
<div class="box">
    
    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        <input type="hidden" name="token" value="{{ $token }}">
        @if ($errors->has('email'))
            <p class="has-text-danger">{{ $errors->first('email') }}</p>
        @endif
        @if (session('status'))
            <div class="message is-success" role="alert">
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
        </div>
        
        <div class="field">
            <p class="control has-icons-left">
                <input
                    name="password"
                    class="input {{ $errors->first('password') ? ' is-invalid' : '' }}"
                    type="password"
                    placeholder="Password"
                    required
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
            @if ($errors->has('password'))
            <p class="help is-danger">{{$errors->first('password')}}</p>
            @endif
        </div>
        

        <div class="field">
            <p class="control has-icons-left">
                <input
                    name="password_confirmation"
                    class="input"
                    type="password"
                    placeholder="Confirm Password"
                    required
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        
        <div class="field">
            <p class="control">
              <button class="button is-primary is-fullwidth">
                {{__("Reset Password")}}
              </button>
            </p>
        </div>
    </form>
</div>
{{-- <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('password.update') }}">
                        @csrf

                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Reset Password') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
@endsection
