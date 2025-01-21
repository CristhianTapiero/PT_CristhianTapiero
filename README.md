# Prueba Técnica - Cristhian Tapiero

Para realizar esta prueba técnica se tuvieron en cuenta las tecnologías Node.js, Express y PrismaORM con el fin de crear el backend. Para el frontend se tomó la decisión de usar únicamente React, ya que se espera implementar Nginx en versiones posteriores. Por último, para desplegar la aplicación se implementa una máquina EC2 de AWS con el fin de agilizar la puesta a producción. También se utiliza AWS RDB con el fin de hostear la base de datos y un usuario IAM para poder realizar los push a Docker.


## Uso
Para iniciar el servidor, ejecuta el siguiente comando:
```bash
npm install
npm start
```
El servidor estará disponible en `http://localhost:3001`. Para el caso del backend, en el caso del frontend estara en el puerto `http://localhost:3000` 

## Deployment
La aplicación se despliega en una máquina EC2 de AWS para agilizar la puesta a producción. Se utiliza AWS RDB para hostear la base de datos y un usuario IAM para realizar los push a Docker.


## Acceso a la API Rest
Para acceder a la API debe hacerlo mediante el host 18.216.199.234 en el puerto 3001, esto con el fin de poder acceder a consumir la API. Cabe aclarar que para acceder a los endpoints se debe realizar una validación mediante la ruta /login en la cual, una vez autenticado, podra acceder a todas las demas rutas.

## Ejecución de los seeders
En el EC2 al momento de realizar el despliegue se debe realizar la ejecución del comando npx prisma db seed, con el fin de realizar la plantación de los datos iniciales del proyecto.

## Front-end
En el lado del FrontEnd también existe la validación de autenticación, de tal forma que si no se encuentra la cookie access_token, no se dara acceso mediante web-scrapping a otras partes dentro de la página. 

## Malas prácticas

En un sentido más personal, se tiene en cuenta las siguientes malas practicas:
1. Del lado del frontend no hay Single Responsability Principle, por lo cual dentro de una sola interfaz hay muchas operaciónes que deberían ser distribuidas para una mejor lectura y escalabilidad de código.
2. Variables de entorno dentro del docker-compose y DENTRO del código frontend, dado a problemas con typescript y los archivos .env se implementaron variables de entorno dentro del código, teniendo en cuenta claramente que es una muy mala practica. 
3. Deploy del backend en EC2. Se presta para una mala administración de recursos, mala escalabilidad, problemas de seguridad y problemas del lado financiero ya que existen otras opciones como Lambda o ECR/ECS las cuales optimizan todos estos recursos.
4. No uso de Nginx, como se menciona anteriormente esta claro que del lado de comunicación con el servidor no hay un balanceador de carga que mejore el desempeño de la aplicación y por ende la calidad del software.
Existen muy malas practicas en este proyecto, y esto se debe a la cantidad de tiempo resolviendo problemas pequeños que generaron un atraso gigante a la hora de realizar la prueba técnica.

