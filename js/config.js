// Configuración de la app.
//
// Para usar cuentas y sincronizar el progreso entre dispositivos, completá estos dos datos
// con los de tu proyecto de Supabase (Project Settings > API).
// La "anon key" (o publishable key) es pública por diseño: la seguridad la pone RLS en la base.
//
// Si los dejás vacíos, la app funciona en modo local: sin login y guardando todo en este dispositivo.

export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';

// Nombre de la edge function del tutor de IA.
export const TUTOR_FUNCTION = 'tutor';
