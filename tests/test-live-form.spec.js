import { test, expect } from '@playwright/test';

test('check live form for errors', async ({ page }) => {
  console.log('🔍 Checking live form for errors...');

  await page.goto('/result-3');

  // Fill form
  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'User');
  await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
  await page.selectOption('select[name="iAm"]', 'giveaway');

  // Monitor console for errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console Error:', msg.text());
    }
  });

  // Monitor network requests
  page.on('response', async response => {
    if (response.url().includes('/api/subscribe')) {
      console.log('📥 API Response:', response.status());
      try {
        const body = await response.json();
        console.log('   Body:', JSON.stringify(body, null, 2));
      } catch (e) {
        console.log('   (unable to parse)');
      }
    }
  });

  // Submit
  await page.click('button[type="submit"]');

  // Wait and check for errors
  await page.waitForTimeout(3000);

  // Check if error message is displayed
  const errorMsg = await page.locator('p[style*="color: red"]').textContent().catch(() => null);
  if (errorMsg) {
    console.log('❌ ERROR MESSAGE DISPLAYED:', errorMsg);
  } else {
    console.log('✅ No error message');
  }

  // Check current URL
  const currentUrl = page.url();
  console.log('📍 Current URL:', currentUrl);

  if (currentUrl.includes('thanks-for-signing-up')) {
    console.log('✅ Redirected to success page');
  } else if (currentUrl.includes('result-3')) {
    console.log('⚠️  Still on form page - possible error');
  }

  // Take screenshot
  await page.screenshot({ path: 'test-results/live-form-check.png', fullPage: true });
  console.log('📸 Screenshot saved');
});
