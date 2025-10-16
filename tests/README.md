# Comprehensive Test Suite - South Africa Quiz

This directory contains a complete test suite for the Fairtrade Africa Quiz application, covering responsive design, performance, and tracking verification across all popular devices and browsers in South Africa.

## Test Files

### 1. `responsive-usability.spec.js` (361 lines)
Tests the entire user experience across all devices:
- **Landing Page**: Load times, responsive layout, touch targets (44x44px minimum)
- **Quiz Flow**: Navigation, answer selection, fullpage.js scrolling
- **Result Page**: Form display, mobile keyboards, form submission
- **Performance**: Page load under 5 seconds, no console errors, image loading
- **Accessibility**: Semantic HTML, keyboard navigation

### 2. `performance.spec.js` (280+ lines)
Advanced performance metrics and optimization checks:
- **Page Load**: DOM content loaded < 3 seconds across all pages
- **Resource Optimization**: JS < 2MB, CSS < 500KB, images < 500KB each
- **Network Performance**: < 100 requests total, no failed requests, caching headers
- **Core Web Vitals**: FCP < 2s, LCP < 2.5s, CLS < 0.1

### 3. `tracking.spec.js` (330+ lines)
Verifies all analytics scripts load correctly:
- **Google Tag Manager** (GTM-KB2G5XF)
- **Facebook Pixel** (368869985423322)
- **Microsoft Clarity** (tmm5h0wrk6)
- **Lucky Orange** (47375252)
- **LinkedIn Insight Tag** (7862545)
- **Privacy**: Async loading, no blocking, no errors

## Device Coverage (20+ Configurations)

### Desktop Browsers
- Chrome (1920x1080)
- Firefox (1920x1080)
- Safari (1920x1080)

### Budget Android (Most Common in SA)
- Generic Budget Android (360x640, 2x pixel density)
- Budget Android with 3G simulation (slow network testing)

### Mid-Range Android
- Samsung Galaxy A-series (412x915) - **Very popular in South Africa**
- Samsung Internet Browser (custom user agent)

### Premium Android
- Samsung Galaxy S23 (360x800, 3x pixel density)

### iPhones
- iPhone 13
- iPhone 13 Pro
- iPhone 14
- iPhone SE

### Tablets
- iPad (gen 7)
- iPad Pro 11
- Android Tablet (768x1024)

### Special Cases
- Small Screen Portrait (320x568) - Older devices
- Landscape Mode (915x412)

## Running Tests

### Run All Tests
```bash
npm test
```
This runs all tests across all 20+ device/browser combinations. Takes 15-30 minutes.

### Run Specific Test Suites
```bash
# Only responsive and usability tests
npm run test:responsive

# Only performance tests
npm run test:performance

# Only tracking verification tests
npm run test:tracking
```

### Run Specific Device Types
```bash
# Only mobile devices (Android + iPhone)
npm run test:mobile

# Only desktop browsers
npm run test:desktop
```

### Interactive Testing
```bash
# Visual UI mode - see tests running in browser
npm run test:ui

# Headed mode - see browser automation
npm run test:headed

# Debug mode - step through tests
npm run test:debug
```

### View Test Reports
```bash
# Generate and open HTML report
npm run test:report
```

## Test Output

Tests generate multiple artifacts:

### Screenshots
- `test-results/landing-{device}.png` - Landing page on each device
- `test-results/quiz-start-{device}.png` - Quiz page
- `test-results/quiz-answered-{device}.png` - After answer selection
- `test-results/form-filled-{device}.png` - Filled form
- `test-results/form-success-{device}.png` - Success state

### Reports
- `playwright-report/` - HTML report with pass/fail for each test
- `test-results/results.json` - JSON format for CI/CD integration

### Videos & Traces
- Videos captured on test failure
- Traces captured on first retry (for debugging)

## Understanding Test Results

### Expected Pass Rate
- **First Run**: 85-95% pass rate is normal
- **After Fixes**: 95-100% pass rate

### Common Failures

**Performance Tests**:
- Large images may fail the 500KB limit
- 3G simulation may timeout on slow networks
- Solution: Optimize images, reduce bundle size

**Responsive Tests**:
- Touch targets < 44px on some buttons
- Horizontal scroll on small screens
- Solution: Adjust CSS, increase button sizes

**Tracking Tests**:
- Ad blockers may block tracking scripts
- Corporate firewalls may block analytics
- Solution: Expected in some environments, not a real failure

## CI/CD Integration

Tests are configured for continuous integration:
- Retries: 2 attempts on CI, 1 locally
- Workers: 2 parallel on CI, unlimited locally
- Screenshots: Only on failure
- Videos: Only on failure

## Network Simulation

Tests include 3G network simulation for rural areas:
- Download: ~750 Kbps
- Upload: ~250 Kbps
- Latency: ~100ms
- Implemented via `slowMo: 100` and extended timeouts

## Performance Benchmarks

### Target Metrics (South Africa Market)
- **DOM Load**: < 3 seconds on 3G
- **Full Load**: < 5 seconds on 3G
- **Total JS**: < 2MB
- **Total CSS**: < 500KB
- **Images**: < 500KB each, prefer WebP/AVIF
- **Requests**: < 100 total

### Core Web Vitals Targets
- **FCP** (First Contentful Paint): < 2 seconds
- **LCP** (Largest Contentful Paint): < 2.5 seconds
- **CLS** (Cumulative Layout Shift): < 0.1

## Troubleshooting

### Tests Won't Run
```bash
# Install Playwright browsers
npx playwright install

# Install dependencies
npm install
```

### All Tests Failing
```bash
# Check if site is accessible
curl https://fta-quiz.vercel.app

# Run single test to debug
npm run test:debug
```

### Slow Test Execution
```bash
# Reduce parallelism
npm test -- --workers=1

# Run only one browser
npm test -- --project="Desktop Chrome"
```

## Contributing

When adding new tests:
1. Add to appropriate spec file
2. Follow existing test patterns
3. Include descriptive console.log for metrics
4. Set realistic timeouts (3-5 seconds for 3G)
5. Filter known third-party errors
6. Take screenshots for visual verification

## Live Testing URLs

- **Production**: https://fta-quiz.vercel.app
- **Landing**: https://fta-quiz.vercel.app/
- **Quiz**: https://fta-quiz.vercel.app/quiz
- **Result Example**: https://fta-quiz.vercel.app/result-3

---

**Last Updated**: 2025-10-08
**Playwright Version**: 1.56.0
**Total Tests**: 40+ across 20+ device configurations
