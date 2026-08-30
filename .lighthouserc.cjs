module.exports = {
  ci: {
    collect: {
      // LHCI will spin up its own preview server before collecting.
      startServerCommand: 'pnpm --filter @frontend-arch-poc/shell preview --port 4174',
      url: ['http://localhost:4174'],
      numberOfRuns: 3,
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Google defaults for Core Web Vitals (mobile-first defaults from LHCI)
        // Budget targets: LCP < 2500ms, CLS < 0.1, TBT < 200ms (INP not in LHCI 0.14 audits)
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        // Overall category thresholds
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        // Loosen a few noisy defaults that don't apply to a demo shell
        'csp-xss': 'off',
        'is-on-https': 'off',
        'redirects-http': 'off',
        'uses-http2': 'off',
        // INP not tracked by LHCI 0.14 audits (auditRan=0) - budget target documented, assertion off
        'interaction-to-next-paint': 'off',
        // NaN audits: not applicable to a static shell without LCP image or animations
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off',
        // SEO audits not relevant for a demo shell (no robots.txt, no meta description)
        'meta-description': 'off',
        'robots-txt': 'off',
        // unused-javascript: demo shell has some tree-shaking gaps, tracked as warn not error
        'unused-javascript': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
