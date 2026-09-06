import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { page.setDefaultTimeout(12000); });

async function current(page, name) {
  await expect.poll(() => page.evaluate(() => ({
    name: window.demo?.getCurrentViewName(), busy: window.demo?.app.blockEvents,
  }))).toEqual({ name, busy: false });
}

async function idle(page) {
  await page.waitForFunction(() => window.demo && !window.demo.app.blockEvents);
}

function scene(page) { return page.locator('#demo .is-current-view'); }

async function open(page, name, view, keyboard = false) {
  await idle(page);
  const target = scene(page).getByRole('button', { name, exact: true });
  if (keyboard) { await target.focus(); await target.press('Enter'); }
  else await target.click();
  await current(page, view);
}

async function back(page, view) {
  await idle(page);
  await page.locator('#demo .z-back').click();
  await current(page, view);
}

async function capture(page, name, width, browserName) {
  await idle(page);
  await mkdir('output/qa', { recursive: true });
  await page.screenshot({ path: `output/qa/demo-${name}-${width}-${browserName}.png`, fullPage: true });
}

async function targetsAreReachable(page) {
  const result = await scene(page).locator('z-spot[to-view]').evaluateAll(spots => spots.map(spot => {
    const box = spot.getBoundingClientRect();
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    const hit = document.elementFromPoint(x, y);
    return {
      name: spot.getAttribute('aria-label'),
      withinViewport: box.left >= -1 && box.right <= innerWidth + 1 && box.top >= -1 && box.bottom <= innerHeight + 1,
      receivesPointer: Boolean(hit && (hit === spot || spot.contains(hit))),
    };
  }));
  expect(result.length).toBeGreaterThan(0);
  for (const target of result) expect(target, `Navigation target ${target.name}`).toMatchObject({ withinViewport: true, receivesPointer: true });
}

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  return errors;
}

test('real desktop demo covers the original journey and all six component examples', async ({ page, browserName }) => {
  test.setTimeout(90000);
  const errors = collectErrors(page);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await current(page, 'home');
  await targetsAreReachable(page);
  await expect(scene(page).locator('.home-circle')).toHaveCSS('border-radius', '50%');
  await capture(page, 'home', 1280, browserName);

  await open(page, 'Zoom me', 'solar');
  await scene(page).getByRole('button', { name: 'Pause orbits', exact: true }).click();
  await idle(page);
  await expect(scene(page).getByRole('button', { name: 'Play orbits', exact: true })).toBeVisible();
  await scene(page).getByRole('button', { name: 'Play orbits', exact: true }).click();
  await idle(page);
  await scene(page).getByRole('button', { name: 'Pause orbits', exact: true }).click();
  await idle(page);
  const speed = scene(page).locator('[data-speed] z-knob');
  await speed.focus();
  await speed.press('ArrowRight');
  await idle(page);
  await expect(speed).toHaveAttribute('aria-valuenow', '1.5');
  await expect(scene(page).locator('[data-speed]')).toHaveAttribute('qty', '1.5');
  await targetsAreReachable(page);
  await capture(page, 'solar', 1280, browserName);
  await open(page, 'Explore Sun', 'sun');
  await back(page, 'solar');
  await open(page, 'Explore Earth', 'earth');
  // The Moon is animated: keyboard activation exercises the supported focus path.
  await open(page, 'Explore Moon', 'moon', true);
  await back(page, 'earth');
  await back(page, 'solar');
  await back(page, 'home');

  await page.getByRole('button', { name: 'Components', exact: true }).click();
  await current(page, 'components');
  await targetsAreReachable(page);
  await capture(page, 'components', 1280, browserName);

  await open(page, 'Explore views', 'views');
  await expect(page.locator('#title')).toHaveText('Views');
  const viewContent = scene(page).locator(':scope > .z-surface-body > .z-content');
  await viewContent.hover();
  await page.mouse.wheel(0, 1000);
  await idle(page);
  await expect.poll(() => viewContent.evaluate(node => node.scrollTop)).toBeGreaterThan(0);
  await back(page, 'components');

  await open(page, 'Explore spots', 'spots');
  await scene(page).getByRole('button', { name: 'Increment counter', exact: true }).click();
  await idle(page);
  await scene(page).getByRole('button', { name: 'Increment counter', exact: true }).click();
  await idle(page);
  await expect(scene(page).locator('[data-count]')).toHaveText('2');
  await open(page, 'Explore nested Moon', 'moon');
  await back(page, 'spots');
  await expect(scene(page).locator('[data-count]')).toHaveText('2');
  await back(page, 'components');

  await open(page, 'Explore lists', 'lists');
  await scene(page).getByRole('button', { name: 'Page 2', exact: true }).click();
  await idle(page);
  await expect(scene(page).locator('z-list')).toHaveAttribute('page', '2');
  await scene(page).getByRole('button', { name: 'Select progress', exact: true }).click();
  await idle(page);
  await expect(scene(page).locator('strong').first()).toHaveText('progress');
  await back(page, 'components');

  await open(page, 'Explore controls', 'controls');
  const knob = scene(page).locator('z-knob');
  await knob.focus();
  await knob.press('End');
  await idle(page);
  await expect(scene(page)).toHaveAttribute('progress', '100');
  await expect(scene(page).locator('strong').first()).toHaveText('100%');
  await knob.press('Home');
  await idle(page);
  await knob.press('ArrowRight');
  await idle(page);
  await expect(scene(page)).toHaveAttribute('progress', '1');
  await back(page, 'components');

  await open(page, 'Explore dialogs', 'dialogs');
  const opener = scene(page).getByRole('button', { name: 'Open dialog', exact: true });
  await opener.focus();
  await opener.press('Enter');
  await idle(page);
  await expect(page.getByRole('dialog', { name: 'A Zircle dialog', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await idle(page);
  await expect(page.getByRole('dialog', { name: 'A Zircle dialog', exact: true })).toBeHidden();
  await expect(opener).toBeFocused();
  await back(page, 'components');

  await open(page, 'Explore themes', 'themes');
  await scene(page).getByRole('combobox', { name: 'Palette', exact: true }).selectOption('blue');
  await idle(page);
  await scene(page).getByRole('combobox', { name: 'Mode', exact: true }).selectOption('light');
  await idle(page);
  expect(await page.evaluate(() => ({ theme: window.demo.getTheme(), mode: window.demo.getMode() }))).toEqual({ theme: 'blue', mode: 'light' });
  await expect(page.locator('#demo .zumly-canvas')).toHaveAttribute('data-theme', 'blue');
  await expect(page.locator('#demo .zumly-canvas')).toHaveAttribute('data-mode', 'light');
  await back(page, 'components');
  await expect(page.locator('#error')).toBeHidden();
  expect(errors).toEqual([]);
});

for (const viewport of [{ width: 768, height: 1024 }, { width: 390, height: 844 }]) {
  test(`real demo remains reachable at ${viewport.width} × ${viewport.height}`, async ({ page, browserName }) => {
    test.setTimeout(45000);
    const errors = collectErrors(page);
    await page.setViewportSize(viewport);
    await page.goto('/');
    await current(page, 'home');
    await targetsAreReachable(page);
    await expect(scene(page).locator('.home-circle')).toHaveCSS('border-radius', '50%');
    await capture(page, 'home', viewport.width, browserName);
    await open(page, 'Zoom me', 'solar');
    await scene(page).getByRole('button', { name: 'Pause orbits', exact: true }).click();
    await idle(page);
    await targetsAreReachable(page);
    await capture(page, 'solar', viewport.width, browserName);
    await open(page, 'Explore Earth', 'earth');
    await open(page, 'Explore Moon', 'moon', true);
    await back(page, 'earth');
    await back(page, 'solar');
    await back(page, 'home');
    await page.getByRole('button', { name: 'Components', exact: true }).click();
    await current(page, 'components');
    await expect(scene(page).locator('z-spot[to-view]')).toHaveCount(6);
    await targetsAreReachable(page);
    await capture(page, 'components', viewport.width, browserName);
    await open(page, 'Explore lists', 'lists');
    await scene(page).getByRole('button', { name: 'Page 2', exact: true }).click();
    await idle(page);
    await scene(page).getByRole('button', { name: 'Select progress', exact: true }).click();
    await idle(page);
    await expect(scene(page).locator('strong').first()).toHaveText('progress');
    await back(page, 'components');
    await expect(page.locator('#error')).toBeHidden();
    expect(errors).toEqual([]);
  });
}
