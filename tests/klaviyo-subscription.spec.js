import { test, expect } from '@playwright/test';

/**
 * Klaviyo Subscription Form E2E Tests
 *
 * Tests the subscription form on the live site (https://fta-quiz.vercel.app/result-3)
 * All API calls to /api/subscribe are mocked to prevent actual Klaviyo submissions
 *
 * Run locally from your Mac:
 *   npm test              - Run all tests headless
 *   npm run test:ui       - Run with interactive UI
 *   npm run test:headed   - Run with visible browser
 */

test.describe('Klaviyo Subscription Form', () => {

  test('should successfully submit new subscription', async ({ page }) => {
    // Navigate to result page with form
    await page.goto('/result-3');

    // Fill out form fields
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', `test+${Date.now()}@example.com`);
    await page.selectOption('select[name="iAm"]', 'individual-interested');

    // Ensure checkbox is checked (it's default checked)
    await page.check('input[name="wouldBuy"]');

    // Mock successful API response
    // This prevents actual submission to Klaviyo
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Successfully subscribed to the giveaway!'
        }),
      });
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Verify redirect to thank you page
    await page.waitForURL('**/thanks-for-signing-up', { timeout: 10000 });
    expect(page.url()).toContain('/thanks-for-signing-up');
  });

  test('should handle duplicate email (409 already subscribed)', async ({ page }) => {
    await page.goto('/result-3');

    // Fill form with existing email
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'existing@example.com');
    await page.selectOption('select[name="iAm"]', 'giveaway');

    // Mock 409 response - API now treats this as success
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'You are already subscribed!'
        }),
      });
    });

    await page.click('button[type="submit"]');

    // Should still redirect on success (409 treated as success)
    await page.waitForURL('**/thanks-for-signing-up', { timeout: 10000 });
    expect(page.url()).toContain('/thanks-for-signing-up');
  });

  test('should display error message on API failure', async ({ page }) => {
    await page.goto('/result-3');

    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'Error');
    await page.fill('input[name="email"]', 'error@example.com');
    await page.selectOption('select[name="iAm"]', 'business-partnership');

    // Mock error response (500 Internal Server Error)
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal server error. Please try again later.'
        }),
      });
    });

    await page.click('button[type="submit"]');

    // Wait for error message to appear
    await page.waitForTimeout(1000);

    // Verify error message is displayed
    const errorMessage = page.locator('p[style*="color: red"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Internal server error');

    // Should NOT redirect on error
    expect(page.url()).toContain('/result-3');
  });

  test('should validate required email field', async ({ page }) => {
    await page.goto('/result-3');

    // Fill only name fields, leave email empty
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');

    // Attempt to submit without email
    await page.click('button[type="submit"]');

    // HTML5 validation should prevent submission
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');

    // Should still be on result page (validation prevented submit)
    await page.waitForTimeout(500);
    expect(page.url()).toContain('/result-3');
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.goto('/result-3');

    await page.fill('input[name="firstName"]', 'Loading');
    await page.fill('input[name="lastName"]', 'Test');
    await page.fill('input[name="email"]', 'loading@example.com');
    await page.selectOption('select[name="iAm"]', 'individual-interested');

    // Mock slow API response to test loading state
    await page.route('**/api/subscribe', async (route) => {
      // Delay response by 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Click submit button
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verify loading state appears
    await expect(submitButton).toHaveText('Submitting...');
    await expect(submitButton).toBeDisabled();

    // Wait for redirect after loading completes
    await page.waitForURL('**/thanks-for-signing-up', { timeout: 10000 });
  });

  test('should default checkbox to checked state', async ({ page }) => {
    await page.goto('/result-3');

    // Verify checkbox is checked by default
    const checkbox = page.locator('input[name="wouldBuy"]');
    await expect(checkbox).toBeChecked();
  });

  test('should submit all form fields and quiz data to API', async ({ page }) => {
    await page.goto('/result-3');

    let capturedRequest = null;

    // Intercept and capture the request payload
    await page.route('**/api/subscribe', async (route) => {
      const request = route.request();
      capturedRequest = request.postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    // Fill form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.selectOption('select[name="iAm"]', 'business-partnership');
    await page.check('input[name="wouldBuy"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for request to be captured
    await page.waitForTimeout(1000);

    // Verify request payload structure
    expect(capturedRequest).toBeTruthy();
    expect(capturedRequest.firstName).toBe('John');
    expect(capturedRequest.lastName).toBe('Doe');
    expect(capturedRequest.email).toBe('john.doe@example.com');
    expect(capturedRequest.customFields).toBeDefined();
    expect(capturedRequest.customFields.interested_in).toBe('business-partnership');
    expect(capturedRequest.customFields.would_buy_more).toBe(true);
  });

  test('should allow all business type options', async ({ page }) => {
    await page.goto('/result-3');

    // Test each dropdown option
    const options = [
      'individual-interested',
      'business-partnership',
      'giveaway',
      'individual-representing-business'
    ];

    for (const option of options) {
      await page.selectOption('select[name="iAm"]', option);
      const selectedValue = await page.locator('select[name="iAm"]').inputValue();
      expect(selectedValue).toBe(option);
    }
  });
});
