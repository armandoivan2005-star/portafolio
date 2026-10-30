# Portafolio de Armando Castillo

Sitio público: <https://portafolio.novasoftsl.com/>

## Contenido

- Fiscalix
- Pliegoluz
- Matego
- Consulta de divisas y panel de acciones (México y EUA)

## Vista local

Abre `dist/index.html` en un navegador. No requiere instalación ni proceso de compilación.

La estructura está separada en `dist/index.html` y la presentación visual en `dist/assets/css/styles.css`.
La página de error personalizada está en `dist/404.html`.
En hosting Apache/IONOS, `dist/.htaccess` conecta automáticamente los errores 404 con esa página.

Enlaces públicos conectados:

- `https://fiscalix.novasoftsl.com`
- `https://matego.novasoftsl.com`
- `https://pliegoluz.novasoftsl.com`
- `https://divisas.novasoftsl.com`
- `https://github.com/armandoivan2005-star`
- `https://github.com/armandoivan2005-star/portafolio`

## Actualizar el CV

El botón de descarga apunta a `dist/assets/documents/CV.pdf`. Para reemplazarlo manualmente, conserva ese nombre y sustituye el archivo por el nuevo PDF.

También puedes ejecutar:

```text
node scripts/update-cv.mjs "C:\ruta\al\nuevo-CV.pdf"
```

Después ejecuta `node scripts/validate.mjs` y publica nuevamente el contenido de `dist`.

## Publicación

El sitemap corresponde al subdominio de IONOS:

```text
node scripts/generate-sitemap.mjs https://portafolio.novasoftsl.com
```

Para publicar, sube todo el contenido de `dist`, incluyendo los archivos ocultos como `.htaccess`. La carpeta `.openai` y los scripts son configuración y herramientas de mantenimiento, no recursos públicos del sitio.
