import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function TerminosPage({
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
        {isEs ? <TerminosEs /> : <TermsEn />}
      </main>
      <SiteFooter />
    </>
  );
}

function TerminosEs() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>Términos y Condiciones de Uso</h1>
      <p className="text-sm text-[var(--color-ink-soft)]">Última actualización: 7 de mayo de 2026</p>

      <h2>1. Partes y aceptación</h2>
      <p>
        El presente documento establece los Términos y Condiciones (en adelante, <strong>«Términos»</strong>)
        que regulan el acceso y uso de la plataforma <strong>PEpL</strong> (disponible en{' '}
        <strong>www.pepl.app</strong>), operada por PEpL S.R.L. (en adelante, <strong>«PEpL»</strong>),
        domiciliada en la República Argentina.
      </p>
      <p>
        Al acceder a la plataforma, solicitar una demo, utilizar cualquiera de los servicios ofrecidos
        o aceptar expresamente estos Términos, el usuario o la entidad que actúa en su nombre (en
        adelante, <strong>«Usuario»</strong>) declara haber leído, comprendido y aceptado estos
        Términos en su totalidad. Si no acepta alguna de las condiciones aquí establecidas, debe
        abstenerse de utilizar la plataforma.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        PEpL es una plataforma de publicidad basada en logros reales. Su propósito es conectar marcas
        y organizaciones aliadas (<strong>«Partners»</strong>) con usuarios finales en el momento en
        que estos alcanzan un hito personal verificado —en ámbitos como el deporte, la salud y el
        bienestar—, activando beneficios y recompensas concretas.
      </p>
      <p>PEpL se integra de manera no invasiva en plataformas de terceros (apps de gimnasios,
        sistemas de asistencia, aplicaciones de hábitos) a través de una API documentada y actúa
        como intermediario tecnológico entre Partners y usuarios finales.</p>

      <h2>3. Registro y acceso</h2>
      <p>
        El acceso completo a la plataforma requiere la creación de una cuenta. El Usuario se
        compromete a proporcionar información veraz, completa y actualizada durante el proceso de
        registro y a mantener la confidencialidad de sus credenciales de acceso. PEpL no será
        responsable por los daños que puedan derivarse del uso no autorizado de una cuenta por parte
        de terceros cuando dicho uso sea imputable al Usuario.
      </p>

      <h2>4. Obligaciones del usuario</h2>
      <p>El Usuario se compromete a:</p>
      <ul>
        <li>Utilizar la plataforma de forma lícita y de acuerdo a estos Términos y a la normativa vigente.</li>
        <li>No intentar eludir, desactivar o interferir con los mecanismos de seguridad de la plataforma.</li>
        <li>No realizar ingeniería inversa, descompilar ni intentar obtener el código fuente de la plataforma.</li>
        <li>No falsificar logros, datos de actividad o cualquier métrica enviada a la plataforma.</li>
        <li>No hacer uso abusivo o fraudulento de los beneficios y recompensas activados.</li>
        <li>No transmitir contenidos ilícitos, ofensivos, difamatorios o que infrinjan derechos de terceros.</li>
      </ul>

      <h2>5. Propiedad intelectual</h2>
      <p>
        Todos los contenidos, diseños, logotipos, software, algoritmos y materiales presentes en la
        plataforma son propiedad exclusiva de PEpL o de sus licenciantes y están protegidos por la
        legislación argentina e internacional en materia de propiedad intelectual. Queda expresamente
        prohibida su reproducción, distribución, modificación o uso comercial sin autorización previa
        y por escrito de PEpL.
      </p>

      <h2>6. Modelo de negocio y pagos</h2>
      <p>
        PEpL opera bajo un modelo de cobro por logro validado. Los Partners abonan únicamente cuando
        un beneficio es activado como resultado de un logro real verificado por la plataforma. Las
        condiciones económicas específicas, incluyendo tarifas y métodos de pago, se establecen en el
        contrato comercial particular suscripto entre PEpL y cada Partner.
      </p>

      <h2>7. Disponibilidad y mantenimiento</h2>
      <p>
        PEpL procurará mantener la plataforma disponible de forma continua, pero no garantiza una
        disponibilidad del 100%. Podrán producirse interrupciones por mantenimiento programado,
        actualizaciones técnicas o causas de fuerza mayor. PEpL notificará con antelación razonable
        las interrupciones planificadas cuando sea posible.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, PEpL no será responsable por daños indirectos,
        incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de
        uso de la plataforma. La responsabilidad total de PEpL frente al Usuario no podrá exceder el
        importe abonado por éste a PEpL durante los tres (3) meses anteriores al evento que originó
        el daño.
      </p>

      <h2>9. Privacidad y protección de datos</h2>
      <p>
        El tratamiento de los datos personales de los usuarios se rige por la{' '}
        <Link href="/privacidad">Política de Privacidad</Link> de PEpL, que forma parte integrante de estos
        Términos.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        PEpL se reserva el derecho de modificar estos Términos en cualquier momento. Las
        modificaciones entrarán en vigencia a partir de su publicación en la plataforma. El uso
        continuado de la plataforma tras la publicación de los cambios implica la aceptación de la
        versión actualizada. PEpL notificará al Usuario los cambios materiales por correo electrónico
        cuando sea posible.
      </p>

      <h2>11. Terminación</h2>
      <p>
        PEpL podrá suspender o cancelar el acceso del Usuario a la plataforma en caso de incumplimiento
        de estos Términos, con o sin previo aviso, según la gravedad de la infracción. El Usuario
        podrá cancelar su cuenta en cualquier momento notificando a{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>

      <h2>12. Ley aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República Argentina. Cualquier controversia que
        surja en relación con su interpretación o cumplimiento será sometida a la jurisdicción de los
        Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, con renuncia expresa a cualquier
        otro fuero o jurisdicción.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con estos Términos, puede contactar a PEpL en:{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>
    </article>
  );
}

function TermsEn() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1>Terms and Conditions of Use</h1>
      <p className="text-sm text-[var(--color-ink-soft)]">Last updated: May 7, 2026</p>

      <h2>1. Parties and Acceptance</h2>
      <p>
        These Terms and Conditions (<strong>"Terms"</strong>) govern access to and use of the{' '}
        <strong>PEpL</strong> platform (available at <strong>www.pepl.app</strong>), operated by PEpL
        S.R.L. (<strong>"PEpL"</strong>), domiciled in the Republic of Argentina.
      </p>
      <p>
        By accessing the platform, requesting a demo, using any of the offered services or expressly
        accepting these Terms, the user or the entity acting on their behalf (<strong>"User"</strong>)
        declares they have read, understood and accepted these Terms in full. If you do not accept any
        of these conditions, you must refrain from using the platform.
      </p>

      <h2>2. Service Description</h2>
      <p>
        PEpL is an achievement-based advertising platform that connects brands and partner
        organisations (<strong>"Partners"</strong>) with end users at the moment they reach a verified
        personal milestone — in areas such as sport, health and well-being — activating concrete
        rewards and benefits.
      </p>
      <p>
        PEpL integrates non-invasively into third-party platforms (gym apps, attendance systems,
        habit applications) via a documented API, acting as a technological intermediary between
        Partners and end users.
      </p>

      <h2>3. Registration and Access</h2>
      <p>
        Full platform access requires creating an account. Users undertake to provide truthful,
        complete and up-to-date information during registration and to keep their access credentials
        confidential. PEpL will not be liable for damages arising from the unauthorised use of an
        account where such use is attributable to the User.
      </p>

      <h2>4. User Obligations</h2>
      <ul>
        <li>Use the platform lawfully and in accordance with these Terms and applicable regulations.</li>
        <li>Not attempt to circumvent, disable or interfere with the platform's security mechanisms.</li>
        <li>Not reverse-engineer, decompile or attempt to obtain the platform's source code.</li>
        <li>Not falsify achievements, activity data or any metrics submitted to the platform.</li>
        <li>Not make abusive or fraudulent use of activated rewards or benefits.</li>
        <li>Not transmit unlawful, offensive, defamatory content or content that infringes third-party rights.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, designs, logos, software, algorithms and materials on the platform are the
        exclusive property of PEpL or its licensors and are protected by Argentine and international
        intellectual property law. Reproduction, distribution, modification or commercial use without
        PEpL's prior written authorisation is expressly prohibited.
      </p>

      <h2>6. Business Model and Payments</h2>
      <p>
        PEpL operates on a pay-per-validated-achievement model. Partners are charged only when a
        benefit is activated as a result of a real, platform-verified achievement. Specific economic
        terms, including fees and payment methods, are set out in the individual commercial agreement
        between PEpL and each Partner.
      </p>

      <h2>7. Availability and Maintenance</h2>
      <p>
        PEpL will endeavour to keep the platform continuously available but does not guarantee 100%
        uptime. Interruptions may occur due to scheduled maintenance, technical updates or force
        majeure. PEpL will provide reasonable advance notice of planned interruptions where possible.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, PEpL will not be liable for indirect, incidental,
        special, consequential or punitive damages resulting from the use or inability to use the
        platform. PEpL's total liability to the User will not exceed the amount paid by the User to
        PEpL in the three (3) months preceding the event that gave rise to the damage.
      </p>

      <h2>9. Privacy and Data Protection</h2>
      <p>
        The processing of Users' personal data is governed by PEpL's{' '}
        <Link href="/privacidad">Privacy Policy</Link>, which forms an integral part of these Terms.
      </p>

      <h2>10. Modifications</h2>
      <p>
        PEpL reserves the right to modify these Terms at any time. Modifications take effect upon
        publication on the platform. Continued use of the platform after changes are published
        constitutes acceptance of the updated version. PEpL will notify Users of material changes by
        email where possible.
      </p>

      <h2>11. Termination</h2>
      <p>
        PEpL may suspend or cancel a User's access to the platform in the event of a breach of these
        Terms, with or without prior notice depending on the severity of the infringement. Users may
        cancel their account at any time by notifying{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>

      <h2>12. Governing Law and Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of the Republic of Argentina. Any dispute arising in
        connection with their interpretation or enforcement shall be submitted to the Ordinary Courts
        of the Autonomous City of Buenos Aires, with express waiver of any other forum or
        jurisdiction.
      </p>

      <h2>13. Contact</h2>
      <p>
        For any queries relating to these Terms, contact PEpL at:{' '}
        <a href="mailto:pepl.marketplace@gmail.com">pepl.marketplace@gmail.com</a>.
      </p>
    </article>
  );
}
