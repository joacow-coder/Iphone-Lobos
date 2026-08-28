# iPhone Lobos — landing page

Next.js app deployado en Cloudflare Pages, conectado al repo GitHub `joacow-coder/Iphone-Lobos`, rama `main`.

## Flujo de trabajo con Git

- Al terminar cada tarea que cree o modifique código: primero correr `npm run build` (y `npm run lint` si aplica) para verificar que compila sin errores.
- Si la build falla, arreglar el problema antes de commitear — nunca pushear código que no compila.
- Si la build pasa, hacer `git add`, `git commit` con un mensaje descriptivo y conciso del cambio, y `git push` a `origin/main` automáticamente, sin pedir confirmación previa (ya autorizado por el usuario).
- Cada push a `main` dispara un deploy en Cloudflare Pages: por eso la verificación de build previa es obligatoria, para evitar pushear cambios a medio terminar o que rompan el sitio en producción.
