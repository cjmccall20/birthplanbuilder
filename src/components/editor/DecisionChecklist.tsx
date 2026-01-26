'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
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
  isSelected?: boolean
  isExpanded: boolean
  onToggleExpand: () => void
}

function DecisionItem({ preference, sectionId, isSelected, isExpanded, onToggleExpand }: DecisionItemProps) {
  const { state, setPreference } = useEditor()
  const itemRef = useRef<HTMLDivElement>(null)
  const [showLearnMore, setShowLearnMore] = useState(false)

  // Auto-expand and scroll into view when selected
  useEffect(() => {
    if (isSelected && !isExpanded) {
      onToggleExpand()
    }
    if (isSelected) {
      // Scroll into view after a brief delay to allow expansion
      setTimeout(() => {
        itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [isSelected, isExpanded, onToggleExpand])

  const section = state.sections[sectionId]
  const value = section?.preferences.find(p => p.preferenceId === preference.id)
  const isIncluded = !value?.isOmitted
  const selectedOption = preference.options.find(o => o.value === value?.selectedOption)

  // Get the text that will appear in the birth plan PDF
  const defaultBirthPlanText = selectedOption?.birthPlanText || ''
  const currentBirthPlanText = value?.customText || defaultBirthPlanText
  const hasCustomText = value?.customText && value.customText !== defaultBirthPlanText

  const handleToggle = (checked: boolean) => {
    setPreference(sectionId, preference.id, { isOmitted: !checked })
  }

  const handleSelectOption = (optionValue: string) => {
    setPreference(sectionId, preference.id, {
      selectedOption: optionValue,
      customText: undefined, // Clear custom text when selecting a new option
      isOmitted: false
    })
  }

  const handleCustomTextChange = (text: string) => {
    setPreference(sectionId, preference.id, {
      customText: text || undefined
    })
  }

  const handleResetToDefault = () => {
    setPreference(sectionId, preference.id, {
      customText: undefined
    })
  }

  return (
    <div
      ref={itemRef}
      className={cn(
        'border rounded-lg transition-all',
        isIncluded ? 'bg-white border-border' : 'bg-muted/30 border-dashed opacity-60',
        isSelected && 'ring-2 ring-primary ring-offset-2'
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
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-medium text-sm">{preference.title}</h4>
            {selectedOption && isIncluded && (
              <Badge variant="secondary" className="text-xs">
                {selectedOption.label}
              </Badge>
            )}
            {hasCustomText && (
              <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                Customized
              </Badge>
            )}
          </div>
          {isIncluded && currentBirthPlanText && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              &ldquo;{currentBirthPlanText}&rdquo;
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
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Options & Custom Text */}
      {isExpanded && (
        <div className="border-t bg-muted/20 p-3 space-y-4">
          {/* Option Selection */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Select an option:</p>
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

          {/* Learn More Section */}
          {preference.description && preference.description.length > 100 && (
            <div className="pt-2 border-t">
              <button
                onClick={() => setShowLearnMore(!showLearnMore)}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span className="font-medium">Learn more</span>
                {showLearnMore ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {showLearnMore && (
                <div className="mt-2 p-3 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {preference.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Custom Text Editor */}
          {selectedOption && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Customize the text for your birth plan:
                </p>
                {hasCustomText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={handleResetToDefault}
                  >
                    Reset to default
                  </Button>
                )}
              </div>
              <textarea
                value={currentBirthPlanText}
                onChange={(e) => handleCustomTextChange(e.target.value)}
                placeholder={defaultBirthPlanText}
                className={cn(
                  'w-full min-h-[80px] p-3 rounded-md border bg-white text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                  'placeholder:text-muted-foreground/50'
                )}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This is the exact text that will appear in your birth plan PDF.
              </p>
            </div>
          )}
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
  selectedPreferenceId?: string | null
  expandedItemId: string | null
  onToggleItem: (itemId: string) => void
}

function SectionGroup({
  sectionId,
  title,
  icon,
  preferences,
  defaultExpanded = true,
  selectedPreferenceId,
  expandedItemId,
  onToggleItem
}: SectionGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const { state } = useEditor()

  // Auto-expand section if it contains the selected preference
  const hasSelectedPreference = selectedPreferenceId && preferences.some(p => p.id === selectedPreferenceId)

  // Effect to auto-expand when a preference in this section is selected
  useEffect(() => {
    if (hasSelectedPreference && !isExpanded) {
      setIsExpanded(true)
    }
  }, [hasSelectedPreference, selectedPreferenceId])

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
                isSelected={selectedPreferenceId === preference.id}
                isExpanded={expandedItemId === preference.id}
                onToggleExpand={() => onToggleItem(preference.id)}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

interface DecisionChecklistProps {
  selectedPreferenceId?: string | null
  onClearSelection?: () => void
}

export function DecisionChecklist({ selectedPreferenceId, onClearSelection }: DecisionChecklistProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyIncluded, setShowOnlyIncluded] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)
  const { state } = useEditor()

  // Reset expanded item when tab changes
  useEffect(() => {
    setExpandedItemId(null)
  }, [activeTab])

  // Handler for toggling item expansion (accordion behavior)
  const handleToggleItem = (itemId: string) => {
    setExpandedItemId(prev => prev === itemId ? null : itemId)
  }

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

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary/10">
            All
          </TabsTrigger>
          {EDITOR_SECTIONS.map(section => (
            <TabsTrigger key={section.id} value={section.id} className="data-[state=active]:bg-primary/10">
              <IconDisplay name={section.icon} className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline text-xs">{section.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Sections Tab */}
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <SectionGroup
                key={section.id}
                sectionId={section.id}
                title={section.title}
                icon={section.icon}
                preferences={section.preferences}
                defaultExpanded={index === 0}
                selectedPreferenceId={selectedPreferenceId}
                expandedItemId={expandedItemId}
                onToggleItem={handleToggleItem}
              />
            ))}
          </div>
          {sections.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No decisions match your search.</p>
            </div>
          )}
        </TabsContent>

        {/* Individual Section Tabs */}
        {EDITOR_SECTIONS.map(section => {
          const filteredPreferences = getPreferencesBySection(section.id).filter(pref => {
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

          return (
            <TabsContent key={section.id} value={section.id} className="mt-4">
              <SectionGroup
                sectionId={section.id}
                title={section.title}
                icon={section.icon}
                preferences={filteredPreferences}
                defaultExpanded={true}
                selectedPreferenceId={selectedPreferenceId}
                expandedItemId={expandedItemId}
                onToggleItem={handleToggleItem}
              />
              {filteredPreferences.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No decisions match your search.</p>
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
