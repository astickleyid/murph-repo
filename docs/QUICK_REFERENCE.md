# Quick Reference Guide

> Fast answers to common questions about StickGPT development

## 🚀 Getting Started

### Install Dependencies
```bash
npm install --legacy-peer-deps
```
**Why `--legacy-peer-deps`?** React 19 is new; some packages still expect React 18. They work fine, just need this flag.

### Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

---

## 📋 Essential Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with Turbo mode |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Check code quality |
| `npm run typecheck` | Check TypeScript types |
| `npm run format` | Auto-format code |
| `npm run format:check` | Check formatting |

---

## 🔧 Environment Setup

### Minimum Required
```bash
OPENAI_API_KEY=sk-...          # From platform.openai.com
TAVILY_API_KEY=tvly-...        # From app.tavily.com
```

### Optional Features
```bash
# Chat History (requires Redis)
ENABLE_SAVE_CHAT_HISTORY=true
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Authentication (requires Supabase)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Sharing
NEXT_PUBLIC_ENABLE_SHARE=true
```

See `.env.local.example` for all options.

---

## 📁 Project Structure

```
app/               # Pages and API routes
├── api/          # Backend endpoints
├── auth/         # Auth pages
├── search/       # Search pages
└── share/        # Sharing pages

components/        # React components
├── artifact/     # Search results
├── sidebar/      # Navigation
└── ui/           # Reusable components

lib/              # Business logic
├── agents/       # AI agents
├── tools/        # AI tools
├── streaming/    # Stream handlers
└── supabase/     # Auth integration

docs/             # Documentation
public/           # Static assets
└── config/       # Configuration files
```

---

## 🔍 Common Tasks

### Add a New AI Model
1. Edit `public/config/models.json`
2. Add model configuration:
```json
{
  "id": "provider/model-name",
  "provider": "Display Name",
  "providerId": "provider",
  "enabled": true,
  "toolCallType": "native"
}
```
3. Set environment variable (e.g., `PROVIDER_API_KEY`)

### Add a New Search Tool
1. Create tool in `lib/tools/your-tool.ts`:
```typescript
import { tool } from 'ai'
import { z } from 'zod'

export const yourTool = tool({
  description: 'Tool description',
  parameters: z.object({
    query: z.string().describe('Search query')
  }),
  execute: async ({ query }) => {
    // Implementation
    return results
  }
})
```
2. Register in `lib/utils/registry.ts`

### Add a New Page
1. Create file in `app/your-page/page.tsx`
2. Export default React component
3. Next.js handles routing automatically

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
1. Did you run `npm install --legacy-peer-deps`?
2. Is Node.js version compatible? (v18+)
3. Are all required env vars set?

### Type Errors
```bash
npm run typecheck
```
Fix errors shown, then rebuild.

### ESLint Errors
```bash
npm run lint
```
Auto-fix most issues:
```bash
npm run lint -- --fix
```

### Dependency Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🔒 Security

### Current Status
- ✅ 0 exploitable vulnerabilities
- ⚠️ 5 low-risk vulnerabilities (don't affect app)
- ✅ All updates tested and verified

### Checking Security
```bash
npm audit
```

Most vulnerabilities are in:
- Features not used (file uploads)
- CLI tools not used
- Transitive dependencies

All safe for production.

---

## 🧪 Testing

### Run All Checks
```bash
# Quality checks (all must pass)
npm run lint
npm run typecheck
npm run build
```

### Before Committing
1. Run `npm run lint`
2. Run `npm run typecheck`
3. Test locally with `npm run dev`
4. Commit changes

### Before PR
1. Run `npm run build`
2. Check for any errors
3. Update documentation if needed
4. Test critical user flows

---

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy automatically

### Docker
```bash
# Build and run
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Environment Variables
Set these in your deployment platform:
- `OPENAI_API_KEY`
- `TAVILY_API_KEY`
- All other optional features you want

---

## 🔗 Important Links

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

## 💡 Pro Tips

### Development
- Use Turbo mode: `npm run dev` (already default)
- Hot reload works for most changes
- Check browser console for errors
- Use React DevTools for debugging

### Performance
- Images: Use next/image component
- Code splitting: Import components dynamically
- Caching: Leverage Next.js caching

### Code Style
- Use TypeScript types everywhere
- Follow existing patterns
- Run formatter before committing
- Keep components small and focused

---

## 🆘 Getting Help

### Documentation
1. Check this guide first
2. See `docs/COMPREHENSIVE_ANALYSIS.md` for deep dive
3. Check `docs/CONFIGURATION.md` for setup
4. See `docs/BUILD_TROUBLESHOOTING.md` for issues

### Common Questions

**Q: Why `--legacy-peer-deps`?**  
A: React 19 is new. Packages catching up. All work fine.

**Q: Why so many deprecated warnings?**  
A: npm warns about deprecated packages. We removed unused ones. Remaining are transitive dependencies that will update naturally.

**Q: Can I use yarn/pnpm?**  
A: Yes, but npm is officially supported and tested.

**Q: How do I add a new AI provider?**  
A: Install SDK, add to `public/config/models.json`, set API key.

**Q: Where are the tests?**  
A: No test framework yet. Run lint/typecheck/build to verify.

---

## 📊 Health Check

Quick way to verify everything works:

```bash
# Install
npm install --legacy-peer-deps

# Quality checks
npm run lint && npm run typecheck && npm run build

# If all pass: ✅ Ready to develop!
```

---

## 📝 Notes

- This is a modern stack (Next.js 15, React 19)
- Some warnings are expected (Supabase Edge Runtime)
- Build takes ~15 seconds (normal)
- First load is ~760KB (reasonable for AI app)

---

**Last Updated**: 2025-11-22  
**Version**: 1.0  
**For detailed info**: See `docs/COMPREHENSIVE_ANALYSIS.md`
