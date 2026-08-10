# aplicaciones-moviles

Este repositorio contiene las carpetas de clase que sí se deben versionar, principalmente `clases/`. La carpeta `proyecto/` no se sube y los archivos generados por Angular y Node.js quedan excluidos por `.gitignore`.

## Estructura esperada

- `clases/angular/`: ejercicios y aplicaciones Angular.
- `clases/nodejs/`: ejercicios y aplicaciones Node.js.
- `proyecto/`: no se versiona.

## Versiones de tecnologías

Estas son las versiones que se están usando actualmente en los proyectos del repositorio:

- Angular: `22.0.0` en todos los proyectos de `clases/angular/`.
- Angular CLI y Angular Build: `22.0.7`.
- Node.js: `v26.5.0` en el entorno actual.
- npm: `12.0.1`.

Al revisar los `package.json` de `app1`, `app_directivas`, `app_data_binding`, `app_comunicaciones-1`, `app_comunicaciones-2`, `app_comunicaciones-io` y `practica_parcial`, todos usan la misma versión base de Angular, por lo que no hay mezcla de versiones de Angular en esos proyectos.

## Reinstalar dependencias

Después de clonar el repositorio en otro computador, primero asegúrate de tener instalado Node.js y npm. Luego entra a cada proyecto y ejecuta `npm install` dentro de su carpeta raíz.

### Angular

Para cada aplicación Angular:

```bash
cd clases/angular/app1
npm install

cd ../app_directivas
npm install

cd ../app_data_binding
npm install
```

Para ejecutar una app Angular:

```bash
npm start
```

o, si quieres compilar en modo vigilancia:

```bash
npm run watch
```

### Node.js

Para cada proyecto Node.js:

```bash
cd clases/nodejs/code_1
npm install

cd ../code_2
npm install

cd ../code_3
npm install
```

Según el proyecto, puedes usar estos comandos:

```bash
npm run dev
npm run build
npm start
```

## Nota

No es necesario subir `node_modules`, `.angular/`, `.vscode/` ni carpetas de salida como `dist/` o `coverage/`, porque se regeneran con `npm install` o con los comandos de compilación/ejecución.

## Configuración de Git Bash

Cuando trabajes en casa o en la universidad, puedes ajustar tu identidad global de Git, revisar qué valores se están usando y limpiar credenciales al terminar.

### 1. Cambiar el usuario y el correo en Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

### 2. Ver la configuración global actual

```bash
git config --global --list
git config --global user.name
git config --global user.email
```

### 3. Borrar o limpiar credenciales al finalizar

```bash
git config --global --unset user.name
git config --global --unset user.email
git config --global --unset credential.helper
git credential-cache exit
git credential-manager logout
```

Si utilizas Git Credential Manager en Windows, `git credential-manager logout` cierra la sesión guardada. Si además quieres quitar cualquier helper configurado de forma global, usa `git config --global --unset credential.helper`.