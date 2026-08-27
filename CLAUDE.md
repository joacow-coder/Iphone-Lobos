# iPhone Lobos — landing page

Next.js app deployado en Cloudflare Pages, conectado al repo GitHub `joacow-coder/Iphone-Lobos`, rama `main`.

## Flujo de trabajo con Git

- Después de completar cada tarea que cree o modifique archivos, hacer `git add`, `git commit` y `git push` a `origin/main` automáticamente, sin pedir confirmación cada vez (ya autorizado por el usuario).
- Cada push a `main` dispara un deploy en Cloudflare Pages: evitar pushear cambios a medio terminar o que rompan el build.
- Usar mensajes de commit descriptivos y concisos sobre el cambio realizado.
