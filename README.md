# Tienda Online - Proyecto Backend con Node.js, Express, MongoDB y Handlebars

Descripción
Esta es una aplicación backend para una tienda online que permite:

Mostrar productos con paginación.

Visualizar detalle de producto.

Agregar productos a un carrito de compras.

Modificar el carrito: agregar productos, eliminar productos, actualizar cantidades y vaciar el carrito.

Guardar datos en MongoDB usando Mongoose.

Renderizar vistas con Handlebars.

# Endpoints principales

GET /products - Lista de productos con paginación.

GET /products/:pid - Detalle de un producto.

GET /carts/:cid - Mostrar carrito.

POST /api/carts/:cid/products/:pid - Agregar producto al carrito.

DELETE /api/carts/:cid/products/:pid - Eliminar producto del carrito.

PUT /api/carts/:cid - Actualizar todo el carrito con un arreglo de productos.

PUT /api/carts/:cid/products/:pid - Actualizar cantidad de un producto específico.

DELETE /api/carts/:cid - Vaciar el carrito.


# Uso en frontend

La vista de productos permite agregar productos al carrito con botón.

La vista del carrito permite actualizar cantidades, eliminar productos y vaciar el carrito mediante botones con llamadas fetch a la API.

# Notas

El ID del carrito está fijado en la vista de productos para pruebas, puedes adaptarlo para usar sesiones o usuarios.

La aplicación usa paginación para la lista de productos.

Se usa Handlebars para las vistas dinámicas.