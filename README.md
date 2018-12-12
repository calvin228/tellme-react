# TellMe

Simple blog only! :D

Step to run this app:
1. Clone this project
2. Run `composer install`
3. Run `npm install` (make sure npm installed)
4. Create new database in mysql "tellme_react"
5. Copy `.env.example` and rename to `.env`
6. In `.env` ,change the `DB_USERNAME` and `DB_PASSWORD` to your local mysql account
7. Run `php artisan migrate`
8. Run `php artisan passport:install`
9. Last step, run `php artisan serve` and open localhost:8000

Done!



