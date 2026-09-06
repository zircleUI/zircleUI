import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/fixture.html');
  await page.waitForFunction(() => window.testReady);
});

test('knob preserves decimal values, bounds and single input/change events', async ({ page }) => {
  await page.evaluate(() => {
    const knob = document.createElement('z-knob');
    knob.id = 'knob';
    knob.min = 0; knob.max = 5; knob.step = 0.25; knob.qty = 2.5; knob.unit = 'kg';
    knob.style.cssText = 'position:relative;width:120px;height:120px;--z-diameter:120px';
    window.values = [];
    for (const type of ['input', 'change']) knob.addEventListener(type, event => window.values.push({ type, ...event.detail }));
    document.querySelector('#app').append(knob);
  });
  const knob = page.locator('#knob');
  await expect(knob).toHaveAttribute('aria-valuetext', '2.5 kg');
  await expect(knob.locator('.z-knob-number')).toHaveText('2.5');
  await expect(knob.locator('.z-knob-unit')).toHaveText('kg');
  await knob.press('ArrowRight');
  await expect(knob).toHaveAttribute('qty', '2.75');
  expect(await page.evaluate(() => window.values)).toEqual([
    { type: 'input', value: 2.75, qty: 2.75 }, { type: 'change', value: 2.75, qty: 2.75 },
  ]);
  await knob.press('End');
  await knob.press('ArrowRight');
  await expect(knob).toHaveAttribute('aria-valuenow', '5');
  expect(await page.evaluate(() => window.values.length)).toBe(4);
  await knob.press('Home');
  await knob.press('PageUp');
  await expect(knob).toHaveAttribute('aria-valuenow', '2.5');
  await page.evaluate(() => { document.querySelector('#knob').max = 2; });
  await expect(knob).toHaveAttribute('aria-valuenow', '2');
  await page.evaluate(() => { document.querySelector('#knob').disabled = true; });
  await knob.press('ArrowLeft');
  await expect(knob).toHaveAttribute('aria-valuenow', '2');
  await expect(knob).toHaveAttribute('tabindex', '-1');
});

test('radial controls reconnect once and slider delegates drawing to Orbit', async ({ page }) => {
  await page.evaluate(() => {
    const app = document.querySelector('#app');
    const scroll = document.createElement('z-scroll');
    scroll.id = 'scroll'; scroll.scrollVal = -45;
    scroll.style.cssText = 'position:relative;width:120px;height:120px;--z-diameter:120px';
    window.scrollEvents = [];
    scroll.addEventListener('input', event => window.scrollEvents.push(event.detail));
    app.append(scroll); scroll.remove(); app.append(scroll);
    const slider = document.createElement('z-slider');
    slider.id = 'progress'; slider.progress = 150;
    slider.style.cssText = 'position:relative;width:120px;height:120px;--z-diameter:120px';
    app.append(slider);
  });
  const scroll = page.locator('#scroll');
  await scroll.press('ArrowRight');
  await expect(scroll).toHaveAttribute('aria-valuenow', '-44');
  expect(await page.evaluate(() => window.scrollEvents)).toEqual([{ value: -44, scrollVal: -44 }]);
  await scroll.press('End');
  await expect(scroll).toHaveAttribute('aria-valuenow', '45');
  const slider = page.locator('#progress');
  await expect(slider).toHaveAttribute('role', 'progressbar');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
  await expect(slider.locator('o-progress')).toHaveCount(1);
  await expect(slider.locator('o-progress')).toHaveAttribute('value', '100');
  await expect(slider.locator('o-progress .progress-bar')).toHaveAttribute('d', /M/);
  await page.evaluate(() => { document.querySelector('#progress').progress = -5; });
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
});

test('list pages remain local and keep authored nodes and event listeners', async ({ page }) => {
  await page.evaluate(() => {
    const app = document.querySelector('#app');
    window.itemClicks = 0;
    for (const id of ['first', 'second']) {
      const list = document.createElement('z-list');
      list.id = id; list.perPage = 2;
      for (let index = 0; index < 5; index++) {
        const spot = document.createElement('z-spot');
        spot.textContent = `${id} ${index}`;
        spot.dataset.item = String(index);
        spot.addEventListener('click', () => window.itemClicks++);
        list.append(spot);
        if (id === 'first' && index === 0) window.originalSpot = spot;
      }
      app.append(list);
    }
    window.pages = [];
    document.querySelector('#first').addEventListener('pagechange', event => window.pages.push(event.detail));
    document.querySelector('#first').next();
  });
  await expect(page.locator('#first z-spot:not([hidden])')).toHaveCount(2);
  await expect(page.locator('#first z-spot[data-item="2"]')).not.toHaveAttribute('hidden');
  await expect(page.locator('#second z-spot[data-item="0"]')).not.toHaveAttribute('hidden');
  await page.evaluate(() => { document.querySelector('#first').page = 3; });
  const last = page.locator('#first z-spot[data-item="4"]');
  await expect(last).toHaveAttribute('distance', '0');
  await expect(last).toHaveClass(/at-center/);
  await page.evaluate(() => {
    const list = document.querySelector('#first');
    list.page = 1;
    window.originalSpot.click();
    list.remove(); document.querySelector('#app').append(list);
  });
  expect(await page.evaluate(() => document.querySelector('#first z-spot') === window.originalSpot)).toBe(true);
  expect(await page.evaluate(() => window.itemClicks)).toBe(1);
  expect(await page.evaluate(() => window.pages.map(event => event.page))).toEqual([2, 3, 1]);
  await page.evaluate(() => {
    const list = document.querySelector('#first');
    list.page = 3;
    list.querySelector('[data-item="4"]').remove();
  });
  await expect.poll(() => page.evaluate(() => document.querySelector('#first').page)).toBe(2);
  await expect(page.locator('#first z-spot:not([hidden])')).toHaveCount(2);
});

test('list renderItem treats strings as text and reacts to data changes', async ({ page }) => {
  await page.evaluate(() => {
    const list = document.createElement('z-list');
    list.id = 'data-list'; list.perPage = 2;
    list.items = ['<img src=x onerror=alert(1)>', 'two', 'three'];
    document.querySelector('#app').append(list);
  });
  await expect(page.locator('#data-list z-spot')).toHaveCount(3);
  await expect(page.locator('#data-list img')).toHaveCount(0);
  await expect(page.locator('#data-list z-spot').first()).toContainText('<img src=x onerror=alert(1)>');
  await page.evaluate(() => {
    const list = document.querySelector('#data-list');
    list.renderItem = (item, index) => {
      const spot = document.createElement('z-spot');
      spot.textContent = `${index + 1}. ${item.title}`;
      return spot;
    };
    list.items = [{ title: 'updated' }];
  });
  await expect(page.locator('#data-list z-spot')).toHaveCount(1);
  await expect(page.locator('#data-list z-spot')).toContainText('1. updated');
  await expect(page.locator('#data-list .z-list-pagination')).toBeHidden();
});

test('dialog restores focus on Escape and disposes self-close timers', async ({ page }) => {
  await page.evaluate(() => {
    const app = document.querySelector('#app');
    const opener = document.createElement('button');
    opener.id = 'opener'; opener.textContent = 'Open';
    const dialog = document.createElement('z-dialog');
    dialog.id = 'dialog';
    const choice = document.createElement('button');
    choice.textContent = 'Choice'; choice.id = 'choice'; dialog.append(choice);
    window.dialogEvents = [];
    for (const type of ['open', 'close', 'done']) dialog.addEventListener(type, event => window.dialogEvents.push({ type, ...event.detail }));
    opener.addEventListener('click', () => dialog.show());
    app.append(opener, dialog);
  });
  // Use keyboard activation: Safari pointer clicks blur buttons before their handler.
  await page.locator('#opener').focus();
  await page.locator('#opener').press('Enter');
  await expect(page.locator('#dialog dialog')).toBeVisible();
  await expect(page.locator('#choice')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#dialog dialog')).not.toBeVisible();
  await expect(page.locator('#opener')).toBeFocused();
  await page.evaluate(() => { const dialog = document.querySelector('#dialog'); dialog.duration = 80; dialog.show(); });
  await expect.poll(() => page.evaluate(() => window.dialogEvents.filter(event => event.type === 'done').length)).toBe(1);
  await expect(page.locator('#dialog dialog')).not.toBeVisible();
  await page.evaluate(() => {
    const dialog = document.querySelector('#dialog'); dialog.duration = 80; dialog.show();
    dialog.remove(); window.detachedDialog = dialog;
  });
  await page.waitForTimeout(140);
  expect(await page.evaluate(() => window.dialogEvents.filter(event => event.type === 'done').length)).toBe(1);
  await page.evaluate(() => {
    window.detachedDialog.duration = 0;
    document.querySelector('#app').append(window.detachedDialog);
  });
  await expect(page.locator('#dialog dialog')).toBeVisible();
  await page.locator('#dialog .z-dialog-close').click();
  await expect(page.locator('#dialog dialog')).not.toBeVisible();
  expect(await page.evaluate(() => window.dialogEvents.filter(event => event.type === 'close').map(event => event.reason))).toEqual(['escape', 'timeout', 'button']);
});

test('cloned controls reuse their owned DOM instead of duplicating it', async ({ page }) => {
  await page.evaluate(() => {
    const app = document.querySelector('#app');
    for (const tag of ['z-knob', 'z-slider', 'z-list', 'z-dialog', 'z-pagination']) {
      const original = document.createElement(tag);
      if (tag === 'z-list') {
        original.append(document.createElement('z-spot'), document.createElement('z-spot'));
      }
      app.append(original);
      const clone = original.cloneNode(true);
      clone.id = `clone-${tag}`;
      app.append(clone);
    }
  });
  await expect(page.locator('#clone-z-knob > .z-control-orbit')).toHaveCount(1);
  await expect(page.locator('#clone-z-slider > .z-control-orbit')).toHaveCount(1);
  await expect(page.locator('#clone-z-list > .z-list-orbit')).toHaveCount(1);
  await expect(page.locator('#clone-z-list z-spot')).toHaveCount(2);
  await expect(page.locator('#clone-z-dialog dialog')).toHaveCount(1);
  await expect(page.locator('#clone-z-pagination button')).toHaveCount(1);
});

test('dialog preserves slot nodes and links its radial scrollbar to native content', async ({ page }) => {
  await page.evaluate(() => {
    const dialog = document.createElement('z-dialog');
    dialog.id = 'long-dialog';
    const body = document.createElement('div');
    body.style.height = '800px';
    body.textContent = 'Long dialog content';
    const button = document.createElement('button');
    button.id = 'inside-button'; button.textContent = 'Use content';
    window.contentClicks = 0;
    button.addEventListener('click', () => window.contentClicks++);
    body.prepend(button);
    dialog.append(body);
    for (const name of ['image', 'media', 'extension']) {
      const element = document.createElement('span');
      element.slot = name; element.id = `slot-${name}`;
      dialog.append(element);
    }
    document.querySelector('#app').append(dialog);
    dialog.show();
  });
  await expect(page.locator('#long-dialog .z-dialog-scroll')).toBeVisible();
  await expect(page.locator('#long-dialog .z-dialog-image-slot > #slot-image')).toHaveCount(1);
  await expect(page.locator('#long-dialog .z-dialog-media > #slot-media')).toHaveCount(1);
  await expect(page.locator('#long-dialog .z-dialog-extensions > #slot-extension')).toHaveCount(1);
  await page.locator('#long-dialog .z-dialog-scroll').press('End');
  await expect.poll(() => page.evaluate(() => {
    const content = document.querySelector('#long-dialog .z-dialog-content');
    return Math.abs(content.scrollTop - (content.scrollHeight - content.clientHeight));
  })).toBeLessThan(2);
  await page.locator('#long-dialog .z-dialog-scroll').press('Home');
  await expect.poll(() => page.evaluate(() => document.querySelector('#long-dialog .z-dialog-content').scrollTop)).toBe(0);
  await page.locator('#inside-button').click();
  expect(await page.evaluate(() => window.contentClicks)).toBe(1);
});

test('pagination exposes its original zero-based index through a native button', async ({ page }) => {
  await page.evaluate(() => {
    const pager = document.createElement('z-pagination');
    pager.id = 'pager'; pager.index = 2; pager.active = 1;
    window.paginationEvents = [];
    pager.addEventListener('change', event => window.paginationEvents.push(event.detail));
    document.querySelector('#app').append(pager);
    pager.remove(); document.querySelector('#app').append(pager);
  });
  const button = page.locator('#pager button');
  await expect(button).toHaveText('3');
  await button.press('Enter');
  expect(await page.evaluate(() => window.paginationEvents)).toEqual([{ index: 2, page: 3 }]);
  await page.evaluate(() => { const pager = document.querySelector('#pager'); pager.active = 2; pager.disabled = true; });
  await expect(button).toHaveAttribute('aria-current', 'page');
  await expect(button).toBeDisabled();
});

test('list page buttons follow the original lower arc and retain pointer and keyboard behavior', async ({ page }) => {
  await page.evaluate(() => {
    document.querySelector('#host').hidden = true;
    const list = document.createElement('z-list');
    list.id = 'arc-list'; list.size = 'xl'; list.perPage = 1;
    list.items = ['one', 'two', 'three', 'four', 'five'];
    document.querySelector('#app').append(list);
    window.arcPages = [];
    list.addEventListener('pagechange', event => window.arcPages.push(event.detail.page));
  });
  const pager = page.locator('#arc-list .z-list-pagination');
  await expect(pager).toHaveClass(/orbit-12/);
  await expect(pager.locator('button.satellite')).toHaveCount(5);
  const geometry = await pager.evaluate(nav => {
    const list = nav.parentElement.getBoundingClientRect();
    const x = list.x + list.width / 2, y = list.y + list.height / 2;
    return [...nav.children].map(button => {
      const box = button.getBoundingClientRect();
      const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
      return { x: cx, y: cy - y, radius: Math.hypot(cx - x, cy - y), left: box.left, right: box.right };
    });
  });
  for (const button of geometry) {
    expect(button.y).toBeGreaterThan(0);
    expect(button.radius).toBeCloseTo(170, 0);
  }
  expect(geometry[2].y - geometry[0].y).toBeGreaterThan(30);
  expect(geometry[0].y).toBeCloseTo(geometry[4].y, 0);
  for (let index = 1; index < geometry.length; index++) expect(geometry[index].left).toBeGreaterThan(geometry[index - 1].right);
  await pager.getByRole('button', { name: 'Page 3', exact: true }).press('Enter');
  await expect(page.locator('#arc-list')).toHaveAttribute('page', '3');
  await expect(pager.getByRole('button', { name: 'Page 3', exact: true })).toBeFocused();
  await pager.getByRole('button', { name: 'Page 5', exact: true }).click();
  await expect(page.locator('#arc-list')).toHaveAttribute('page', '5');
  await expect(page.locator('#arc-list z-spot:not([hidden])')).toHaveAttribute('distance', '0');
  await pager.getByRole('button', { name: 'Page 1', exact: true }).click();
  expect(await page.evaluate(() => window.arcPages)).toEqual([3, 5, 1]);
});

test('larger lists keep a bounded lower-arc pager and preserve focus while its page window moves', async ({ page }) => {
  await page.evaluate(() => {
    document.querySelector('#host').hidden = true;
    const list = document.createElement('z-list');
    list.id = 'window-list'; list.size = 'xs'; list.perPage = 1;
    list.items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
    document.querySelector('#app').append(list);
  });
  const pager = page.locator('#window-list .z-list-pagination');
  await expect(pager.locator('button')).toHaveCount(7);
  await expect(pager.getByRole('button', { name: 'Previous page', exact: true })).toBeDisabled();
  const next = pager.getByRole('button', { name: 'Next page', exact: true });
  await next.focus();
  for (let number = 2; number <= 7; number++) {
    await next.press('Enter');
    await expect(page.locator('#window-list')).toHaveAttribute('page', String(number));
    await expect(next).toBeFocused();
  }
  await expect(pager.getByRole('button', { name: 'Page 7', exact: true })).toHaveAttribute('aria-current', 'page');
  const geometry = await pager.locator('button').evaluateAll(buttons => buttons.map(button => {
    const box = button.getBoundingClientRect();
    return { x: box.x + box.width / 2, y: box.y + box.height / 2, width: box.width };
  }));
  for (let index = 1; index < geometry.length; index++) {
    const previous = geometry[index - 1], current = geometry[index];
    expect(Math.hypot(current.x - previous.x, current.y - previous.y)).toBeGreaterThan(current.width + 2);
  }
  await pager.getByRole('button', { name: 'Page 9', exact: true }).click();
  await next.click();
  await expect(page.locator('#window-list')).toHaveAttribute('page', '10');
  await expect(next).toBeDisabled();
  await expect(pager.locator('button')).toHaveCount(7);
  await pager.getByRole('button', { name: 'Previous page', exact: true }).click();
  await expect(page.locator('#window-list')).toHaveAttribute('page', '9');
});
