import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE INVESTIGATION TEST
 * This test will thoroughly investigate what happens when a user submits the form
 */

test('Full investigation of form submission flow', async ({ page }) => {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🔬 STARTING COMPREHENSIVE FORM INVESTIGATION');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Track all console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      console.log(`❌ BROWSER ERROR: ${text}`);
    } else if (msg.type() === 'warning') {
      console.log(`⚠️  BROWSER WARNING: ${text}`);
    }
  });

  // Track all network requests
  const networkRequests = [];
  page.on('request', request => {
    if (request.url().includes('api') || request.url().includes('klaviyo')) {
      console.log(`📤 REQUEST: ${request.method()} ${request.url()}`);
      networkRequests.push({
        type: 'request',
        method: request.method(),
        url: request.url(),
        postData: request.postData()
      });
    }
  });

  // Track all network responses
  page.on('response', async response => {
    if (response.url().includes('api') || response.url().includes('klaviyo')) {
      console.log(`📥 RESPONSE: ${response.status()} ${response.url()}`);
      let body = null;
      try {
        body = await response.json();
        console.log(`   Body: ${JSON.stringify(body)}`);
      } catch (e) {
        console.log(`   (non-JSON response)`);
      }
      networkRequests.push({
        type: 'response',
        status: response.status(),
        url: response.url(),
        body
      });
    }
  });

  // Step 1: Navigate to form
  console.log('\n📍 Step 1: Navigating to form page...');
  await page.goto('/result-3');
  console.log('✅ Page loaded');
  await page.waitForTimeout(1000);

  // Check if form is visible
  const formVisible = await page.locator('form').isVisible();
  console.log(`   Form visible: ${formVisible}`);

  // Step 2: Fill out form with unique email
  console.log('\n✍️  Step 2: Filling out form...');
  const testEmail = `investigation-${Date.now()}@example.com`;

  await page.fill('input[name="firstName"]', 'Investigation');
  console.log('   ✓ First name filled');

  await page.fill('input[name="lastName"]', 'Test');
  console.log('   ✓ Last name filled');

  await page.fill('input[name="email"]', testEmail);
  console.log(`   ✓ Email filled: ${testEmail}`);

  await page.selectOption('select[name="iAm"]', 'giveaway');
  console.log('   ✓ Business type selected');

  // Check checkbox state
  const checkboxChecked = await page.locator('input[name="wouldBuy"]').isChecked();
  console.log(`   ✓ Checkbox checked: ${checkboxChecked}`);

  // Take screenshot before submission
  await page.screenshot({ path: 'test-results/before-submit.png', fullPage: true });
  console.log('   📸 Screenshot saved: before-submit.png');

  // Step 3: Submit form
  console.log('\n🚀 Step 3: Submitting form...');
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();
  console.log('   ✓ Submit button clicked');

  // Wait and observe what happens
  await page.waitForTimeout(2000);

  // Check button state during loading
  const buttonText = await submitButton.textContent();
  console.log(`   Button text: "${buttonText}"`);

  // Step 4: Check for errors
  console.log('\n🔍 Step 4: Checking for errors...');
  const errorElement = page.locator('p[style*="color: red"]');
  const errorVisible = await errorElement.isVisible().catch(() => false);

  if (errorVisible) {
    const errorText = await errorElement.textContent();
    console.log(`   ❌ ERROR DISPLAYED: "${errorText}"`);
  } else {
    console.log('   ✅ No error message visible');
  }

  // Step 5: Check URL/redirect
  console.log('\n🌐 Step 5: Checking navigation...');
  const currentUrl = page.url();
  console.log(`   Current URL: ${currentUrl}`);

  if (currentUrl.includes('thanks-for-signing-up')) {
    console.log('   ✅ Redirected to thank-you page');

    // Check countdown
    const countdownText = await page.locator('p').filter({ hasText: 'redirected' }).textContent();
    console.log(`   Countdown message: "${countdownText}"`);

    // Take screenshot of thank you page
    await page.screenshot({ path: 'test-results/thank-you-page.png', fullPage: true });
    console.log('   📸 Screenshot saved: thank-you-page.png');

  } else if (currentUrl.includes('result-3')) {
    console.log('   ⚠️  STILL ON FORM PAGE - Something went wrong');
    await page.screenshot({ path: 'test-results/error-state.png', fullPage: true });
    console.log('   📸 Screenshot saved: error-state.png');
  } else {
    console.log(`   ⚠️  Unexpected URL: ${currentUrl}`);
  }

  // Step 6: Summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('📊 INVESTIGATION SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Network requests made: ${networkRequests.length}`);
  console.log(`Console messages: ${consoleMessages.length}`);
  console.log(`Errors found: ${consoleMessages.filter(m => m.type === 'error').length}`);
  console.log(`Final URL: ${currentUrl}`);
  console.log(`Error displayed: ${errorVisible ? 'YES' : 'NO'}`);

  // Print all network activity
  console.log('\n📋 NETWORK ACTIVITY LOG:');
  networkRequests.forEach((req, idx) => {
    console.log(`   ${idx + 1}. [${req.type.toUpperCase()}] ${req.method || req.status} ${req.url}`);
    if (req.body) {
      console.log(`      Response: ${JSON.stringify(req.body)}`);
    }
  });

  // Print console errors
  if (consoleMessages.filter(m => m.type === 'error').length > 0) {
    console.log('\n🐛 CONSOLE ERRORS:');
    consoleMessages.filter(m => m.type === 'error').forEach((msg, idx) => {
      console.log(`   ${idx + 1}. ${msg.text}`);
    });
  }

  console.log('\n═══════════════════════════════════════════════════════════\n');

  // Assert success conditions
  if (!errorVisible && currentUrl.includes('thanks-for-signing-up')) {
    console.log('✅ TEST PASSED: Form submitted successfully');
  } else {
    console.log('❌ TEST FAILED: Issues detected');
    throw new Error('Form submission did not complete successfully');
  }
});
