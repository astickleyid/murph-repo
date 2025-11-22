# Build Troubleshooting Guide

This document outlines common build issues and their solutions for the StickGPT project.

## Common Build Issues

### 1. Google Fonts Fetch Failure

**Issue:** Build fails with error:
```
getaddrinfo ENOTFOUND fonts.googleapis.com
Failed to fetch `Inter` from Google Fonts
```

**Cause:** The build environment cannot access external font services (fonts.googleapis.com) due to firewall restrictions or network configuration.

**Solution (Implemented):** 
- Changed from `next/font/google` to using system fonts
- Updated `tailwind.config.ts` to use a comprehensive system font stack
- Removed Google Font imports from `app/layout.tsx`

The font stack now includes:
- Inter (if installed locally)
- System fonts: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.

**Benefits:**
- ✅ No external network requests during build
- ✅ Faster builds
- ✅ Better performance (no font downloads)
- ✅ Consistent appearance using system fonts

### 2. Peer Dependency Conflicts

**Issue:** `npm install` fails with peer dependency errors:
```
ERESOLVE could not resolve
peer react@"^18.0.0" from cmdk@1.0.0
```

**Cause:** The project uses React 19, but some dependencies (like `cmdk@1.0.0`) specify React 18 as a peer dependency.

**Solution (Already Documented):**
Use the `--legacy-peer-deps` flag when installing:
```bash
npm install --legacy-peer-deps
```

This flag allows npm to bypass peer dependency checks. The packages still work correctly with React 19.

### 3. Supabase Edge Runtime Warnings

**Issue:** Build shows warnings:
```
A Node.js API is used (process.version) which is not supported in the Edge Runtime
```

**Cause:** Supabase client uses Node.js APIs that aren't available in Next.js Edge Runtime.

**Impact:** ⚠️ Warning only - does not affect build success. Routes using Supabase will run in Node.js runtime instead of Edge Runtime.

**Solution:** 
- If Edge Runtime is not required, warnings can be safely ignored
- Routes will automatically use Node.js runtime when needed

## Build Commands

### Standard Build
```bash
npm run build
```

### Development Build
```bash
npm run dev
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## CI/CD Considerations

When setting up CI/CD pipelines:

1. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Quality Checks:**
   ```bash
   npm run lint
   npm run typecheck
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Environment Setup:**
   - No external network access needed for fonts
   - Ensure all required environment variables are set
   - Consider using a lockfile for reproducible builds

## GitHub Copilot Agent Builds

When GitHub Copilot agents build the project:

- Firewall rules may block external font services
- Use system fonts as implemented in this project
- The `--legacy-peer-deps` flag should be used for installations
- Build warnings about Edge Runtime can be safely ignored

## Branch Management

### Active Branches

The repository uses feature branches for development:
- `main` - Production-ready code
- `copilot/*` - GitHub Copilot agent feature branches

### Branch Cleanup

After merging PRs, consider:
1. Deleting merged feature branches to reduce clutter
2. Keeping only active development branches
3. Using branch protection rules on `main`

### Recommended Workflow

1. Create feature branch from `main`
2. Develop and test changes
3. Open PR and review
4. Merge to `main` after approval
5. Delete feature branch after merge
