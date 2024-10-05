# Crosoften API

This is the API for the Crosoften project, built with TypeScript, Express, and TypeORM.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the API](#running-the-api)
- [API Documentation](#api-documentation)

## Installation

1. Clone the repository:
   
    ```bash 
    git clone git@github.com:claudemirAvelino/cros_todolist_api.git
    cd crosoften-api
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

## Environment Variables

Copy the `.env.example` file to `.env` and set the environment variables:

```bash
cp .env.example .env

# Edit the .env file
```

## Database Setup
2. Run the migrations to configure the database schema:
   
   ### First, create a database named 'crosoften' in your local MySQL server.

   ```bash
   npm run typeorm migration:run
   # ou
   yarn typeorm migration:run
   ```
   
## Running the API
   ```bash
    npm run dev
    # or
    yarn dev
   ```

## API Documentation
The API documentation is generated using Swagger. You can access it at:

[http://localhost:3333/api-docs](http://localhost:3333/api-docs)
    
Add de JWT returned in the authenticate endpoint in the top right corner of the page to authenticate the requests.
