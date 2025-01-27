
# Proyecto de Gestión de Votantes - Frontend

Este es el frontend del proyecto desarrollado con Angular, que incluye funcionalidades relacionadas con votaciones y gestión de candidatos.

## Estructura de Carpetas

```
ELECTION-SYSTEM-FRONT/
├── src/
│   ├── app/                
│   │   ├── api/           # Modelos y servicios relacionados con las peticiones API.
│   │   │   ├── apiResponse.ts
│   │   │   ├── candidate.model.ts
│   │   │   ├── userLogged.ts
│   │   │   ├── vote.ts
│   │   │   ├── voteDetail.ts
│   │   │   ├── voter.ts
│   │   ├── auth/          # Archivos de autenticación y protección de rutas.
│   │   │   ├── auth.guard.spec.ts
│   │   │   ├── auth.guard.ts
│   │   ├── components/    # Componentes de la aplicación.
│   │   │   ├── add-voter/
│   │   │   ├── auth/login/
│   │   │   ├── change-password/
│   │   │   ├── public-vote/
│   │   │   ├── top-candidates/
│   │   │   ├── votes-list/
│   │   ├── layout/        # Disposición y estructura general de la aplicación.
│   │   ├── services/      # Servicios para la comunicación con la API.
│   │   │   ├── auth.service.ts
│   │   │   ├── intercept.service.ts
│   │   │   ├── vote.service.ts
│   │   │   ├── voter.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── assets/            # Recursos estáticos como imágenes y fuentes.
│   │   ├── fonts/
│   │   ├── images/
│   ├── environments/      # Archivos de configuración del entorno.
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
├── package.json          # Dependencias del proyecto
└── README.md             # Información del proyecto
```

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/DamianEtcheverrigaray97/election-system-front.git
    ```

2. Navegar a la carpeta del proyecto:

    ```bash
    cd election-system-front
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

4. Configurar el Archivo environment.ts:

El proyecto utiliza el archivo environment.ts para definir las variables de configuración específicas del entorno. Debes asegurarte de que este archivo tenga los valores correctos de acuerdo con tu entorno local o de producción.

Ubica el archivo src/environments/environment.ts y actualiza las siguientes variables con los datos correspondientes a tu servidor backend:

```bash
    export const environment = {
        version: "1.0.0",
        baseApiUrl: "http://localhost:3000/api",  // Dirección de la API del backend
        authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',  // Clave para guardar el token de autenticación
    };
```


5. Ejecutar la aplicación:

    ```bash
    ng serve
    ```

    La aplicación estará disponible por defecto en `http://localhost:4200`.

## Dependencias

- Angular: 19.1.0
- TypeScript
- RxJS
