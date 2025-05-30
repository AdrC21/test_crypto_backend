<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## API para Plataforma de Criptomonedas

API REST para gestión de monedas y criptomonedas con autenticación JWT y replicación histórica de datos.

## 📦 Instalación

```bash
# 1. Clonar repositorio
git clone [tu-repositorio]

# 2. Instalar dependencias
npm install

# 3. Configurar entorno (copiar .env.example)
cp .env.example .env

# 4. Levantar PostgreSQL con Docker
docker-compose up -d

# 5. Ejecutar la aplicación
npm run start:dev

## 🗄️ Diagrama de Base de Datos
```mermaid
erDiagram
    USER ||--o{ CRIPTOMONEDA : crea
    USER {
        int id PK
        string email
        string password
        datetime createdAt
    }
    
    MONEDA {
        int id PK
        string cod
        string name
        string symbol
        datetime createdAt
        datetime updatedAt
    }
    
    CRIPTOMONEDA {
        int id PK
        string name
        string symbol
        datetime createdAt
        datetime updatedAt
    }
    
    CRIPTOMONEDA_MONEDA {
        int criptomonedaId FK
        int monedaId FK
    }
    
    MONEDA ||--o{ CRIPTOMONEDA_MONEDA : "many-to-many"
    CRIPTOMONEDA ||--o{ CRIPTOMONEDA_MONEDA : "many-to-many"

    ## 🗄️ Ejemplos de Peticiones
    ```bash
    #Registro
    curl -X 'POST' 'http://localhost:3000/auth/register' \
    -H 'Content-Type: application/json' \
    -d '{"email": "user@example.com", "password": "12345678"}'

    #Login (obtener JWT)
    curl -X 'POST' 'http://localhost:3000/auth/login' \
    -H 'Content-Type: application/json' \
    -d '{"email": "user@example.com", "password": "12345678"}'

    #Listar todas las monedas
    curl -X 'GET' 'http://localhost:3000/moneda' \
    -H 'Authorization: Bearer [JWT_TOKEN]'

    #Crear nueva moneda
    curl -X 'POST' 'http://localhost:3000/moneda' \
    -H 'Authorization: Bearer [JWT_TOKEN]' \
    -H 'Content-Type: application/json' \
    -d '{"cod": "USD", "name": "Dólar", "symbol": "$"}'

    #Listar Criptomonedas
    curl -X 'GET' 'http://localhost:3000/cryptocurrency' \
    -H 'Authorization: Bearer [JWT_TOKEN]'

    #Crear nueva Criptomoneda
    curl -X 'POST' 'http://localhost:3000/cryptocurrency' \
    -H 'Authorization: Bearer [JWT_TOKEN]' \
    -H 'Content-Type: application/json' \
    -d '{"name": "Bitcoin", "symbol": "BTC", "monedas": [1]}'

    ##📚 Documentación Swagger
    Accede a la documentación interactiva en:
    http://localhost:3000/api

    ##🛠️ Tecnologías utilizadas
      *NestJS
      *TypeORM
      *PostgreSQL
      *JWT Authentication
      *Docker
      *Swagger
