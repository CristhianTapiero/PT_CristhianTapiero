# Prueba Técnica - Cristhian Tapiero

Para realizar esta prueba técnica se tuvieron en cuenta las tecnologías Node.js, Express y PrismaORM con el fin de crear el backend. Para el frontend se tomó la decisión de usar únicamente React, ya que se espera implementar Nginx en versiones posteriores. Por último, para desplegar la aplicación se implementa una máquina EC2 de AWS con el fin de agilizar la puesta a producción. También se utiliza AWS RDB con el fin de hostear la base de datos y un usuario IAM para poder realizar los push a Docker.


## Instalación
Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/usuario/repo.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd repo
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso
Para iniciar el servidor, ejecuta el siguiente comando:
```bash
npm start
```
El servidor estará disponible en `http://localhost:3000`.

## Deployment
La aplicación se despliega en una máquina EC2 de AWS para agilizar la puesta a producción. Se utiliza AWS RDB para hostear la base de datos y un usuario IAM para realizar los push a Docker.

