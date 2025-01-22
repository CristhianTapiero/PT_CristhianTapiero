# Prueba Tencica - Cristhian Tapiero

Para realizar esta prueba técnica se planteo primero la estructura que iba a poseer el proyecto, las técnologias que se iban a implementar y como se iba a conectar posteriormente todo.

![Blank diagram](https://github.com/user-attachments/assets/5bc8ae24-7edf-4fd5-9472-04cc26e85eda)

## Backend

Para el backend se contemplaron las técnologias NodeJS, Express y PrismaORM, con el fin de llevar un código limpio y fácil de interpretar.

## Base de datos

Para la base de datos se implemento una base de datos MySQL la cual funciona mediante migraciones las cuales pueden ser ejecutadas mediante el comando `npx prisma migrate dev --name (nombre_migración)`, este hara un cambio a la base de datos y quedara registrado para su posterior ejecución gracias al Dockerfile.Esta base de datos fue desplegada utilzando un servicio RDB de AWS con el fin de hostear la base de datos.

## Seeders

Para ejecutar el seeder (el cual creara los datos iniciales de la base de datos) debes ejecutar `npx prisma db seed`, esto generara el primer dataset para empezar a realizar operaciones CRUD.

## Querys

Las querys solicitadas en la prueba tecnica han sido anexadas en la carpeta raíz. Debe iniciar con las credenciales de la base de datos para poder realizarlas. 

## Frontend

Para el frontend se decidio implementar React usando el servidor de desarrollo local Vite el cual permite generar plantillas para facilitar la ejecución del proyecto. Se implemento también tailwind para dar estilos a la página web y Typescript con el fin de mantener la fidelidad de los tipos de datos al ser mandados a la base de datos.

## Despliegues

Para ambos casos se implementario imagenes Docker y se alojaron en servidores de hosting gratuito como lo son Render y Vercel. Mediante politicas CORS se comunicaron Front y Back y gracias a la variedad de implementaciones que ofrecen (entre ellas github actions) se logró realizar CI/CD para realizar los push y reflejar inmediatamente los cambios en los entornos productivos.

## Enlaces a la app corriendo

[Has click aquí para ir al frontend](https://courses-manager.vercel.app/login)

[Has click aquí para acceder al backend](https://pt-cristhiantapiero.onrender.com)

> [!IMPORTANT]  
> Para realizar la autenticación en el frontend el email es admin@admin.com y la contraseña es admin
