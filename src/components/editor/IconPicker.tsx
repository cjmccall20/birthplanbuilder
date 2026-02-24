'use client'

import { useState } from 'react'
import {
  Baby,
  Heart,
  Shield,
  Syringe,
  Scissors,
  Droplet,
  Eye,
  Pill,
  Clock,
  Users,
  Home,
  Activity,
  Camera,
  Coffee,
  Move,
  Lightbulb,
  Navigation,
  Wind,
  AlertCircle,
  AlertTriangle,
  Link,
  Database,
  Leaf,
  Sun,
  TestTube,
  Bath,
  HeartHandshake,
  Calendar,
  BookOpen,
  Moon,
  Music,
  MessageSquare,
  MapPin,
  Circle,
  CheckCircle2,
  XCircle,
  Stethoscope,
  Thermometer,
  Brain,
  Flower,
  Star,
  Sparkles,
  Cloud,
  Waves,
  User,
  UserPlus,
  HandHeart,
  Lamp,
  Armchair,
  Bed,
  Phone,
  Gift,
  Play,
  Pause,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

// Stance shortcut icons shown first with special coloring
const STANCE_ICONS: { name: string; icon: LucideIcon; className: string }[] = [
  { name: 'CheckCircle2', icon: CheckCircle2, className: 'text-green-600' },
  { name: 'AlertTriangle', icon: AlertTriangle, className: 'text-amber-500' },
  { name: 'XCircle', icon: XCircle, className: 'text-red-500' },
]

const ICON_SET: { name: string; icon: LucideIcon }[] = [
  { name: 'Baby', icon: Baby },
  { name: 'Heart', icon: Heart },
  { name: 'Shield', icon: Shield },
  { name: 'Syringe', icon: Syringe },
  { name: 'Scissors', icon: Scissors },
  { name: 'Droplet', icon: Droplet },
  { name: 'Eye', icon: Eye },
  { name: 'Pill', icon: Pill },
  { name: 'Clock', icon: Clock },
  { name: 'Users', icon: Users },
  { name: 'Home', icon: Home },
  { name: 'Activity', icon: Activity },
  { name: 'Camera', icon: Camera },
  { name: 'Coffee', icon: Coffee },
  { name: 'Move', icon: Move },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'Navigation', icon: Navigation },
  { name: 'Wind', icon: Wind },
  { name: 'AlertCircle', icon: AlertCircle },
  { name: 'Link', icon: Link },
  { name: 'Database', icon: Database },
  { name: 'Leaf', icon: Leaf },
  { name: 'Sun', icon: Sun },
  { name: 'TestTube', icon: TestTube },
  { name: 'Bath', icon: Bath },
  { name: 'HeartHandshake', icon: HeartHandshake },
  { name: 'Calendar', icon: Calendar },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Moon', icon: Moon },
  { name: 'Music', icon: Music },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'MapPin', icon: MapPin },
  { name: 'Stethoscope', icon: Stethoscope },
  { name: 'Thermometer', icon: Thermometer },
  { name: 'Brain', icon: Brain },
  { name: 'Flower', icon: Flower },
  { name: 'Star', icon: Star },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Cloud', icon: Cloud },
  { name: 'Waves', icon: Waves },
  { name: 'User', icon: User },
  { name: 'UserPlus', icon: UserPlus },
  { name: 'HandHeart', icon: HandHeart },
  { name: 'Lamp', icon: Lamp },
  { name: 'Armchair', icon: Armchair },
  { name: 'Bed', icon: Bed },
  { name: 'Phone', icon: Phone },
  { name: 'Gift', icon: Gift },
  { name: 'Play', icon: Play },
  { name: 'Pause', icon: Pause },
]

const iconMap: Record<string, LucideIcon> = Object.fromEntries(
  [...STANCE_ICONS, ...ICON_SET].map(({ name, icon }) => [name, icon])
)

export function getIconComponent(name: string): LucideIcon {
  return iconMap[name] || Circle
}

interface IconPickerProps {
  value?: string
  onChange: (iconName: string) => void
  className?: string
}

// Standalone icon grid (no Popover wrapper) for embedding in custom popovers
interface IconGridProps {
  value?: string
  onChange: (iconName: string) => void
}

export function IconGrid({ value, onChange }: IconGridProps) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-2">Choose an icon</p>
      <div className="grid grid-cols-8 gap-1">
        {STANCE_ICONS.map(({ name, icon: Icon, className: stanceClassName }) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={cn(
              'h-8 w-8 rounded flex items-center justify-center transition-colors',
              'hover:bg-muted',
              value === name && 'bg-primary/10 ring-1 ring-primary'
            )}
            title={name}
          >
            <Icon className={cn('h-4 w-4', stanceClassName)} />
          </button>
        ))}
        {ICON_SET.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={cn(
              'h-8 w-8 rounded flex items-center justify-center transition-colors',
              'hover:bg-muted',
              value === name && 'bg-primary/10 ring-1 ring-primary'
            )}
            title={name}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  )
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false)

  const CurrentIcon = value ? getIconComponent(value) : Circle

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('h-9 w-9 p-0', className)}
          title="Choose icon"
        >
          <CurrentIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3" align="start">
        <IconGrid
          value={value}
          onChange={(iconName) => {
            onChange(iconName)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
