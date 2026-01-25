'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useEditor } from '@/lib/editor/context'
import { PREFERENCES, getPreferencesBySection } from '@/lib/editor/preferences'
import { EDITOR_SECTIONS } from '@/lib/editor/sections'
import {
  ChevronDown,
  ChevronRight,
  Check,
  Search,
  Filter,
  Circle,
  Users,
  MapPin,
  Clock,
  Clipboard,
  Camera,
  Heart,
  Activity,
  Syringe,
  Coffee,
  Move,
  Droplet,
  Lightbulb,
  Pill,
  Navigation,
  Wind,
  Shield,
  AlertCircle,
  Link,
  Scissors,
  Database,
  Leaf,
  Sun,
  Eye,
  TestTube,
  Bath,
  Baby,
  Home,
  HeartHandshake,
  Calendar,
  BookOpen,
  Moon,
  Music,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import type { EditorSectionId, PreferenceDefinition } from '@/lib/editor/editorTypes'

// Icon mapping - maps icon names from preferences to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Users,
  MapPin,
  Clock,
  Clipboard,
  Camera,
  Heart,
  Activity,
  Syringe,
  Coffee,
  Move,
  Droplet,
  Lightbulb,
  Pill,
  Navigation,
  Wind,
  Shield,
  AlertCircle,
  Link,
  Scissors,
  Database,
  Leaf,
  Sun,
  Eye,
  TestTube,
  Bath,
  Baby,
  Home,
  HeartHandshake,
  Calendar,
  BookOpen,
  Moon,
  Music,
  MessageSquare,
  Circle,
  Stethoscope: Activity,
  Building: Home,
  Ear: Activity,
  Milk: Coffee,
}

// Static icon component that doesn't trigger the "component created during render" warning
function IconDisplay({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Circle
  return <IconComponent className={className} />
}

interface DecisionItemProps {
  preference: PreferenceDefinition
  sectionId: EditorSectionId
}

function DecisionItem({ preference, sectionId }: DecisionItemProps) {
  const { state, setPreference } = useEditor()
  const [isExpanded, setIsExpanded] = useState(false)

  const section = state.sections[sectionId]
  const value = section?.preferences.find(p => p.preferenceId === preference.id)
  const isIncluded = !value?.isOmitted
  const selectedOption = preference.options.find(o => o.value === value?.selectedOption)

  const handleToggle = (checked: boolean) => {
    setPreference(sectionId, preference.id, { isOmitted: !checked })
  }

  const handleSelectOption = (optionValue: string) => {
    setPreference(sectionId, preference.id, {
      selectedOption: optionValue,
      isOmitted: false
    })
    setIsExpanded(false)
  }

  return (
    <div
      className={cn(
        'border rounded-lg transition-all',
        isIncluded ? 'bg-white border-border' : 'bg-muted/30 border-dashed opacity-60'
      )}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          isIncluded ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}>
          <IconDisplay name={preference.icon || 'Circle'} className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm truncate">{preference.title}</h4>
            {selectedOption && isIncluded && (
              <Badge variant="secondary" className="text-xs truncate max-w-[150px]">
                {selectedOption.label}
              </Badge>
            )}
          </div>
          {preference.description && (
            <p className="text-xs text-muted-foreground truncate">
              {preference.description}
            </p>
          )}
        </div>

        {/* Toggle + Expand */}
        <div className="flex items-center gap-2">
          <Switch
            checked={isIncluded}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-primary"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Options */}
      {isExpanded && (
        <div className="border-t bg-muted/20 p-3">
          <div className="grid gap-2">
            {preference.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className={cn(
                  'w-full text-left p-3 rounded-md border transition-all',
                  'hover:bg-muted/50',
                  value?.selectedOption === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent bg-white'
                )}
              >
                <div className="flex items-center gap-2">
                  {value?.selectedOption === option.value && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  )}
                  <div className={cn(
                    value?.selectedOption === option.value ? '' : 'ml-6'
                  )}>
                    <span className="font-medium text-sm">{option.label}</span>
                    {option.birthPlanText && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {option.birthPlanText}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface SectionGroupProps {
  sectionId: EditorSectionId
  title: string
  icon: string
  preferences: PreferenceDefinition[]
  defaultExpanded?: boolean
}

function SectionGroup({ sectionId, title, icon, preferences, defaultExpanded = true }: SectionGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const { state } = useEditor()

  const section = state.sections[sectionId]
  const includedCount = preferences.filter(p => {
    const value = section?.preferences.find(pv => pv.preferenceId === p.id)
    return !value?.isOmitted
  }).length

  return (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors py-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <IconDisplay name={icon} className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {includedCount} of {preferences.length} included
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{includedCount}/{preferences.length}</Badge>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            {preferences.map((preference) => (
              <DecisionItem
                key={preference.id}
                preference={preference}
                sectionId={sectionId}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export function DecisionChecklist() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyIncluded, setShowOnlyIncluded] = useState(false)
  const { state } = useEditor()

  // Group preferences by section
  const sections = useMemo(() => {
    return EDITOR_SECTIONS.map(section => ({
      ...section,
      preferences: getPreferencesBySection(section.id).filter(pref => {
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          const matchesTitle = pref.title.toLowerCase().includes(query)
          const matchesDesc = pref.description?.toLowerCase().includes(query) || false
          if (!matchesTitle && !matchesDesc) return false
        }

        // Filter by included status
        if (showOnlyIncluded) {
          const sectionState = state.sections[section.id]
          const value = sectionState?.preferences.find(p => p.preferenceId === pref.id)
          if (value?.isOmitted) return false
        }

        return true
      })
    })).filter(section => section.preferences.length > 0)
  }, [searchQuery, showOnlyIncluded, state.sections])

  const totalPreferences = PREFERENCES.length
  const includedCount = EDITOR_SECTIONS.reduce((acc, section) => {
    const sectionState = state.sections[section.id]
    const prefs = getPreferencesBySection(section.id)
    return acc + prefs.filter(p => {
      const value = sectionState?.preferences.find(pv => pv.preferenceId === p.id)
      return !value?.isOmitted
    }).length
  }, 0)

  return (
    <div className="space-y-4">
      {/* Header with stats and filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Your Birth Plan Decisions</h2>
          <p className="text-sm text-muted-foreground">
            {includedCount} of {totalPreferences} decisions included
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 min-h-[44px]"
            />
          </div>
          <Button
            variant={showOnlyIncluded ? 'default' : 'outline'}
            size="sm"
            className="min-h-[44px] gap-2"
            onClick={() => setShowOnlyIncluded(!showOnlyIncluded)}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">
              {showOnlyIncluded ? 'Showing Included' : 'Show All'}
            </span>
          </Button>
        </div>
      </div>

      {/* Section Groups */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <SectionGroup
            key={section.id}
            sectionId={section.id}
            title={section.title}
            icon={section.icon}
            preferences={section.preferences}
            defaultExpanded={index === 0}
          />
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No decisions match your search.</p>
        </div>
      )}
    </div>
  )
}
