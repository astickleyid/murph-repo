# Supabase Setup Instructions

## Apply Bookmarks Migration

To enable bookmarks functionality, you need to run the SQL migration in your Supabase project:

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT_ID
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `migrations/create_bookmarks_table.sql`
5. Paste into the SQL editor
6. Click **Run** to execute

### Option 2: Supabase CLI

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Run the migration
supabase db push
```

## Verify Installation

After running the migration, verify the table was created:

1. Go to **Table Editor** in Supabase dashboard
2. You should see a new `bookmarks` table
3. Check that RLS (Row Level Security) is enabled

## Features

Once set up, users can:
- Bookmark messages from any conversation
- View all bookmarks at `/bookmarks`
- Delete bookmarks they no longer need
- Bookmarks are automatically filtered by user (RLS policies ensure users only see their own)

## Troubleshooting

If you get an error about missing `auth.users`:
- Make sure you have authentication enabled in your Supabase project
- The migration creates a foreign key to `auth.users(id)`

If RLS policies aren't working:
- Check that you're logged in (auth.uid() must return a valid UUID)
- Verify the policies were created in the **Authentication > Policies** section
