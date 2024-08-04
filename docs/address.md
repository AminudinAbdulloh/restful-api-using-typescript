# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "street": "jalan jalan",
    "city" : "Manchester City",
    "province": "Provinsi Apa",
    "country" : "Negara apa",
    "postal_code": "23123"
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "street": "jalan jalan",
        "city" : "Manchester City",
        "province": "Provinsi Apa",
        "country" : "Negara apa",
        "postal_code": "23123"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "postal_cod   e is required, ..."
}
```

## Get Address

Endpoint : POST /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "street": "jalan jalan",
        "city" : "Manchester City",
        "province": "Provinsi Apa",
        "country" : "Negara apa",
        "postal_code": "23123"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "street": "jalan jalan",
    "city" : "Manchester City",
    "province": "Provinsi Apa",
    "country" : "Negara apa",
    "postal_code": "23123"
}
```

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "street": "jalan jalan",
        "city" : "Manchester City",
        "province": "Provinsi Apa",
        "country" : "Negara apa",
        "postal_code": "23123"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Address is not found"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": "OK"
}
```

Response Body (Failed) :

```json
{
    "errors": "Address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses/

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data": {
        "id": 1,
        "street": "jalan jalan",
        "city" : "Manchester City",
        "province": "Provinsi Apa",
        "country" : "Negara apa",
        "postal_code": "23123"
    },
    "data": {
        "id": 2,
        "street": "jalan jalan",
        "city" : "Manchester City",
        "province": "Provinsi Apa",
        "country" : "Negara apa",
        "postal_code": "23123"
    }
}
```

Response Body (Failed) :

```json
{
    "errors": "Contact is not found"
}
```