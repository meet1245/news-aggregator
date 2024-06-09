### Setup Locally

```
cp .env.example .env
```

```
update .env with database configuration
```

```
composer install
```

```
php artisan migrate
```

```
php artisan key:generate

```

```
php artisan passport:client --personal

```


```
npm install
```

```
npm run dev
```

#### Command for Fetch News

```
#1 From newsapi.org

php artisan fetch-news

#2 From Guardian

php artisan fetch-guardian-news
```