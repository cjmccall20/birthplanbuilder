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

  // Build personalized upsell message with guide content
  const unsureSection = unsureQuestionTitles.length > 0
    ? `
      <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <p style="color: #92400e; font-weight: 600; margin: 0 0 8px 0;">
          You marked ${unsureQuestionTitles.length} decision${unsureQuestionTitles.length > 1 ? 's' : ''} as needing more research:
        </p>
        <ul style="color: #78350f; margin: 0; padding-left: 20px;">
          ${unsureQuestionTitles.map((title) => `<li style="margin-bottom: 4px;">${title}</li>`).join('')}
        </ul>
      </div>
    `
    : ''

  // Guide topics list
  const guideTopics = [
    'Choosing Your Birth Setting — Hospital vs. birth center vs. home',
    'Understanding Birth Modes — Vaginal birth vs. cesarean section',
    'Pain Management Options — From natural techniques to epidurals',
    'When to Go to the Hospital — Timing your arrival perfectly',
    'Fetal Monitoring — Continuous vs. intermittent monitoring',
    'GBS & Antibiotics — Group B Strep testing and treatment',
    'Skin-to-Skin & Golden Hour — The critical first 60 minutes',
    'Cord Clamping Timing — When to clamp and why it matters',
    'Vitamin K & Eye Ointment — Newborn procedures explained',
    'Hepatitis B Vaccine — Birth dose considerations',
    'Circumcision (for boys) — The research and considerations',
  ]

  const upsellSection = `
    <div style="background: linear-gradient(to bottom right, rgba(212, 165, 165, 0.1), rgba(251, 243, 219, 0.5)); padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid rgba(212, 165, 165, 0.2);">
      <h2 style="color: #333; margin: 0 0 8px 0; font-size: 20px;">
        📚 The Birth Decisions Research Guide
      </h2>
      <p style="color: #666; margin: 0 0 16px 0; font-style: italic;">
        What They Don't Tell You at the Hospital
      </p>

      ${unsureSection}

      <blockquote style="border-left: 4px solid rgba(212, 165, 165, 0.5); padding-left: 16px; margin: 16px 0; color: #555; font-style: italic;">
        "Your decisions matter. The choices you make during pregnancy and childbirth <em>do</em> lead to different outcomes.
        This isn't about blame—it's about information. It's about going into one of the most significant experiences
        of your life with your eyes open."
      </blockquote>

      <h4 style="color: #333; margin: 16px 0 8px 0;">What You'll Get:</h4>
      <ul style="color: #555; margin: 0 0 16px 0; padding-left: 20px;">
        <li><strong>Both sides of every decision</strong> — what your doctor will recommend AND what they often don't mention</li>
        <li><strong>Research citations you can verify</strong> — bring them to your provider for an informed conversation</li>
        <li><strong>The BRAIN framework</strong> — how to evaluate any intervention in the moment (Benefits, Risks, Alternatives, Intuition, Nothing/wait)</li>
      </ul>

      <h4 style="color: #333; margin: 16px 0 8px 0;">Your Complete Journey:</h4>
      <table style="width: 100%; border-collapse: collapse;">
        ${guideTopics.map((topic, i) => `
          <tr>
            <td style="padding: 4px 0; color: #555; font-size: 14px;">
              ${i + 1}. ${topic}
            </td>
          </tr>
        `).join('')}
      </table>

      <p style="text-align: center; margin: 20px 0 8px 0; font-weight: 600; color: #333;">
        The goal—the only goal that really matters—is a healthy baby and a healthy mom.
      </p>
      <p style="text-align: center; color: #666; font-size: 14px; margin: 0 0 20px 0;">
        But "healthy" means more than survival. It means a mother who feels respected and heard.
        A family that emerges feeling empowered rather than traumatized.
      </p>

      <div style="text-align: center;">
        <a href="https://birthplanbuilder.com/guide"
           style="display: inline-block; background-color: #d4a5a5; color: white;
                  padding: 14px 32px; text-decoration: none; border-radius: 8px;
                  font-weight: bold; font-size: 16px;">
          Get the Research Guide — $39
        </a>
        <p style="color: #888; font-size: 12px; margin: 8px 0 0 0;">
          Instant PDF Download • Save hours of research
        </p>
      </div>
    </div>
  `

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
