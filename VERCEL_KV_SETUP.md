# Vercel KV Setup (3 Minutes)

Vercel KV is a Redis database built into Vercel. Super easy setup!

## Step 1: Create Vercel KV Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project: **murph-repo**
3. Go to **Storage** tab at the top
4. Click **Create Database**
5. Select **KV (Redis)**
6. Give it a name: `stickgpt-kv` or whatever
7. Click **Create**

## Step 2: Connect to Your Project

1. After creating, it'll ask **"Connect to project?"**
2. Select your **murph-repo** project
3. Click **Connect**
4. Done! Environment variables are automatically added

## Step 3: Enable Chat History

1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add one more variable:
   - Key: `ENABLE_SAVE_CHAT_HISTORY`
   - Value: `true`
3. Click **Save**

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

That's it! Chat history, bookmarks, and user memory will now persist in Redis!

---

## What You Get:

✅ **Chat history** - All conversations saved
✅ **Bookmarks** - Persist across devices
✅ **User memory** - AI remembers your preferences
✅ **Fast** - Redis is super fast
✅ **Free tier** - 10,000 commands/day free
✅ **Auto-scales** - Handles traffic automatically

---

## Alternative: Use localStorage (Current Setup)

If you prefer, the app works fine with localStorage (browser-only storage):
- ✅ No setup needed
- ✅ Works immediately
- ❌ Data is per-browser (not synced)
- ❌ Cleared if user clears browser data

With Vercel KV, data persists across all devices and browsers!
