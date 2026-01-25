'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'

interface CustomItemInputProps {
  onAdd: (title: string, text: string) => void
}

export function CustomItemInput({ onAdd }: CustomItemInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (title.trim() && text.trim()) {
      onAdd(title.trim(), text.trim())
      setTitle('')
      setText('')
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setText('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add custom item
      </Button>
    )
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="pt-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Add Custom Item</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-auto p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div>
              <Label htmlFor="custom-title" className="text-xs">
                Title
              </Label>
              <Input
                id="custom-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Music preferences"
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="custom-text" className="text-xs">
                Birth plan text
              </Label>
              <Textarea
                id="custom-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., We would like to play soft classical music during labor..."
                rows={3}
                className="text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!title.trim() || !text.trim()}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
