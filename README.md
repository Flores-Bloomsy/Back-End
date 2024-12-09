# Deploy https://api.devflores.xyz/

## userSeller

### registrarse

POST / http://localhost:8080/userseller

```json
{
  "email": "miCorreo@hotmail.com",
  "password": "miPass"
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "user seller created",
  "data": {
    "email": "miCorreo@hotmail.com",
    "password": "$2a$10$VOrvB8or9V0puibFTeLVge4kWHQ3iMfgvqKg2arguaPHsgtymO2Ey",
    "emailValidate": false,
    "_id": "674e83fcc9de4836cda524e8",
    "createdAt": "2024-12-03T04:07:24.857Z",
    "updatedAt": "2024-12-03T04:07:24.857Z",
    "__v": 0
  }
}
```

### inicio de sesion

POST / http://localhost:8080/userseller/login

```json
{
  "email": "miCorreo@hotmail.com",
  "password": "miPass"
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "user logged in",
  "data": {
    "toke": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGU4M2ZjYzlkZTQ4MzZjZGE1MjRlOCIsImlhdCI6MTczMzE5ODkyNCwiZXhwIjoxNzMzODAzNzI0fQ._vYFJvTmQpGwrz1whsqPs4rw4yTEU8r5KJCWnRhG-pU"
  }
}
```

## productos (BOUQUETS)

Agregar un nuevo producto  
POST / http://localhost:8080/bouquet/

**Configurar**
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud

```json
{
  "name": "Bouquet de Rosas Rojas",
  "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
  "images": [
    "https://example.com/images/rosas1.jpg",
    "https://example.com/images/rosas2.jpg"
  ],
  "price": 299.99,
  "stock": 50,
  "sold": 5,
  "details": {
    "occasion": ["Boda", "Cumpleaños"],
    "size": "Mediano",
    "color": ["Rojo", "Verde"],
    "style": "Elegante",
    "flowerType": ["Rosas"],
    "personality": ["Romantico", "Elegante"]
  }
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "bouquet created",
  "data": {
    "bouquet": {
      "ownerId": {
        "_id": "674e83fcc9de4836cda524e8",
        "email": "miCorreo@hotmail.com",
        "emailValidate": false,
        "createdAt": "2024-12-03T04:07:24.857Z",
        "updatedAt": "2024-12-03T04:07:24.857Z",
        "__v": 0
      },
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 299.99,
      "stock": 50,
      "sold": 5,
      "details": {
        "occasion": ["Boda", "Cumpleaños"],
        "size": "Mediano",
        "color": ["Rojo", "Verde"],
        "style": "Elegante",
        "flowerType": ["Rosas"],
        "personality": ["Romantico", "Elegante"]
      },
      "_id": "674e8513c9de4836cda524f0",
      "comments": [],
      "createdAt": "2024-12-03T04:12:03.029Z",
      "updatedAt": "2024-12-03T04:12:03.029Z",
      "__v": 0
    }
  }
}
```

Ver todos los productos  
GET / http://localhost:8080/bouquet/  
Ver producto por su id  
GET / http://localhost:8080/bouquet/:id del producto

```json
{
  "succes": true,
  "message": "bouquet found",
  "data": {
    "getBouquetById": {
      "_id": "674e8513c9de4836cda524f0",
      "ownerId": {
        "_id": "674e83fcc9de4836cda524e8",
        "email": "miCorreo@hotmail.com",
        "emailValidate": false,
        "createdAt": "2024-12-03T04:07:24.857Z",
        "updatedAt": "2024-12-03T04:07:24.857Z",
        "__v": 0
      },
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 299.99,
      "stock": 50,
      "sold": 5,
      "details": {
        "occasion": ["Boda", "Cumpleaños"],
        "size": "Mediano",
        "color": ["Rojo", "Verde"],
        "style": "Elegante",
        "flowerType": ["Rosas"],
        "personality": ["Romantico", "Elegante"]
      },
      "comments": [],
      "createdAt": "2024-12-03T04:12:03.029Z",
      "updatedAt": "2024-12-03T04:12:03.029Z",
      "__v": 0
    }
  }
}
```

Actualizar Producto por id

**Configurar**
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
solo el creador del producto lo puede actualizar

PATCH / http://localhost:8080/bouquet/:id del producto

```json
{
  "price": 1000000000000000
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "updated Bouquet",
  "data": {
    "updateBouquet": {
      "_id": "674e8513c9de4836cda524f0",
      "ownerId": "674e83fcc9de4836cda524e8",
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 1000000000000000,
      "stock": 50,
      "sold": 5,
      "details": {
        "occasion": ["Boda", "Cumpleaños"],
        "size": "Mediano",
        "color": ["Rojo", "Verde"],
        "style": "Elegante",
        "flowerType": ["Rosas"],
        "personality": ["Romantico", "Elegante"]
      },
      "comments": [],
      "createdAt": "2024-12-03T04:12:03.029Z",
      "updatedAt": "2024-12-03T04:16:21.347Z",
      "__v": 0
    }
  }
}
```

Borrar producto por id  
DELETE / http://localhost:8080/bouquet/:id del producto

**Configurar**
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
solo el creador del producto lo puede eliminar

Respuesta exitosa

```json
{
  "success": true,
  "message": "deleted bouquet",
  "data": {
    "deleteBouquet": {
      "_id": "674e8513c9de4836cda524f0",
      "ownerId": "674e83fcc9de4836cda524e8",
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 1000000000000000,
      "stock": 50,
      "sold": 5,
      "details": {
        "occasion": ["Boda", "Cumpleaños"],
        "size": "Mediano",
        "color": ["Rojo", "Verde"],
        "style": "Elegante",
        "flowerType": ["Rosas"],
        "personality": ["Romantico", "Elegante"]
      },
      "comments": [],
      "createdAt": "2024-12-03T04:12:03.029Z",
      "updatedAt": "2024-12-03T04:16:21.347Z",
      "__v": 0
    }
  }
}
```
