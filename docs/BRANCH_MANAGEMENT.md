# Branch Management Guide

This document explains the branching strategy and provides guidance on managing branches in the StickGPT repository.

## Current Branch Structure

### Main Branch
- **`main`** - The primary branch containing stable, production-ready code
  - All features are merged here after review
  - Protected branch (recommended)
  - Always in a deployable state

### Feature Branches

Feature branches follow the pattern: `copilot/<feature-description>`

These branches are created by GitHub Copilot agent for specific tasks:
- Short-lived (deleted after merge)
- Created from `main`
- Merged back to `main` via Pull Request

## Recent History

### Completed Work

1. **`copilot/comprehensive-ui-ux-rebrand`** (PR #1)
   - Status: Closed (not merged)
   - Task: Initial comprehensive rebrand attempt
   - Outcome: Superseded by PR #2
   - **Action:** Can be safely deleted

2. **`copilot/rebrand-stickgpt-ui-ux`** (PR #2)
   - Status: Merged to `main`
   - Task: Rebrand to StickGPT with black/white design
   - Outcome: Successfully merged
   - **Action:** Can be safely deleted

3. **`copilot/investigate-build-issues`** (PR #3)
   - Status: Active
   - Task: Fix build failures and document branch management
   - Outcome: In progress
   - **Action:** Will be merged when complete

## Branch Lifecycle

### 1. Creation
```bash
# Branches are typically created from main
git checkout main
git pull origin main
git checkout -b copilot/feature-name
```

### 2. Development
- Make changes and commit regularly
- Keep branch focused on specific task
- Push to origin frequently

### 3. Pull Request
- Open PR when ready for review
- Link related issues
- Request reviews from team
- Address feedback

### 4. Merge
- Merge to `main` after approval
- Use "Squash and merge" for clean history
- Ensure all CI/CD checks pass

### 5. Cleanup
```bash
# After merge, delete the branch
git branch -d copilot/feature-name
git push origin --delete copilot/feature-name
```

## Why Multiple Branches?

You may notice several Copilot branches in the repository. This is normal and happens when:

1. **Iterative Development:** Initial attempts may be refined in subsequent branches
2. **Parallel Work:** Multiple features developed simultaneously
3. **Work in Progress:** Branches exist until their PRs are merged or closed

## Branch Cleanup Strategy

### When to Delete Branches

Delete branches that are:
- ✅ Successfully merged to `main`
- ✅ Closed without merging (superseded or abandoned)
- ✅ No longer needed for reference

### When to Keep Branches

Keep branches that are:
- ⏳ Have open Pull Requests
- ⏳ Still under active development
- 📌 Need to be referenced for future work

### Automatic Cleanup

You can configure GitHub to automatically delete branches after PR merge:

1. Go to Repository Settings → General
2. Scroll to "Pull Requests" section
3. Enable "Automatically delete head branches"

## Best Practices

### Naming Conventions

- Use descriptive names: `copilot/add-dark-mode`
- Use kebab-case: `feature/improve-search`
- Prefix by agent: `copilot/`, `feature/`, `bugfix/`, `hotfix/`

### Branch Hygiene

1. **Keep branches short-lived** (days, not weeks)
2. **One feature per branch** (focused changes)
3. **Regular sync with main** (rebase or merge)
4. **Delete after merge** (reduce clutter)

### Protection Rules

Consider protecting the `main` branch:
- Require pull request reviews
- Require status checks to pass
- Restrict who can push
- Require signed commits

## Viewing Branches

### List All Branches
```bash
# Local branches
git branch

# All branches (local and remote)
git branch -a

# With last commit info
git branch -v
```

### On GitHub
Navigate to your repository's branches page in the GitHub UI

## Troubleshooting

### Too Many Branches?

If you have many stale branches:

```bash
# List merged branches (safe to delete)
git branch --merged main

# Delete merged branches locally
git branch --merged main | grep -v "main" | xargs git branch -d

# Delete on remote (be careful!)
# Verify each branch before deleting
git push origin --delete branch-name
```

### Lost Changes?

If you accidentally delete a branch:

```bash
# Find the commit SHA
git reflog

# Recreate the branch
git checkout -b branch-name <commit-sha>
```

## Summary

**Current State:**
- 4 branches total (1 main + 3 feature)
- 2 branches can be cleaned up after verification
- This is normal during active development

**Recommendations:**
1. Delete merged branches regularly
2. Enable automatic branch deletion on GitHub
3. Keep `main` protected
4. Use descriptive branch names
5. Review and close stale PRs

## Questions?

For questions about specific branches:
- Check the associated Pull Request
- Review commit history
- Ask in PR comments or issues
