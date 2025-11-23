# User Memory & Personalization System

A system to capture and store user preferences, interactions, and context for AI personalization.

## Features

- 🧠 **Flexible Memory Storage** - Store any user preference, interaction, or context
- 🎯 **Type-based Organization** - Organize memories by type (preference, interest, interaction, context)
- 🔒 **Secure with RLS** - Each user can only access their own memories
- ⚡ **Real-time Updates** - Memories update automatically with timestamps
- 🔍 **Searchable** - Full-text search across user memories
- 🤖 **AI Context** - Export user context for AI personalization

## Setup

### 1. Run SQL Migration

In Supabase SQL Editor, run:
```sql
-- See: supabase/migrations/create_user_memory_table.sql
```

This creates the `user_memory` table with:
- Flexible JSONB value storage
- Confidence scoring (0-1)
- Auto-updating timestamps
- Full-text search support
- Row Level Security (RLS)

### 2. Use in Your App

#### Example 1: Capture User Choice (like your Tesla vs Rivian example)

```tsx
import { ChoiceCapture } from '@/components/choice-capture'

<ChoiceCapture
  userId={user?.id}
  question="What aspect interests you most about Tesla vs Rivian?"
  choices={[
    { label: 'Vehicles (models, specs, range)', value: 'vehicles' },
    { label: 'Stock performance and financials', value: 'stock' },
    { label: 'Technology and innovation', value: 'technology' },
    { label: 'Company background and strategy', value: 'strategy' },
  ]}
  memoryKey="comparison_interest_tesla_rivian"
  context="Tesla vs Rivian comparison"
  onSelect={(value) => {
    // Do something with the selection
    console.log('User selected:', value)
  }}
/>
```

#### Example 2: Save Memory Programmatically

```tsx
import { useUserMemory } from '@/hooks/use-user-memory'

function MyComponent() {
  const { saveMemory } = useUserMemory(user?.id)
  
  const handleUserAction = async () => {
    await saveMemory(
      'interest',                    // type
      'topic_ai_development',        // key
      { topic: 'AI', level: 'high' }, // value (any JSON)
      'Asked about AI 3 times',      // context (optional)
      0.8                            // confidence 0-1 (optional)
    )
  }
}
```

#### Example 3: Get User Context for AI

```tsx
import { getUserContextForAI } from '@/lib/user-memory'

// In your AI chat handler:
const userContext = await getUserContextForAI(userId, 10) // Get last 10 memories

// Add to AI system prompt:
const systemPrompt = `
You are a helpful assistant.

${userContext}

Use the user context above to personalize your responses.
`
```

## Memory Types

- **`preference`** - User settings, choices, preferences
- **`interest`** - Topics, subjects user is interested in
- **`interaction`** - Past actions, clicks, searches
- **`context`** - Background info, conversation context

## API Functions

### `saveUserMemory(userId, type, key, value, context?, confidence?)`
Save or update a memory

### `getUserMemory(userId, key)`
Get a specific memory by key

### `getUserMemoriesByType(userId, type)`
Get all memories of a specific type

### `getAllUserMemories(userId)`
Get all memories for a user

### `deleteUserMemory(userId, key)`
Delete a specific memory

### `searchUserMemories(userId, searchTerm)`
Search user memories

### `getUserContextForAI(userId, limit?)`
Get formatted context string for AI prompts

## Example Use Cases

1. **Comparison Questions** - Remember what aspect user cares about (price, specs, etc.)
2. **Topic Interests** - Track topics user asks about frequently
3. **Style Preferences** - Remember if user prefers detailed vs. concise answers
4. **Context Retention** - Remember previous conversations for continuity
5. **Personalization** - Adapt UI/responses based on user behavior

## Database Schema

```sql
user_memory {
  id: UUID
  user_id: UUID (FK to auth.users)
  memory_type: TEXT ('preference' | 'interest' | 'interaction' | 'context')
  key: TEXT (unique identifier like 'topic_ai' or 'comparison_choice')
  value: JSONB (flexible data storage)
  context: TEXT (optional description)
  confidence: DECIMAL (0-1, how confident we are)
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ (auto-updates)
  last_accessed: TIMESTAMPTZ (updates on read)
}
```

## Privacy

- Users can only access their own memories (RLS)
- Memories are deleted when user is deleted (CASCADE)
- No sensitive data should be stored in memories
- Always get user consent for personalization
