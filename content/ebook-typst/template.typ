// Birth Plan Builder eBook Template
// Production-ready template with coral aesthetic
// ============================================

// ===================
// COLOR PALETTE
// ===================
#let coral-primary = rgb("#FF6B6B")
#let coral-light = rgb("#FF8A8A")
#let coral-dark = rgb("#E85555")
#let cream-bg = rgb("#FFF8F0")
#let body-text = rgb("#333333")
#let secondary-text = rgb("#666666")
#let light-gray = rgb("#F5F5F5")
#let medium-gray = rgb("#E0E0E0")
#let white = rgb("#FFFFFF")

// ===================
// TYPOGRAPHY SETTINGS
// ===================
#let body-font = ("Source Serif 4",)
#let heading-font = ("Source Sans 3",)
#let body-size = 11pt

// ===================
// BOOK METADATA
// ===================
#let book-title = state("book-title", "Your Birth Plan Guide")
#let current-chapter = state("current-chapter", "")

// ===================
// CALLOUT BOX
// ===================
// For "One-Page Overview" and similar highlighted sections
#let callout(title: none, icon: none, body) = {
  block(
    width: 100%,
    inset: (left: 16pt, right: 16pt, top: 14pt, bottom: 14pt),
    radius: 6pt,
    fill: cream-bg,
    stroke: (left: 4pt + coral-primary, top: 0pt, right: 0pt, bottom: 0pt),
    [
      #if title != none {
        block(
          below: 10pt,
          text(
            font: heading-font,
            size: 13pt,
            weight: "bold",
            fill: coral-dark,
            [#if icon != none { icon + " " }#title]
          )
        )
      }
      #set text(size: 10.5pt)
      #body
    ]
  )
}

// Alias for one-page overview sections
#let one-page-overview(body) = {
  callout(title: "One-Page Overview", body)
}

// ===================
// PULL QUOTE
// ===================
#let pull-quote(body, attribution: none) = {
  v(1em)
  block(
    width: 100%,
    inset: (left: 24pt, right: 24pt, top: 8pt, bottom: 8pt),
    [
      #block(
        width: 100%,
        stroke: (left: 3pt + coral-primary),
        inset: (left: 16pt),
        [
          #text(
            size: 14pt,
            style: "italic",
            fill: secondary-text,
            body
          )
          #if attribution != none {
            v(6pt)
            align(right)[
              #text(size: 10pt, fill: secondary-text, weight: "medium")[— #attribution]
            ]
          }
        ]
      )
    ]
  )
  v(1em)
}

// ===================
// PART HEADER
// ===================
// Visual section divider for grouping chapters in the TOC
#let part-header(title) = [
  #heading(level: 1, outlined: true, bookmarked: true, title) <part-heading>
]

// ===================
// PART INTRO
// ===================
// Summary text that appears below a part header on the same page
#let part-intro(body) = {
  align(center)[
    #block(width: 80%)[
      #set text(size: 11pt, fill: secondary-text)
      #set par(leading: 0.8em, justify: true)
      #body
    ]
  ]
  v(3fr)
  pagebreak()
}

// ===================
// "OUR TAKE" SECTION
// ===================
#let our-take(body) = {
  v(0.8em)
  block(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#FFF0F0"),
    stroke: 1pt + coral-light,
    [
      #block(
        below: 8pt,
        text(
          font: heading-font,
          size: 12pt,
          weight: "bold",
          fill: coral-dark,
          [◆ Our Take]
        )
      )
      #set text(size: 10.5pt)
      #body
    ]
  )
  v(0.8em)
}

// ===================
// PROS/CONS TABLE
// ===================
#let pros-cons(pros: (), cons: ()) = {
  v(0.8em)
  block(
    width: 100%,
    [
      #table(
        columns: (1fr, 1fr),
        inset: 10pt,
        stroke: 0.5pt + medium-gray,
        fill: (col, row) => {
          if row == 0 {
            if col == 0 { rgb("#E8F5E9") } else { rgb("#FFEBEE") }
          } else if calc.odd(row) {
            light-gray
          } else {
            white
          }
        },
        table.header(
          text(weight: "bold", fill: rgb("#2E7D32"), [✓ Pros]),
          text(weight: "bold", fill: rgb("#C62828"), [✗ Cons]),
        ),
        ..{
          let max-len = calc.max(pros.len(), cons.len())
          let cells = ()
          for i in range(max-len) {
            cells.push(if i < pros.len() { pros.at(i) } else { [] })
            cells.push(if i < cons.len() { cons.at(i) } else { [] })
          }
          cells
        }
      )
    ]
  )
  v(0.8em)
}

// ===================
// COMPARISON TABLE
// ===================
#let comparison-table(headers: (), rows: ()) = {
  v(0.8em)
  block(
    width: 100%,
    [
      #table(
        columns: headers.len() * (1fr,),
        inset: 10pt,
        stroke: 0.5pt + medium-gray,
        fill: (col, row) => {
          if row == 0 { cream-bg }
          else if calc.odd(row) { light-gray }
          else { white }
        },
        table.header(
          ..headers.map(h => text(weight: "bold", fill: coral-dark, h))
        ),
        ..rows.flatten()
      )
    ]
  )
  v(0.8em)
}

// ===================
// CITATION / REFERENCE
// ===================
#let citation(number) = {
  super(text(size: 8pt, fill: coral-primary, weight: "bold", [#number]))
}

#let citation-entry(number) = {
  super(text(size: 8pt, fill: coral-primary, weight: "bold", [#number]))
}

#let reference-list(refs) = {
  v(1.5em)
  block(
    width: 100%,
    above: 1em,
    [
      #line(length: 30%, stroke: 0.5pt + medium-gray)
      #v(0.5em)
      #text(size: 9pt, weight: "bold", fill: secondary-text)[References]
      #v(0.3em)
      #set text(size: 8.5pt, fill: secondary-text)
      #for (i, ref) in refs.enumerate() {
        [#super[#(i + 1)] #ref \ ]
      }
    ]
  )
}

// ===================
// FIGURE WITH CAPTION
// ===================
#let book-figure(img, caption: none, full-width: false) = {
  v(1em)
  figure(
    if full-width {
      block(width: 100%, img)
    } else {
      img
    },
    caption: if caption != none {
      text(size: 9.5pt, style: "italic", fill: secondary-text, caption)
    },
  )
  v(1em)
}

// Chapter opener image (full-width with special styling)
#let chapter-image(img) = {
  block(
    width: 100%,
    clip: true,
    radius: 4pt,
    img
  )
  v(1.5em)
}

// ===================
// TIP BOX
// ===================
#let tip-box(body) = {
  callout(title: "Tip", body)
}

// ===================
// WARNING BOX
// ===================
#let warning-box(body) = {
  block(
    width: 100%,
    inset: (left: 16pt, right: 16pt, top: 14pt, bottom: 14pt),
    radius: 6pt,
    fill: rgb("#FFF3E0"),
    stroke: (left: 4pt + rgb("#FF9800"), top: 0pt, right: 0pt, bottom: 0pt),
    [
      #block(
        below: 10pt,
        text(
          font: heading-font,
          size: 13pt,
          weight: "bold",
          fill: rgb("#E65100"),
          [⚠ Important]
        )
      )
      #set text(size: 10.5pt)
      #body
    ]
  )
}

// ===================
// CHECKLIST
// ===================
#let checklist(items) = {
  v(0.5em)
  for item in items {
    block(
      inset: (left: 0pt, bottom: 4pt),
      [#box(
        width: 12pt,
        height: 12pt,
        stroke: 1pt + secondary-text,
        radius: 2pt,
      ) #h(8pt) #item]
    )
  }
  v(0.5em)
}

// ===================
// DECORATIVE ELEMENTS
// ===================
#let chapter-divider() = {
  v(1em)
  align(center)[
    #box(height: 14pt, image("assets/floral-divider-left.svg", height: 14pt))
    #h(6pt)
    #box(height: 14pt, image("assets/floral-divider-right.svg", height: 14pt))
  ]
  v(1em)
}

#let section-line() = {
  v(0.8em)
  line(length: 100%, stroke: 0.5pt + medium-gray)
  v(0.8em)
}

// ===================
// MAIN PROJECT FUNCTION
// ===================
#let project(
  title: "",
  subtitle: "",
  authors: (),
  date: none,
  version: none,
  body,
) = {
  // Set book title for headers
  book-title.update(title)

  // Document metadata
  set document(author: authors, title: title)

  // ===================
  // PAGE SETUP
  // ===================
  set page(
    paper: "us-letter",
    margin: (left: 1.25in, right: 1.25in, top: 1in, bottom: 1in),

    // Running header
    header: context {
      let page-num = counter(page).get().first()
      if page-num > 1 {
        set text(size: 9pt, fill: secondary-text, font: heading-font)
        grid(
          columns: (1fr, auto),
          if calc.even(page-num) {
            align(left)[#current-chapter.get()]
          } else {
            align(left)[#book-title.get()]
          },
          align(right)[#text(fill: secondary-text)[#link(<toc>)[Table of Contents]]],
        )
        v(-4pt)
        line(length: 100%, stroke: 0.5pt + medium-gray)
      }
    },

    // Page numbers centered in footer with floral ornaments
    footer: context {
      let page-num = counter(page).get().first()
      if page-num > 1 {
        v(4pt)
        align(center)[
          #box(height: 10pt, image("assets/floral-divider-left.svg", height: 10pt))
          #h(8pt)
          #text(size: 9pt, fill: secondary-text, font: heading-font)[#page-num]
          #h(8pt)
          #box(height: 10pt, image("assets/floral-divider-right.svg", height: 10pt))
        ]
      }
    },
  )

  // ===================
  // TEXT & TYPOGRAPHY
  // ===================
  set text(
    font: body-font,
    size: body-size,
    fill: body-text,
    lang: "en",
    hyphenate: true,
  )

  // Paragraph formatting
  set par(
    justify: true,
    leading: 0.78em,
    first-line-indent: 0pt,
  )

  // Space between paragraphs
  show par: set block(spacing: 0.9em)

  // ===================
  // HEADING STYLES
  // ===================

  // Part headings (labeled with <part-heading>) - must come before general level 1 rule
  show <part-heading>: it => {
    // This is a part heading
    pagebreak()
    v(3fr)
    align(center)[
      #block(width: 60pt, height: 3pt, fill: coral-primary, radius: 1.5pt)
      #v(1.5em)
      #text(font: heading-font, size: 28pt, weight: "bold", fill: coral-primary)[#it.body]
      #v(0.5em)
      #block(width: 60pt, height: 3pt, fill: coral-primary, radius: 1.5pt)
    ]
    v(1.5em)
  }

  // Level 1: Chapters (force new page, large coral, decorative line)
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    // Update current chapter for headers
    current-chapter.update(it.body)

    v(2em)
    block(
      below: 0.8em,
      [
        #text(
          font: heading-font,
          size: 28pt,
          weight: "bold",
          fill: coral-primary,
          tracking: 0.5pt,
          it.body
        )
      ]
    )
    // Decorative line below chapter title
    block(
      width: 60pt,
      height: 3pt,
      fill: coral-primary,
      radius: 1.5pt,
    )
    v(1.5em)
  }

  // Level 2: Sections (18pt, dark gray with coral accent)
  show heading.where(level: 2): it => {
    v(1.5em)
    block(
      below: 0.8em,
      [
        #box(
          width: 4pt,
          height: 18pt,
          fill: coral-primary,
          radius: 2pt,
        )
        #h(10pt)
        #text(
          font: heading-font,
          size: 18pt,
          weight: "bold",
          fill: body-text,
          it.body
        )
      ]
    )
  }

  // Level 3: Subsections (14pt bold)
  show heading.where(level: 3): it => {
    v(1em)
    block(
      below: 0.6em,
      text(
        font: heading-font,
        size: 14pt,
        weight: "bold",
        fill: body-text,
        it.body
      )
    )
  }

  // Level 4: Minor headings
  show heading.where(level: 4): it => {
    v(0.8em)
    block(
      below: 0.4em,
      text(
        font: heading-font,
        size: 12pt,
        weight: "bold",
        fill: secondary-text,
        it.body
      )
    )
  }

  // ===================
  // LINKS
  // ===================
  show link: it => {
    text(fill: coral-dark, it)
  }

  // ===================
  // LISTS
  // ===================
  set list(
    marker: text(fill: coral-primary, [•]),
    indent: 1em,
    body-indent: 0.5em,
  )

  set enum(
    indent: 1em,
    body-indent: 0.5em,
  )

  show enum: set text(fill: body-text)

  // ===================
  // BLOCK QUOTES
  // ===================
  set quote(block: true)
  show quote: it => {
    block(
      inset: (left: 20pt, right: 12pt, top: 8pt, bottom: 8pt),
      stroke: (left: 2pt + coral-light),
      [
        #set text(style: "italic", fill: secondary-text)
        #it.body
      ]
    )
  }

  // ===================
  // TABLES
  // ===================
  set table(
    stroke: 0.5pt + medium-gray,
    inset: 8pt,
  )

  show table: set text(size: 10pt)

  // ===================
  // FIGURES
  // ===================
  show figure.caption: it => {
    set text(size: 9.5pt, style: "italic", fill: secondary-text)
    it
  }

  // ===================
  // RAW/CODE BLOCKS
  // ===================
  show raw.where(block: true): it => {
    block(
      width: 100%,
      inset: 12pt,
      radius: 4pt,
      fill: light-gray,
      stroke: 0.5pt + medium-gray,
      [
        #set text(font: "Menlo", size: 9pt)
        #it
      ]
    )
  }

  show raw.where(block: false): it => {
    box(
      inset: (x: 3pt, y: 0pt),
      outset: (y: 3pt),
      radius: 2pt,
      fill: light-gray,
      text(font: "Menlo", size: 9.5pt, it)
    )
  }

  // ===================
  // TITLE PAGE
  // ===================
  page(
    header: none,
    footer: none,
    margin: (x: 1.5in, y: 1.5in),
  )[
    #v(2fr)

    #align(center)[
      // Main title
      #block(
        below: 1.5em,
        text(
          font: heading-font,
          size: 36pt,
          weight: "bold",
          fill: coral-primary,
          tracking: 1pt,
          hyphenate: false,
          title
        )
      )

      // Subtitle
      #if subtitle != "" {
        block(
          below: 2em,
          text(
            font: heading-font,
            size: 16pt,
            fill: secondary-text,
            style: "italic",
            subtitle
          )
        )
      }

      // Decorative element
      #v(1em)
      #box(height: 18pt, image("assets/floral-divider-left.svg", height: 18pt))
      #h(12pt)
      #box(height: 18pt, image("assets/floral-divider-right.svg", height: 18pt))
      #v(2em)

      // Authors
      #if authors.len() > 0 {
        block(
          below: 1em,
          text(
            font: heading-font,
            size: 14pt,
            fill: body-text,
            authors.join(", ")
          )
        )
      }

      // Date and version
      #v(1em)
      #if date != none {
        text(font: heading-font, size: 11pt, fill: secondary-text, date)
      }
      #if version != none {
        v(0.3em)
        text(font: heading-font, size: 10pt, fill: secondary-text)[Version #version]
      }
    ]

    #v(3fr)
  ]

  // Reset page counter after title
  counter(page).update(1)

  // ===================
  // TABLE OF CONTENTS
  // ===================
  page(header: none)[
    #v(1em)
    #text(font: heading-font, size: 24pt, weight: "bold", fill: coral-primary)[Contents] <toc>
    #v(0.5em)
    #block(width: 40pt, height: 3pt, fill: coral-primary, radius: 1.5pt)
    #v(1em)

    // Style TOC entries: Part headers bold/coral, chapters indented below
    #show outline.entry.where(level: 1): it => {
      let el = it.element
      if el.has("label") and el.label == <part-heading> {
        // Part headers: bold, coral, extra spacing above
        v(1em)
        text(font: heading-font, size: 12pt, weight: "bold", fill: coral-dark)[#el.body]
        v(0.3em)
      } else {
        // Chapter entries: indented under their Part
        v(0.3em)
        h(1.5em)
        link(el.location())[
          #text(size: 10.5pt)[#el.body]
          #box(width: 1fr, repeat[#text(fill: medium-gray)[ . ]])
          #text(size: 10.5pt)[#context it.page()]
        ]
      }
    }

    #outline(
      title: none,
      indent: 1.5em,
      depth: 1,
    )
  ]

  // ===================
  // MAIN CONTENT
  // ===================
  body
}
