<div style="text-align:center;">
<img src="https://github.com/martinval11/exams-5to/blob/main/public/icon-512x512.png?raw=true" width="150" height="150">

# Exámenes 5to
Exámenes escolares para 5to A
</div>

Idiomas Disponibles:
- [Inglés](README.md)
- [Español](README.es.md)

## ¿Cómo arrancar el proyecto?

```sh
git clone https://github.com/martinval11/exams-5to
cd exams-5to
bun install
```

Creá un archivo `.env.local` y coloca el siguiente código:

```
NEXT_PUBLIC_EXAMS_TABLE_DEV= {{ TABLE_OF_YOUR_SUPABASE_DB }}
NEXT_PUBLIC_SUPABASE_URL= {{ YOUR SUPABASE URL DB }}
NEXT_PUBLIC_SUPABASE_KEY= {{ YOUR SUPABASE KEY }}
NEXT_PUBLIC_SECRET_KEY= {{ SECRET KEY FOR crypto.js }}
NEXT_PUBLIC_FIREBASE_VAPID_KEY= {{ FIREBASE MESSAGING VAPID KEY FOR NOTIFICATIONS }}
```

Ahora ejecuta:
```
$ bun dev

   ▲ Next.js 14.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 7.7s
```

## Scripts
- `bun dev` - Inicia el entorno de desarrollo
- `bun build` - Crea el `bundle` para producción
- `bun run test` - Ejecuta los tests con Cypress