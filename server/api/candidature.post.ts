import { readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const parts = await readMultipartFormData(event)
  if (!parts) {
    throw createError({ statusCode: 400, statusMessage: 'Données du formulaire manquantes' })
  }

  const fields: Record<string, string> = {}
  let cvFile: { filename: string; type: string; data: Buffer } | null = null

  for (const part of parts) {
    if (!part.name) continue
    if (part.filename) {
      if (part.data.length > 5 * 1024 * 1024) {
        throw createError({ statusCode: 400, statusMessage: 'Le CV ne doit pas dépasser 5 Mo' })
      }
      cvFile = {
        filename: part.filename,
        type: part.type || 'application/octet-stream',
        data: part.data,
      }
    } else {
      fields[part.name] = part.data.toString('utf-8')
    }
  }

  const { nom, email, telephone, linkedin, introduction, offre_titre } = fields

  if (!nom || !email) {
    throw createError({ statusCode: 400, statusMessage: 'Nom et email requis' })
  }

  const contactEmail = config.contactEmail || process.env.CONTACT_EMAIL
  if (!contactEmail) {
    throw createError({ statusCode: 500, statusMessage: 'CONTACT_EMAIL non configuré' })
  }

  const subject = `Nouvelle candidature – ${offre_titre || 'Offre inconnue'}`

  const htmlBody = `
    <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
      <div style="background: #0052CC; padding: 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Nouvelle candidature reçue</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">${offre_titre || 'Poste non spécifié'}</p>
      </div>
      <div style="background: #f8f9fa; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e9ecef; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; width: 140px; font-size: 14px;">Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">${nom}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; font-size: 14px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;"><a href="mailto:${email}" style="color: #0052CC;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; font-size: 14px;">Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">${telephone || '<em style="color:#999">Non renseigné</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; font-size: 14px;">LinkedIn</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">${linkedin ? `<a href="${linkedin}" style="color: #0052CC;">${linkedin}</a>` : '<em style="color:#999">Non renseigné</em>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; font-size: 14px;">CV</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">${cvFile ? `✅ ${cvFile.filename}` : '<em style="color:#999">Non joint</em>'}</td>
          </tr>
        </table>
        ${introduction ? `
        <div style="margin-top: 24px;">
          <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">Message du candidat</p>
          <div style="background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${introduction}</div>
        </div>
        ` : ''}
        <p style="margin-top: 24px; font-size: 12px; color: #999;">Reçu le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    </div>
  `

  const resendApiKey = config.resendApiKey || process.env.RESEND_API_KEY
  const smtpHost = config.smtpHost || process.env.SMTP_HOST
  const smtpUser = config.smtpUser || process.env.SMTP_USER
  const smtpPass = config.smtpPass || process.env.SMTP_PASS

  if (resendApiKey) {
    const { Resend } = await import('resend')
    const resend = new Resend(resendApiKey)

    const fromAddress = config.resendFrom || process.env.RESEND_FROM || 'candidatures@lo-consulting.com'

    const attachments = cvFile
      ? [{ filename: cvFile.filename, content: cvFile.data }]
      : []

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject,
      html: htmlBody,
      attachments,
    })

    if (error) {
      throw createError({ statusCode: 500, statusMessage: `Erreur Resend: ${error.message}` })
    }

    return { ok: true }
  }

  if (smtpHost && smtpUser && smtpPass) {
    const nodemailer = await import('nodemailer')
    const smtpPort = parseInt(String(config.smtpPort || process.env.SMTP_PORT || '587'))

    const transporter = nodemailer.default.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })

    const attachments = cvFile
      ? [{ filename: cvFile.filename, content: cvFile.data, contentType: cvFile.type }]
      : []

    await transporter.sendMail({
      from: `"LIC Carrières" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject,
      html: htmlBody,
      attachments,
    })

    return { ok: true }
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Aucun service email configuré. Définissez RESEND_API_KEY ou SMTP_HOST/USER/PASS.',
  })
})
