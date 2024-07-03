import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('no color scheme', () => {
  test.beforeEach(async ({ goto }) => {
    await goto('/', { waitUntil: 'hydration' })
  })

  test('initial is light color mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass('light-mode')
  })

  test('toggle color mode sets class to dark', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle' }).click()

    await expect(page.locator('html')).toHaveClass('dark-mode')
  })
})

test.describe('dark color scheme', () => {
  test.use({ colorScheme: 'dark' })
  test.use({ extraHTTPHeaders: { 'sec-ch-prefers-color-scheme': 'dark' } })

  test.beforeEach(async ({ goto }) => {
    await goto('/', { waitUntil: 'hydration' })
  })

  test('initial is light color mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass('dark-mode')
  })

  test('toggle color mode sets class to dark', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle' }).click()

    await expect(page.locator('html')).toHaveClass('light-mode')
  })
})

test.describe('light color scheme', () => {
  test.use({ colorScheme: 'light' })
  test.use({ extraHTTPHeaders: { 'sec-ch-prefers-color-scheme': 'light' } })

  test.beforeEach(async ({ goto }) => {
    await goto('/', { waitUntil: 'hydration' })
  })

  test('initial is light color mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveClass('light-mode')
  })

  test('toggle color mode sets class to dark', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle' }).click()

    await expect(page.locator('html')).toHaveClass('dark-mode')
  })
})
