'use client'

import { LearnMoreData } from '@/lib/quiz/questions'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertTriangle, BookOpen, ArrowRight, Lightbulb } from 'lucide-react'

interface QuizLearnMoreProps {
  data: LearnMoreData
}

export function QuizLearnMore({ data }: QuizLearnMoreProps) {
  return (
    <div className="space-y-4">
      {/* Trade-off summary callout */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">{data.tradeoff}</p>
          </div>
        </CardContent>
      </Card>

      {/* Two-column pros/cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            Potential Benefits
          </Badge>
          <ul className="space-y-2">
            {data.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Things to Consider
          </Badge>
          <ul className="space-y-2">
            {data.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-800">
                One Thing to Remember
              </Badge>
            </div>
          </div>
          <p className="text-sm font-medium text-amber-900 mt-2 leading-relaxed">
            {data.bottomLine}
          </p>
        </CardContent>
      </Card>

      {/* Ebook chapter upsell */}
      {data.ebookChapter && (
        <a
          href="https://birthplanbuilder.com/guide"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors"
        >
          <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
          <span>
            Want the full research? See <strong>{data.ebookChapter}</strong> in our Research Guide
          </span>
          <ArrowRight className="h-3 w-3 text-primary flex-shrink-0 ml-auto" />
        </a>
      )}
    </div>
  )
}
