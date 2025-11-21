# NexusAI Brand Guidelines

## Brand Identity

### Name
**NexusAI** - Intelligent Search Reimagined

### Tagline
"Experience next-generation AI-powered search with beautiful generative UI. Ask anything, get intelligent answers instantly."

### Mission Statement
NexusAI reimagines AI-powered search with a focus on beautiful, intuitive design and comprehensive, intelligent answers. We combine cutting-edge AI technology with a modern, gradient-based aesthetic to create an exceptional search experience.

## Visual Identity

### Logo

The NexusAI logo features a friendly, approachable design with:
- Circular gradient background (purple to pink)
- Stylized face with expressive elements
- Smooth curves suggesting intelligence and accessibility
- Clean, modern aesthetic

**Usage:**
- Primary logo for headers, sidebars, and branding
- Animated on hover (scale-110 transform)
- Available with glow effect for special emphasis

### Color Palette

#### Primary Colors

**Purple Gradient Base**
```
Primary: hsl(263 70% 63%) - Vibrant Purple
Mid-point: hsl(280 70% 65%) - Violet
Accent: hsl(320 70% 63%) - Pink
```

**Usage Guidelines:**
- Use gradient for primary actions and branding elements
- Apply to buttons, links, and interactive components
- Text gradients for headlines and brand names

#### Light Mode
```
Background: hsl(0 0% 100%) - Pure White
Foreground: hsl(0 0% 3.9%) - Near Black
Card: hsl(0 0% 98%) - Off White
Muted: hsl(220 13% 95%) - Light Gray
Border: hsl(220 13% 91%) - Medium Gray
```

#### Dark Mode
```
Background: hsl(224 71% 4%) - Deep Blue-Black
Foreground: hsl(0 0% 98%) - Off White
Card: hsl(224 50% 8%) - Dark Blue
Muted: hsl(217 33% 17%) - Dark Gray
Border: hsl(217 33% 17%) - Border Gray
```

#### Semantic Colors
```
Success: Green (#10b981)
Error/Destructive: Red (hsl(0 62.8% 50.6%))
Warning: Orange (#f97316)
Info: Primary Purple
```

### Typography

#### Font Family
- **Primary**: Inter (sans-serif)
- **Variable**: `--font-sans`
- Clean, modern, highly legible

#### Hierarchy

**Headings:**
- H1: 2.5rem (40px), font-bold, often with gradient-text class
- H2: 2rem (32px), font-bold
- H3: 1.5rem (24px), font-semibold
- H4: 1.25rem (20px), font-semibold

**Body:**
- Base: 0.875rem (14px), font-normal
- Small: 0.75rem (12px)
- Large: 1rem (16px)

**Special:**
- Gradient text for brand elements: Use `gradient-text` class
- Muted text: Use `text-muted-foreground` for secondary information

### Design Elements

#### Gradients

**Primary Gradient**
```css
background: linear-gradient(135deg, 
  hsl(var(--gradient-start)) 0%, 
  hsl(var(--gradient-mid)) 50%, 
  hsl(var(--gradient-end)) 100%
);
```

**Usage:**
- Primary buttons and CTAs
- Logo and brand elements
- Accent decorations
- Gradient text for headlines

#### Glassmorphism

For overlay elements and special components:
```css
/* Light mode */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Dark mode */
.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Shadows

**Elevation System:**
- Level 1: `shadow-sm` - Subtle depth
- Level 2: `shadow-md` - Standard cards
- Level 3: `shadow-lg` - Elevated elements
- Level 4: `shadow-xl` - Floating elements
- Level 5: `shadow-2xl` - Modals and overlays

**Glow Effect:**
```css
.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}
```

#### Border Radius

**Standard Radius:**
- Default: 0.75rem (12px)
- Small: 0.5rem (8px)
- Large: 1rem (16px)
- Pill: 9999px (fully rounded)

### Animations & Transitions

#### Standard Transition
```css
.transition-all-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Hover Effects

**Buttons:**
- Opacity change (90%)
- Shadow elevation (md → lg)
- Scale on special buttons (scale-110)

**Cards:**
- Background color change
- Border color accent
- Shadow elevation
- Subtle scale (scale-102)

**Icons:**
- Scale transform (scale-110)
- Rotation effects (rotate-12)
- Translation (translate-x-1)

#### Loading States

Use `LoadingDots` component with primary color:
- Three bouncing dots
- Staggered animation delays
- Available in sm, md, lg sizes

### Component Styling

#### Buttons

**Primary (Default):**
- Gradient background
- White text
- Shadow elevation on hover
- Rounded corners

**Outline:**
- Transparent background
- Border with hover accent
- No shadow by default

**Ghost:**
- Transparent background
- Hover background accent
- No border

#### Cards

**Standard Card:**
- Rounded corners (0.75rem)
- Subtle shadow
- Border from theme
- Smooth transitions on all states

**Interactive Card:**
- Hover effects: shadow-lg, scale-102
- Border accent on hover
- Smooth transition

#### Input Fields

**Standard Input:**
- Rounded borders
- Muted background
- Focus ring with primary color
- Placeholder with muted foreground

**Chat Input:**
- Large, rounded (rounded-3xl)
- Muted/transparent background
- Shadow on hover
- Integrated controls

### Icons & Illustrations

#### Icon Style
- Lucide React icons (primary icon library)
- Size: 16px (sm), 20px (md), 24px (lg)
- Stroke width: 2px
- Rounded line caps and joins

#### Brand Icons
- IconLogo: Primary brand mark
- IconSparkles: Feature highlights
- Gradient fills for special emphasis

### Accessibility

#### Color Contrast
- Text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Clear focus states

#### Keyboard Navigation
- Tab navigation for all interactive elements
- Visual focus indicators
- Keyboard shortcuts with help overlay

#### Screen Readers
- ARIA labels on icon buttons
- Semantic HTML structure
- Skip links where appropriate

## Usage Examples

### Brand Name Display
```tsx
<span className="font-bold text-base gradient-text">NexusAI</span>
```

### Primary CTA Button
```tsx
<Button variant="default">Get Started</Button>
```

### Feature Badge
```tsx
<FeatureBadge variant="new">New</FeatureBadge>
<FeatureBadge variant="beta">Beta</FeatureBadge>
<FeatureBadge variant="pro">Pro</FeatureBadge>
```

### Gradient Heading
```tsx
<h1 className="text-4xl font-bold gradient-text">
  Welcome to NexusAI
</h1>
```

### Interactive Card
```tsx
<Card className="hover:shadow-lg hover:scale-[1.02] transition-all-smooth">
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## Don'ts

❌ Don't use competing color schemes (avoid red/orange primaries)
❌ Don't mix the old Morphic branding with NexusAI
❌ Don't use harsh, jarring animations
❌ Don't compromise accessibility for aesthetics
❌ Don't use custom fonts other than Inter
❌ Don't create gradients with more than 3 color stops
❌ Don't use pure black (#000) or pure white (#FFF) - use theme variables
❌ Don't override theme colors without good reason

## Implementation

All brand guidelines are implemented through:
- Tailwind CSS utilities and custom classes
- CSS custom properties (CSS variables)
- React components in `components/ui/`
- Global styles in `app/globals.css`

For questions or suggestions about brand guidelines, please open an issue on GitHub.

---

**Last Updated:** November 2025
**Version:** 1.0.0
