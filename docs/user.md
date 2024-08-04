# User API Spec

## Register User

Endpoint: POST /api/users

Request Body :

```Json
{
    "username": "Amin",
    "password": "Amin*_2350",
    "name": "Aminudin Abdulloh"
}
```

Response Body (Success) :

```jSON
{
    "data": {
        "username": "Amin",
        "name": "Aminudin Abdulloh"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint: POST /api/login

Request Body :

```Json
{
    "username": "Amin",
    "password": "Amin*_2350",
}
```

Response Body (Success) :

```jSON
{
    "data": {
        "username": "Amin",
        "name": "Aminudin Abdulloh",
        "token": "uuid"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint: GET /api/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```jSON
{
    "data": {
        "username": "Amin",
        "name": "Aminudin Abdulloh"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unatuhorized, ..."
}
```

## Update User

Endpoint: PATCH /api/current

Request Header :
- X-API_TOKEN : token

Request Body :

```Json
{
    "password": "Amin*_2350", // tidak wajib
    "name": "Aminudin Abdulloh" // tidak wajib
}
```

Response Body (Success) :

```jSON
{
    "data": {
        "username": "Amin",
        "name": "Aminudin Abdulloh"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint: DELET /api/current

Request Header :
- X-API_TOKEN : token

Request Body :

```Json
{
    "password": "Amin*_2350", // tidak wajib
    "name": "Aminudin Abdulloh" // tidak wajib
}
```

Response Body (Success) :

```jSON
{
    "data": "OK"
}
```

Response Body (Failed) :

```json
{
    "errors": "Unauthorized, ..."
}
```