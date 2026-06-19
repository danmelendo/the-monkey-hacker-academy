// Configuración central del sitio. Aquí viven los enlaces externos y los datos
// que el cliente aún no ha proporcionado (marcados con TODO).

// URL del perfil de Superprof de José Miguel.
// Todos los botones de "Apuntarme" de los cursos apuntan aquí.
export const SUPERPROF_URL = "https://www.superprof.es/ir/11643615-a54bfe";

// TODO: Reemplazar por el email real de suscripción/contacto (el cliente aún no
// lo ha proporcionado). A esta dirección llegan las altas de MongoMail y las
// peticiones de recursos, abriendo la app de correo del usuario (sin backend).
export const SUBSCRIBE_EMAIL = "hola@mongohacker.com";

// Redes sociales oficiales (no usar GitHub ni Twitter).
export const SOCIAL = {
  youtube: "https://www.youtube.com/@mongohacker",
  tiktok: "https://www.tiktok.com/@mongohacker",
  instagram: "https://www.instagram.com/mongohacker/",
} as const;

// Contenido destacado que se incrusta en la página de Comunidad.
// Rellena cada valor para que aparezca el embed correspondiente; si se deja
// vacío, se muestra un bloque de "próximamente" con enlace al perfil.
export const FEATURED = {
  // URL de YouTube a destacar. Si es un vídeo o short (watch?v=, youtu.be,
  // /shorts/) se incrusta como reproductor; si es una publicación de la
  // comunidad (/post/) se muestra como tarjeta enlazada (no es incrustable).
  youtubeUrl: "https://www.youtube.com/shorts/hZAyjbI8aiI",
  // URL del post/reel de Instagram a mostrar.
  instagramPostUrl: "https://www.instagram.com/mongohacker/p/DZcLFflIpo4/",
  // URL del vídeo de TikTok a destacar.
  tiktokVideoUrl: "https://www.tiktok.com/@mongohacker/video/7650062652286373143",
} as const;

// Devuelve true si la URL de Superprof ya está configurada.
export const hasSuperprof = () => SUPERPROF_URL.trim().length > 0;
