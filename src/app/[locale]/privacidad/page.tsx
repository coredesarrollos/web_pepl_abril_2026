import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEs = locale !== 'en';

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-6 py-20">
        {isEs ? <PrivacidadEs /> : <PrivacyEn />}
      </main>
      <SiteFooter />
    </>
  );
}

function PrivacidadEs() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>Política de Privacidad</h1>
      <p className="text-sm text-[var(--color-ink-soft)]">Última actualización: 7 de mayo de 2026</p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        PEpL S.R.L. (en adelante, <strong>«PEpL»</strong> o <strong>«nosotros»</strong>), con domicilio
        en la República Argentina y correo electrónico de contacto{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>, es responsable del
        tratamiento de los datos personales que se recopilan a través de la plataforma disponible en{' '}
        <strong>www.pepl.app</strong>.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>Recopilamos los siguientes tipos de datos personales:</p>
      <ul>
        <li>
          <strong>Datos de identificación y contacto:</strong> nombre, apellido, dirección de correo
          electrónico y empresa u organización a la que pertenece el usuario.
        </li>
        <li>
          <strong>Datos de logros y actividad:</strong> métricas de actividad física o de progreso
          personal registradas a través de plataformas partner integradas (asistencias, metas alcanzadas,
          hitos validados).
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo, páginas
          visitadas y duración de la sesión, recopilados automáticamente con fines de seguridad y
          diagnóstico.
        </li>
        <li>
          <strong>Datos analíticos:</strong> información agregada sobre el comportamiento de navegación,
          recopilada a través de herramientas de analítica (Microsoft Clarity) que pueden utilizar
          cookies o tecnologías similares.
        </li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Utilizamos los datos para:</p>
      <ul>
        <li>Gestionar solicitudes de demo y consultas comerciales.</li>
        <li>Validar logros de usuarios en plataformas partner y activar beneficios correspondientes.</li>
        <li>Mejorar el rendimiento, la seguridad y la experiencia de uso de la plataforma.</li>
        <li>Cumplir obligaciones legales y contractuales.</li>
        <li>Enviar comunicaciones de servicio relacionadas con el uso de la plataforma (no publicidad).</li>
      </ul>

      <h2>4. Base legal del tratamiento</h2>
      <p>
        El tratamiento de los datos personales se sustenta en: (i) el consentimiento otorgado por el
        titular al completar un formulario o al usar la plataforma; (ii) la ejecución de un contrato o
        precontrato cuando se solicita una demo o se establece una relación comercial; y (iii) el interés
        legítimo de PEpL en el mantenimiento de la seguridad de sus sistemas.
      </p>

      <h2>5. Conservación de los datos</h2>
      <p>
        Los datos personales se conservan durante el tiempo necesario para cumplir con las finalidades
        descritas y, en todo caso, durante los plazos exigidos por la normativa argentina vigente (Ley
        N.° 25.326 de Protección de los Datos Personales y su decreto reglamentario). Los datos
        recopilados mediante formularios de contacto se eliminan o anonimizados transcurridos 24 meses
        desde su última interacción activa.
      </p>

      <h2>6. Destinatarios y transferencias</h2>
      <p>
        PEpL no vende, alquila ni cede datos personales a terceros con fines comerciales propios de
        éstos. Los datos pueden ser accedidos por:
      </p>
      <ul>
        <li>
          <strong>Proveedores tecnológicos:</strong> Vercel Inc. (infraestructura cloud), Sanity AS
          (CMS), Resend Inc. (email transaccional), Upstash Inc. (rate-limiting), Sentry Inc.
          (diagnóstico de errores) y Microsoft Corporation (Microsoft Clarity — analítica). Todos
          operan bajo acuerdos de procesamiento de datos conformes a estándares internacionales.
        </li>
        <li>
          <strong>Plataformas partner integradas:</strong> solo reciben o envían los datos de logros
          estrictamente necesarios para la validación de la recompensa.
        </li>
        <li>
          <strong>Autoridades competentes:</strong> cuando exista una obligación legal o requerimiento
          judicial.
        </li>
      </ul>

      <h2>7. Derechos del titular</h2>
      <p>
        El titular de los datos tiene derecho a acceder, rectificar, suprimir, oponerse y solicitar la
        portabilidad de sus datos personales en los términos previstos por la Ley N.° 25.326 y sus
        normas complementarias. Para ejercer cualquiera de estos derechos, debe dirigirse a:{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a> indicando en el
        asunto <em>«Derechos ARPO»</em>.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        PEpL implementa medidas técnicas y organizativas adecuadas para proteger los datos personales
        frente a accesos no autorizados, pérdida, alteración o divulgación, incluyendo cifrado en
        tránsito (TLS 1.2+), controles de acceso basados en roles y auditorías periódicas de seguridad.
      </p>

      <h2>9. Cookies y tecnologías de seguimiento</h2>
      <p>
        La plataforma utiliza cookies propias y de terceros (incluyendo Microsoft Clarity) con la única
        finalidad de medir la experiencia de usuario y mejorar la plataforma. Las cookies de análisis
        se aplican únicamente previo consentimiento. El usuario puede gestionar sus preferencias de
        cookies desde la configuración de su navegador en cualquier momento.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        PEpL podrá actualizar esta Política de Privacidad en cualquier momento. Las modificaciones
        serán publicadas en esta misma URL con la fecha de última actualización. El uso continuado de
        la plataforma tras la publicación de cambios implica la aceptación de la versión vigente.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactar
        a PEpL en:{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>
    </article>
  );
}

function PrivacyEn() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-[var(--color-ink-soft)]">Last updated: May 7, 2026</p>

      <h2>1. Data Controller</h2>
      <p>
        PEpL S.R.L. (<strong>"PEpL"</strong> or <strong>"we"</strong>), domiciled in the Republic of
        Argentina, reachable at{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>, is the data
        controller for personal data collected through the platform available at{' '}
        <strong>www.pepl.app</strong>.
      </p>

      <h2>2. Data We Collect</h2>
      <ul>
        <li>
          <strong>Identification &amp; contact data:</strong> first name, last name, email address and
          company or organisation.
        </li>
        <li>
          <strong>Achievement &amp; activity data:</strong> personal progress metrics recorded through
          integrated partner platforms (attendance records, completed goals, validated milestones).
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser type, operating system, pages visited
          and session duration, collected automatically for security and diagnostic purposes.
        </li>
        <li>
          <strong>Analytics data:</strong> aggregated navigation behaviour collected via analytics
          tools (Microsoft Clarity) that may use cookies or similar technologies.
        </li>
      </ul>

      <h2>3. Purposes of Processing</h2>
      <ul>
        <li>Managing demo requests and commercial inquiries.</li>
        <li>Validating user achievements on partner platforms and activating corresponding rewards.</li>
        <li>Improving platform performance, security and user experience.</li>
        <li>Complying with legal and contractual obligations.</li>
        <li>Sending service communications related to platform use (no marketing).</li>
      </ul>

      <h2>4. Legal Basis</h2>
      <p>
        Processing is based on: (i) consent given by completing a form or using the platform; (ii)
        contract performance when a demo is requested or a commercial relationship is established;
        and (iii) PEpL's legitimate interest in maintaining system security.
      </p>

      <h2>5. Retention</h2>
      <p>
        Data is retained for as long as necessary to fulfil the stated purposes and, in all cases, for
        the periods required under applicable Argentine law (Law No. 25,326 on Personal Data
        Protection). Contact form data is deleted or anonymised 24 months after the last active
        interaction.
      </p>

      <h2>6. Recipients and Transfers</h2>
      <p>PEpL does not sell, rent or transfer personal data to third parties for their own commercial purposes. Data may be accessed by:</p>
      <ul>
        <li>
          <strong>Technology providers:</strong> Vercel Inc. (cloud infrastructure), Sanity AS (CMS),
          Resend Inc. (transactional email), Upstash Inc. (rate-limiting), Sentry Inc. (error
          diagnostics) and Microsoft Corporation (Microsoft Clarity — analytics). All operate under
          data processing agreements compliant with international standards.
        </li>
        <li>
          <strong>Integrated partner platforms:</strong> receive only the achievement data strictly
          necessary for reward validation.
        </li>
        <li>
          <strong>Competent authorities:</strong> when required by law or court order.
        </li>
      </ul>

      <h2>7. Data Subject Rights</h2>
      <p>
        You have the right to access, rectify, delete, object to and request portability of your
        personal data under Law No. 25,326 and its supplementary rules. To exercise these rights,
        contact us at{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a> with the subject{' '}
        <em>"Data Rights Request"</em>.
      </p>

      <h2>8. Security</h2>
      <p>
        PEpL implements appropriate technical and organisational measures to protect personal data
        against unauthorised access, loss, alteration or disclosure, including TLS 1.2+ encryption in
        transit, role-based access controls and periodic security audits.
      </p>

      <h2>9. Cookies and Tracking</h2>
      <p>
        The platform uses first-party and third-party cookies (including Microsoft Clarity) solely to
        measure user experience and improve the platform. Analytics cookies are applied only with
        prior consent. Users can manage cookie preferences through their browser settings at any time.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        PEpL may update this Privacy Policy at any time. Changes will be published at this URL with an
        updated date. Continued use of the platform after changes are published constitutes acceptance
        of the current version.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any questions about the processing of your personal data, contact PEpL at:{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>
    </article>
  );
}
