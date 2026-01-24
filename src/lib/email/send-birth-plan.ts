import { Resend } from 'resend'
import { quizQuestions } from '@/lib/quiz/questions'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendBirthPlanEmailOptions {
  to: string
  name: string
  pdfBuffer: Buffer
  unsureTopics: string[]
}

export async function sendBirthPlanEmail({
  to,
  name,
  pdfBuffer,
  unsureTopics,
}: SendBirthPlanEmailOptions) {
  // Get the question titles for unsure topics
  const unsureQuestionTitles = unsureTopics
    .map((topic) => quizQuestions.find((q) => q.id === topic)?.title)
    .filter(Boolean)

  // Build personalized upsell message if they have unsure topics
  const upsellSection = unsureQuestionTitles.length > 0
    ? `
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #92400e; margin-top: 0;">Still researching some decisions?</h3>
        <p style="color: #78350f;">
          We noticed you marked ${unsureQuestionTitles.length} decision${unsureQuestionTitles.length > 1 ? 's' : ''} as needing more research:
        </p>
        <ul style="color: #78350f;">
          ${unsureQuestionTitles.map((title) => `<li>${title}</li>`).join('')}
        </ul>
        <p style="color: #78350f;">
          Our <strong>Birth Plan Research Guide</strong> gives you balanced pros and cons
          for each decision, with citations to medical research so you can make informed choices.
        </p>
        <a href="https://birthplanbuilder.com/guide"
           style="display: inline-block; background-color: #92400e; color: white;
                  padding: 12px 24px; text-decoration: none; border-radius: 6px;
                  font-weight: bold;">
          Get the Research Guide ($39)
        </a>
      </div>
    `
    : ''

  const { data, error } = await resend.emails.send({
    from: 'Birth Plan Builder <noreply@birthplanbuilder.com>',
    to: [to],
    subject: `${name}, Your Birth Plan is Ready!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4a5a5; margin-bottom: 5px;">Birth Plan Builder</h1>
          </div>

          <h2 style="color: #333;">Hi ${name}!</h2>

          <p>
            Your personalized birth plan is ready! We've attached it as a PDF that you can
            print or share with your care team.
          </p>

          <div style="background-color: #f8f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #d4a5a5;">What's next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Print a few copies for your hospital bag</li>
              <li>Share with your partner and support person</li>
              <li>Discuss with your provider at your next visit</li>
              <li>Remember, it's okay if plans change - this is a starting point</li>
            </ul>
          </div>

          ${upsellSection}

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Questions or feedback? Just reply to this email.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

          <p style="color: #999; font-size: 12px; text-align: center;">
            Birth Plan Builder | <a href="https://birthplanbuilder.com" style="color: #d4a5a5;">birthplanbuilder.com</a>
            <br>
            This is not medical advice. Always consult with your healthcare provider.
          </p>

        </body>
      </html>
    `,
    attachments: [
      {
        filename: 'Birth-Plan.pdf',
        content: pdfBuffer.toString('base64'),
      },
    ],
  })

  if (error) {
    console.error('Email send error:', error)
    throw new Error('Failed to send email')
  }

  return data
}
