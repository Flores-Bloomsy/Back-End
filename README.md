# Deploy https://api.devflores.xyz/

- [user](#user)
  - [Registrase](#registrarse)
  - [Iniciar Sesion](#inicio-de-sesion)
  - [Actualizar usuario](#actualizar-usuario-por-su-id)
  - [Obtener usuario por id](#obtener-usuario-por-su-id)
- [UserSeller](#userseller)
  - [Registrarse](#registrarse-1)
  - [Iniciar Sesion](#inicio-de-sesion-1)
  - [Actualizar usuario](#actualizar-usuario-por-su-id-1)
  - [Obtener usuario por id](#obtener-usuario-por-su-id-1)
- [Productos (Bouquets)](#productos-bouquets)
  - [Crear un nuevo ramo](#crear-un-nuevo-producto)
  - [Ver todos los productos](#ver-todos-los-productos)
  - [Ver producto por su id](#ver-producto-por-su-id)
  - [Actualizar producto por su id](#actualizar-producto-por-id)
  - [Borrar producto por su id](#borrar-producto-por-id)
- [Carrito de compras](#carrito-de-compras)
  - [Crear un carrito](#crear-un-carrito)
  - [Ver carrito por el id del propietario](#ver-carrito-por-el-id-del-propietario)
  - [Agregar un producto al carrito](#agregar-un-producto-al-carrito)
  - [Modificar la cantidad de un producto](#modificar-la-cantidad-de-un-producto)
  - [Eliminar un producto del carrito](#eliminar-un-prodcuto-del-carrito)

## user

### registrarse

POST / http://localhost:8080/auth/signup

formato del Body de la solicitud

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
  "message": "User created successfully",
  "user": {
    "email": "miCorreo@hotmail.com",
    "address": {},
    "rol": "buyer",
    "favorites": [],
    "isVerified": false,
    "_id": "675a6841739fe9ae160b1495",
    "createdAt": "2024-12-12T04:36:17.568Z",
    "updatedAt": "2024-12-12T04:36:17.568Z",
    "__v": 0
  }
}
```

### inicio de sesion

POST / http://localhost:8080/auth/login

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
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWE2ODQxNzM5ZmU5YWUxNjBiMTQ5NSIsInJvbCI6ImJ1eWVyIiwiaWF0IjoxNzMzOTc4MzIxLCJleHAiOjE3MzQ1ODMxMjF9.r3IYP0mGWpToVa5kkIaTxeApv8oje_34hhCyNfIeaL0"
}
```

### actualizar usuario por su id

**Configurar**  
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud

PATCH / http://localhost:8080/auth/update/:userId

formato del Body de la solicitud

```json
{
  "phone": "3325645897",
  "address": {
    "street": "my street",
    "number": "5488",
    "city": "my city",
    "state": "my state",
    "postalCode": "45789"
  },
  "name": "my name"
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "user Buyer update",
  "data": {
    "address": {
      "street": "my street",
      "number": "5488",
      "city": "my city",
      "state": "my state",
      "postalCode": "45789"
    },
    "_id": "675a6841739fe9ae160b1495",
    "email": "miCorreo@hotmail.com",
    "password": "$2a$10$VPiYV825uJN.i0UwRozSMOchalgdUArp2P2ozeUR4ZrByIWdRC.Nq",
    "rol": "buyer",
    "favorites": [],
    "isVerified": false,
    "createdAt": "2024-12-12T04:36:17.568Z",
    "updatedAt": "2024-12-12T05:02:36.476Z",
    "__v": 0,
    "phone": "3325645897",
    "name": "my name"
  }
}
```

### obtener usuario por su id

GET / http://localhost:8080/auth/:userId

Respuesta exitosa

```json
{
  "success": true,
  "message": "get user by id",
  "data": {
    "user": {
      "address": {
        "street": "my street",
        "number": "5488",
        "city": "my city",
        "state": "my state",
        "postalCode": "45789"
      },
      "_id": "675a6841739fe9ae160b1495",
      "email": "miCorreo@hotmail.com",
      "password": "$2a$10$VPiYV825uJN.i0UwRozSMOchalgdUArp2P2ozeUR4ZrByIWdRC.Nq",
      "rol": "buyer",
      "favorites": [],
      "isVerified": false,
      "createdAt": "2024-12-12T04:36:17.568Z",
      "updatedAt": "2024-12-12T05:02:36.476Z",
      "__v": 0,
      "phone": "3325645897",
      "name": "my name"
    }
  }
}
```

## userSeller

### registrarse

POST / http://localhost:8080/userseller

formato del Body de la solicitud

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
    "password": "$2a$10$ouDHuEvAybTcBsG5Tkct/ewBs6DU1qonBmJ/U0wgqNLXDmUdmrhxO",
    "emailValidate": false,
    "rol": "seller",
    "_id": "675a678b739fe9ae160b1491",
    "createdAt": "2024-12-12T04:33:15.451Z",
    "updatedAt": "2024-12-12T04:33:15.451Z",
    "__v": 0
  }
}
```

### inicio de sesion

POST / http://localhost:8080/userseller/login

formato del Body de la solicitud

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWE2NzhiNzM5ZmU5YWUxNjBiMTQ5MSIsInJvbCI6InNlbGxlciIsImlhdCI6MTczMzk3ODAyMCwiZXhwIjoxNzM0NTgyODIwfQ.M4DiSJ8KGP-LY3D7JRxNRIAHhwWzCROaH4t40Ra94kk"
}
```

### actualizar usuario por su id

**Configurar**  
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud

PATCH / http://localhost:8080/userseller/update/:userId

formato del Body de la solicitud

```json
{
  "phone": "3325645897",
  "address": {
    "street": "my street",
    "number": "5488",
    "city": "my city",
    "state": "my state",
    "postalCode": "45789"
  },
  "storeName": "flower street",
  "schedule": {
    "opening": "21:12",
    "closing": "12:12"
  }
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "user update",
  "data": {
    "_id": "675a678b739fe9ae160b1491",
    "email": "miCorreo@hotmail.com",
    "emailValidate": false,
    "rol": "seller",
    "createdAt": "2024-12-12T04:33:15.451Z",
    "updatedAt": "2024-12-12T04:56:03.899Z",
    "__v": 0,
    "address": {
      "street": "my street",
      "number": "5488",
      "city": "my city",
      "state": "my state",
      "postalCode": "45789"
    },
    "phone": "3325645897",
    "schedule": {
      "opening": "21:12",
      "closing": "12:12"
    },
    "storeName": "flower street"
  }
}
```

### obtener usuario por su id

GET / http://localhost:8080/userseller/:userId

respuesta exitosa

```json
{
  "success": true,
  "message": "user By Id",
  "data": {
    "user": {
      "_id": "675a678b739fe9ae160b1491",
      "email": "miCorreo@hotmail.com",
      "emailValidate": false,
      "rol": "seller",
      "createdAt": "2024-12-12T04:33:15.451Z",
      "updatedAt": "2024-12-12T04:56:03.899Z",
      "__v": 0,
      "address": {
        "street": "my street",
        "number": "5488",
        "city": "my city",
        "state": "my state",
        "postalCode": "45789"
      },
      "phone": "3325645897",
      "schedule": {
        "opening": "21:12",
        "closing": "12:12"
      },
      "storeName": "flower street"
    }
  }
}
```

## productos (BOUQUETS)

### Crear un nuevo producto

POST / http://localhost:8080/bouquet/create-bouquet

**Configurar**  
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud
Para agregar un producto, debes ser un usuario con el rol de "seller".

formato del Body de la solicitud

```json
{
  "name": "Bouquet de Rosas Rojas",
  "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
  "images": [
    "https://example.com/images/rosas1.jpg",
    "https://example.com/images/rosas2.jpg"
  ],
  "price": 299.1231231399,
  "stock": 50,
  "details": {
    "occasion": ["Boda", "Cumpleaños"],
    "size": "Mediano",
    "color": ["Rojo", "Verde"],
    "style": "Elegante",
    "flowerType": ["Rosas"],
    "personality": ["Romantico", "Elegante"]
  }
}{
	"success": true,
	"message": "bouquet created",
	"data": {
		"bouquet": {
			"ownerId": {
				"_id": "675a678b739fe9ae160b1491",
				"email": "miCorreo@hotmail.com",
				"emailValidate": false,
				"rol": "seller",
				"createdAt": "2024-12-12T04:33:15.451Z",
				"updatedAt": "2024-12-12T04:56:03.899Z",
				"__v": 0,
				"address": {
					"street": "my street",
					"number": "5488",
					"city": "my city",
					"state": "my state",
					"postalCode": "45789"
				},
				"phone": "3325645897",
				"schedule": {
					"opening": "21:12",
					"closing": "12:12"
				},
				"storeName": "flower street"
			},
			"name": "Bouquet de Rosas Rojas",
			"description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
			"images": [
				"https://example.com/images/rosas1.jpg",
				"https://example.com/images/rosas2.jpg"
			],
			"price": 299.1231231399,
			"stock": 50,
			"sold": 0,
			"details": {
				"occasion": [
					"Boda",
					"Cumpleaños"
				],
				"size": "Mediano",
				"color": [
					"Rojo",
					"Verde"
				],
				"style": "Elegante",
				"flowerType": [
					"Rosas"
				],
				"personality": [
					"Romantico",
					"Elegante"
				]
			},
			"_id": "675aeb26ff036f2d3cd0b4bf",
			"comments": [],
			"createdAt": "2024-12-12T13:54:46.754Z",
			"updatedAt": "2024-12-12T13:54:46.754Z",
			"__v": 0
		}
	}
}
```

### Ver todos los productos

GET / http://localhost:8080/bouquet/get-bouquets

regresa todos los ramos existentes

### Ver producto por su id

GET / http://localhost:8080/bouquet/:bouquetid

respuesta exitosa

```json
{
  "succes": true,
  "message": "bouquet found",
  "data": {
    "getBouquetById": {
      "_id": "675a718a739fe9ae160b14b3",
      "ownerId": {
        "_id": "675a678b739fe9ae160b1491",
        "email": "miCorreo@hotmail.com",
        "emailValidate": false,
        "rol": "seller",
        "createdAt": "2024-12-12T04:33:15.451Z",
        "updatedAt": "2024-12-12T04:56:03.899Z",
        "__v": 0,
        "address": {
          "street": "my street",
          "number": "5488",
          "city": "my city",
          "state": "my state",
          "postalCode": "45789"
        },
        "phone": "3325645897",
        "schedule": {
          "opening": "21:12",
          "closing": "12:12"
        },
        "storeName": "flower street"
      },
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 299.1231231399,
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
      "createdAt": "2024-12-12T05:15:54.154Z",
      "updatedAt": "2024-12-12T05:15:54.154Z",
      "__v": 0
    }
  }
}
```

### Actualizar Producto por id

**Configurar**  
en `Headers` crea un nuevo Header llamado `Authorization` y asignale el valor `Bearer + TOKEN`, para continuar con la solicitud  
solo el creador del producto lo puede actualizar

PATCH / http://localhost:8080/bouquet/update/:productId

formato del Body de la solicitud

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
      "_id": "675a718a739fe9ae160b14b3",
      "ownerId": "675a678b739fe9ae160b1491",
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
      "createdAt": "2024-12-12T05:15:54.154Z",
      "updatedAt": "2024-12-12T05:21:46.057Z",
      "__v": 0
    }
  }
}
```

### Borrar producto por id

DELETE / http://localhost:8080/bouquet/delete/:productId

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
      "_id": "675a718a739fe9ae160b14b3",
      "ownerId": "675a678b739fe9ae160b1491",
      "name": "Bouquet de Rosas Rojas",
      "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
      "images": [
        "https://example.com/images/rosas1.jpg",
        "https://example.com/images/rosas2.jpg"
      ],
      "price": 1000000000000000,
      "stock": 50,
      "sold": 7,
      "details": {
        "occasion": ["Boda", "Cumpleaños"],
        "size": "Mediano",
        "color": ["Rojo", "Verde"],
        "style": "Elegante",
        "flowerType": ["Rosas"],
        "personality": ["Romantico", "Elegante"]
      },
      "comments": [],
      "createdAt": "2024-12-12T05:15:54.154Z",
      "updatedAt": "2024-12-12T05:23:02.572Z",
      "__v": 0
    }
  }
}
```

## Carrito de compras

🔴
**requisitos**  
todo lo relacionado con el carrito se necesita estar autenticado

**Configuración del Header**
1 Ve a la sección de Headers en tu herramienta de prueba de API (como Postman o tu código).  
2 Crea un nuevo header con el nombre Authorization.  
3 Asigna al header el siguiente valor:
`Bearer <token> `  
4 Reemplaza <TOKEN> con el token que obtuviste al iniciar sesión.

### Crear un carrito

POST / http://localhost:8080/cart/create-cart

formato del Body de la solicitud

```json
{
  "items": [
    {
      "bouquetFlowerId": "67588022a4690202fcae25e7",
      "quantity": 2
    },
    {
      "bouquetFlowerId": "6758804fa4690202fcae25eb",
      "quantity": 1
    }
  ]
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "shopping cart created",
  "data": {
    "ownerId": "675a6841739fe9ae160b1495",
    "items": [
      {
        "bouquetFlowerId": "67588022a4690202fcae25e7",
        "quantity": 2
      },
      {
        "bouquetFlowerId": "6758804fa4690202fcae25eb",
        "quantity": 1
      }
    ],
    "_id": "675adecc249fc1f2389a8857",
    "createdAt": "2024-12-12T13:02:04.151Z",
    "__v": 0
  }
}
```

### Ver carrito por el id del propietario

GET / http://localhost:8080/cart/get-cart

🔴 el id del propietario lo toma desde el token el en `header Authorization`

respuesta exitosa

```json
{
  "success": true,
  "message": "cart get by owner id",
  "data": {
    "_id": "675adecc249fc1f2389a8857",
    "ownerId": {
      "address": {
        "street": "my street",
        "number": "5488",
        "city": "my city",
        "state": "my state",
        "postalCode": "45789"
      },
      "_id": "675a6841739fe9ae160b1495",
      "email": "miCorreo@hotmail.com",
      "password": "$2a$10$VPiYV825uJN.i0UwRozSMOchalgdUArp2P2ozeUR4ZrByIWdRC.Nq",
      "rol": "buyer",
      "favorites": [],
      "isVerified": false,
      "createdAt": "2024-12-12T04:36:17.568Z",
      "updatedAt": "2024-12-12T05:02:36.476Z",
      "__v": 0,
      "phone": "3325645897",
      "name": "my name"
    },
    "items": [
      {
        "bouquetFlowerId": {
          "_id": "67588022a4690202fcae25e7",
          "ownerId": "67587ffca4690202fcae25e3",
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
          "createdAt": "2024-12-10T17:53:38.436Z",
          "updatedAt": "2024-12-10T17:53:38.436Z",
          "__v": 0
        },
        "quantity": 2
      },
      {
        "bouquetFlowerId": {
          "_id": "6758804fa4690202fcae25eb",
          "ownerId": "67587ffca4690202fcae25e3",
          "name": "Bouquet de Rosas Rojas",
          "description": "Un hermoso ramo de rosas rojas frescas para cualquier ocasión especial…",
          "images": [
            "https://example.com/images/rosas1.jpg",
            "https://example.com/images/rosas2.jpg"
          ],
          "price": 299.1231231399,
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
          "createdAt": "2024-12-10T17:54:23.618Z",
          "updatedAt": "2024-12-10T17:54:23.618Z",
          "__v": 0
        },
        "quantity": 1
      }
    ],
    "createdAt": "2024-12-12T13:02:04.151Z",
    "__v": 0
  }
}
```

### Agregar un producto al carrito

POST / http://localhost:8080/cart/add-product/

formato del Body de la solicitud

```json
{
  "bouquetFlowerId": "67488022a4521372fcae25e7",
  "quantity": 5
}
```

Respuesta exitosa

```json
{
  "success": true,
  "message": "added product",
  "data": {
    "_id": "675adecc249fc1f2389a8857",
    "ownerId": "675a6841739fe9ae160b1495",
    "items": [
      {
        "bouquetFlowerId": "67588022a4690202fcae25e7",
        "quantity": 2
      },
      {
        "bouquetFlowerId": "6758804fa4690202fcae25eb",
        "quantity": 1
      },
      {
        "bouquetFlowerId": "67488022a4521372fcae25e7",
        "quantity": 5
      }
    ],
    "createdAt": "2024-12-12T13:02:04.151Z",
    "__v": 1
  }
}
```

### Modificar la cantidad de un producto

formato del Body de la solicitud

```json
{
  "bouquetFlowerId": "67588022a4690202fcae25e7",
  "quantity": 5
}
```

Respuesta Exitosa

```json
{
  "success": true,
  "message": "modified quantity",
  "data": {
    "_id": "675889e3b55a9fbf6d08e861",
    "ownerId": "67587f84a4690202fcae25dc",
    "items": [
      {
        "bouquetFlowerId": "6758804fa4690202fcae25eb",
        "quantity": 5,
        "_id": "675889e3b55a9fbf6d08e863"
      },
      {
        "bouquetFlowerId": "67588022a4521472fcae25e7",
        "quantity": 35,
        "_id": "67591fbb0474b0484cd9cfd9"
      },
      {
        "bouquetFlowerId": "67588022a4521372fcae25e7",
        "quantity": 10,
        "_id": "6759c3a889ab78455a1f00de"
      }
    ],
    "createdAt": "2024-12-10T18:35:15.055Z",
    "__v": 3
  }
}
```

### Eliminar un prodcuto del carrito

DELETE / http://localhost:8080/cart/remove-product/:idDelProductoAEliminar

Respuesta exitosa

```json
{
  "success": true,
  "message": "bouquet deleted",
  "data": {
    "_id": "675adecc249fc1f2389a8857",
    "ownerId": "675a6841739fe9ae160b1495",
    "items": [
      {
        "bouquetFlowerId": "6758804fa4690202fcae25eb",
        "quantity": 1
      },
      {
        "bouquetFlowerId": "67488022a4521372fcae25e7",
        "quantity": 5
      }
    ],
    "createdAt": "2024-12-12T13:02:04.151Z",
    "__v": 2
  }
}
```
