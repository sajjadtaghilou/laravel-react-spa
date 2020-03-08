# Laravel-React SPA

Starter Boilerplate SPA made with Laravel and React.

## Features

- Laravel 6, React, Redux, React Router
- Authentication with JWT
- Login, register, reset password
- Socialite integration (Google Account Sign in)
- Flexible Page Layout
- Flexible, Protected Routing
- Tailwind CSS
- ESlint

## Installation

- Clone the repo
- Installing all Composer & NPM dependencies.

```bash
composer install && npm install
```

- Copy .env.example to .env
- Generate app key

```bash
php artisan key:generate
```

- Create an Application in the Google API Console, Add google client id to the env file.

```env
GOOGLE_CLIENT_ID=
```

- Run database migration

```bash
php artisan migrate:fresh
```

- Generate JWT secret

```bash
php artisan jwt:secret
```

- Compiling Assets

```bash
npm run dev
```

- Boot up a server

```bash
php artisan serve
```


// cooke naming
// constant used in a project javascript

// promise
// unused parameter naming convention resolve
// in python, use _ for a throwable vaiable

// lodash size
//  reduce lodash size: import isEmpty from 'lodash/isEmpty'

// constant in a file
// const localStorageKey = '__bookshelf_token__'
/*
function logout() {
  window.localStorage.removeItem(localStorageKey)
  return Promise.resolve()
}
*/
// use github fetch

// javascript snippet func
