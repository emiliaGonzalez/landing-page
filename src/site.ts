// ─────────────────────────────────────────────────────────────────────────────
// URLs de Stripe (hospedadas, sin backend — mismo patrón que usa DesignJoy).
// Las creas UNA vez en tu dashboard de Stripe y las pegas aquí.
// ─────────────────────────────────────────────────────────────────────────────

// "Únete hoy" → Stripe Checkout de la suscripción ($24,995 MXN/mes).
//   Cómo: Stripe Dashboard → Catálogo/Productos → crea el producto con precio
//   recurrente mensual → "Crear Payment Link" → copia la URL (https://buy.stripe.com/...).
export const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/TU-PAYMENT-LINK";

// "Iniciar sesión" → Portal de cliente de Stripe (pausar / cancelar / actualizar pago).
//   Cómo: Stripe Dashboard → Configuración → Facturación → Portal de clientes →
//   activa el portal y copia el "link de inicio de sesión" (https://billing.stripe.com/p/login/...).
export const STRIPE_PORTAL_URL = "https://billing.stripe.com/p/login/TU-PORTAL";
