# Security Policy

## Recent Security Updates

### CVE-2025-55182: React2Shell Vulnerability (Fixed)

**Date Fixed:** December 9, 2025  
**Severity:** Critical (CVSS 10.0)  
**Status:** ✅ Resolved

#### Vulnerability Details

React2Shell is a critical unauthenticated remote code execution (RCE) vulnerability affecting React Server Components (RSC). The vulnerability arises from unsafe deserialization of payloads sent to Server Function endpoints in the RSC "Flight" protocol, allowing attackers to inject prototype pollution payloads that lead to arbitrary code execution.

#### Affected Versions

- React: 19.0.0 - 19.2.0
- Next.js: 15.x before 15.5.7, 16.x before 16.0.7

#### Fixed Versions

This repository has been updated to the following patched versions:

- **React:** 19.2.1
- **React-DOM:** 19.2.1
- **Next.js:** 15.5.7

#### Prevention

To prevent regression:

1. Do not downgrade React below version 19.2.1
2. Do not downgrade Next.js below version 15.5.7
3. Regularly run `npm audit` to check for known vulnerabilities
4. Keep dependencies up to date with security patches

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please report it by creating a private security advisory on GitHub or contacting the maintainers directly.

## Security Best Practices

1. **Dependency Management:**
   - Run `npm audit` regularly to check for vulnerabilities
   - Keep all dependencies up to date with the latest security patches
   - Review dependency updates before merging

2. **Development:**
   - Never commit secrets or API keys to the repository
   - Use environment variables for sensitive configuration
   - Follow secure coding practices

3. **Deployment:**
   - Use HTTPS for all production environments
   - Configure proper authentication and authorization
   - Enable security headers and CSP where appropriate

## References

- [React2Shell CVE-2025-55182 Details](https://www.averlon.ai/blog/react2shell-cve-2025-55182-explained)
- [Next.js Security Updates](https://github.com/vercel/next.js/security/advisories)
- [React Security Updates](https://github.com/facebook/react/security/advisories)
