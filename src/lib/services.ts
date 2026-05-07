/**
 * Servicios PEpL — single source of truth para audiencias.
 * Tomado de pepl.app: usuarios, gimnasios, marcas, emprendedores.
 * Cualquier copy de servicios DEBE venir de acá (no hardcodear en JSX).
 */

export type AudienceId = 'usuarios' | 'gimnasios' | 'marcas' | 'emprendedores';

export type Service = {
  id: AudienceId;
  /** Slug de URL */
  slug: string;
  /** Icon name (lucide-react) */
  icon: 'users' | 'dumbbell' | 'megaphone' | 'rocket';
  /** Tema sugerido para esta audiencia (se aplica al hover/destacado) */
  suggestedTheme: 'accion' | 'energia' | 'autoconocimiento' | 'estructura';
  i18n: {
    es: ServiceCopy;
    en: ServiceCopy;
  };
};

export type ServiceCopy = {
  title: string;
  subtitle: string;
  description: string;
  bullets: readonly string[];
  cta: string;
};

export const SERVICES: readonly Service[] = [
  {
    id: 'usuarios',
    slug: 'usuarios',
    icon: 'users',
    suggestedTheme: 'energia',
    i18n: {
      es: {
        title: 'Usuarios',
        subtitle: 'Cumplí lo que te propusiste y obtené beneficios reales.',
        description:
          'Una app que mide tu esfuerzo y lo convierte en recompensas concretas con marcas y gimnasios.',
        bullets: [
          'Seguimiento automático de logros',
          'Beneficios canjeables en marcas aliadas',
          'Comunidad que celebra cada paso',
        ],
        cta: 'Quiero empezar',
      },
      en: {
        title: 'Members',
        subtitle: 'Hit your goals and earn real rewards.',
        description:
          'An app that measures your effort and turns it into concrete rewards from partner brands and gyms.',
        bullets: [
          'Automatic achievement tracking',
          'Rewards redeemable with partner brands',
          'A community that celebrates every step',
        ],
        cta: 'Get started',
      },
    },
  },
  {
    id: 'gimnasios',
    slug: 'gimnasios',
    icon: 'dumbbell',
    suggestedTheme: 'accion',
    i18n: {
      es: {
        title: 'Gimnasios',
        subtitle: 'Más adherencia, menos churn, datos accionables.',
        description:
          'Reconocé y premiá la consistencia de tus socios. PEpL conecta su esfuerzo con beneficios y mantiene tu marca cerca, todos los días.',
        bullets: [
          'Reducción de churn medible',
          'Programa de fidelización llave en mano',
          'Insights de comportamiento por socio',
        ],
        cta: 'Sumar mi gimnasio',
      },
      en: {
        title: 'Gyms',
        subtitle: 'More retention, less churn, actionable data.',
        description:
          'Recognise and reward member consistency. PEpL turns their effort into rewards and keeps your brand close, every day.',
        bullets: [
          'Measurable churn reduction',
          'Turnkey loyalty program',
          'Per-member behavioural insights',
        ],
        cta: 'Join as a gym',
      },
    },
  },
  {
    id: 'marcas',
    slug: 'marcas',
    icon: 'megaphone',
    suggestedTheme: 'autoconocimiento',
    i18n: {
      es: {
        title: 'Marcas',
        subtitle: 'Publicidad emocional, anclada en logros reales.',
        description:
          'Llegá a una audiencia activa, validada por su esfuerzo. PEpL no interrumpe: acompaña el momento exacto de la victoria.',
        bullets: [
          'Audiencia segmentada por hábito y logro',
          'Métricas de impacto emocional',
          'Activaciones contextuales en momento clave',
        ],
        cta: 'Hablemos',
      },
      en: {
        title: 'Brands',
        subtitle: 'Emotional advertising anchored in real achievements.',
        description:
          'Reach an active audience validated by their own effort. PEpL doesn’t interrupt — it shows up at the exact moment of victory.',
        bullets: [
          'Audience segmented by habit and achievement',
          'Emotional-impact metrics',
          'Contextual activations at the key moment',
        ],
        cta: 'Let’s talk',
      },
    },
  },
  {
    id: 'emprendedores',
    slug: 'emprendedores',
    icon: 'rocket',
    suggestedTheme: 'estructura',
    i18n: {
      es: {
        title: 'Emprendedores',
        subtitle: 'Llevá tu propuesta a una comunidad que se mueve.',
        description:
          'Un canal directo a una audiencia de alto compromiso. Tu producto al lado del próximo logro.',
        bullets: [
          'Onboarding ágil',
          'Pricing por performance',
          'Soporte de growth dedicado',
        ],
        cta: 'Quiero sumar mi marca',
      },
      en: {
        title: 'Founders',
        subtitle: 'Bring your offer to a community on the move.',
        description:
          'A direct channel to a high-commitment audience. Your product, right next to the next achievement.',
        bullets: [
          'Frictionless onboarding',
          'Performance-based pricing',
          'Dedicated growth support',
        ],
        cta: 'Add my brand',
      },
    },
  },
] as const;

export function getService(id: AudienceId): Service {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown audience: ${id}`);
  return s;
}
