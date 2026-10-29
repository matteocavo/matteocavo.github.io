const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3011/';
const records = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/projects.json'), 'utf8'));
const ids = ['fts-eu-grants','rome-mobility-intelligence','rome-transport','quaero','openbdap','streaming-benchmark','ispra-waste','streaming-metadata'];
async function settled(page, id) {
  await page.locator(`[id="${id}"]`).waitFor();
  await page.waitForFunction(id => {
    const target = document.getElementById(id), header = document.querySelector('header');
    const top = target?.getBoundingClientRect().top;
    return top >= header.getBoundingClientRect().bottom && top < 125;
  }, id, { timeout: 12000 });
}
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
      const context = await browser.newContext({ viewport, permissions: ['clipboard-read','clipboard-write'], isMobile: viewport.width<500, hasTouch: viewport.width<500 });
      let page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      // Use the real generated export, with latency to exercise post-fetch navigation.
      await context.route('**/data/projects.json', async route => { await new Promise(r => setTimeout(r, 150)); await route.fulfill({json:records}); });
      for (const id of ids) {
        await page.close(); page = await context.newPage();
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(`${base}#${id}`); await settled(page,id);
        assert.equal(await page.locator(`#${id}`).count(),1);
        assert.equal(await page.locator('article.featured-card').count(),8);
        assert.equal(await page.locator('article.featured-card').first().getAttribute('id'),'rome-mobility-intelligence');
        await page.reload(); await settled(page,id);
        await page.getByRole('button',{name:'EN',exact:true}).click();
        assert.equal(await page.locator(`#${id}`).count(),1);
        const card=page.locator(`#${id}`); const copy=card.getByRole('button',{name:/Copy portfolio case-study URL/});
        await copy.click(); await page.waitForFunction(()=>document.body.textContent.includes('Copied!'));
        assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),`https://matteocavo.github.io/#${id}`);
        console.log(`PASS ${viewport.width}px ${id}: fresh URL, reload, IT/EN, unique target, clipboard`);
      }
      // A filter may hide either project; navigation restores both filter dimensions.
      if(viewport.width<500) {
        await page.locator('#mobile-tech-filter-select').selectOption('Power BI');
        await page.locator('#mobile-obj-filter-select').selectOption('public-policy-open-data');
      } else {
        await page.getByRole('button',{name:'Power BI',exact:true}).click();
        await page.locator('#objective-filter-select').selectOption('public-policy-open-data');
      }
      assert.equal(await page.locator('#rome-mobility-intelligence').count(),0);
      await page.evaluate(()=>{location.hash='rome-mobility-intelligence';}); await settled(page,'rome-mobility-intelligence');
      assert.equal(await page.locator('article.featured-card').count(),8);
      await page.evaluate(()=>{location.hash='rome-transport';}); await settled(page,'rome-transport');
      await page.goBack(); await settled(page,'rome-mobility-intelligence');
      await page.goForward(); await settled(page,'rome-transport');
      await page.locator('#rome-transport').getByRole('link',{name:/Related case study/}).click(); await settled(page,'rome-mobility-intelligence');
      const rmi=page.locator('#rome-mobility-intelligence');
      for(const value of ['9,975,703','0.9565','0.7842','0.7991','0.7916','0.9717','0.8742']) assert(await rmi.innerText().then(t=>t.includes(value)));
      assert(await rmi.innerText().then(t=>t.includes('25,000')));
      assert.equal(await rmi.locator('a[href="https://matteocavo.github.io/rome-mobility-intelligence/"]').count(),1);
      assert.equal(await rmi.getByRole('link',{name:'GitHub',exact:true}).getAttribute('href'),'https://github.com/matteocavo/rome-mobility-intelligence');
      assert(await rmi.innerText().then(t=>t.includes('Render Free')&&t.includes('not yet provisioned')));
      await page.getByRole('button',{name:'IT',exact:true}).click();
      assert(await rmi.innerText().then(t=>t.includes('9.975.703')&&t.includes('0,7916')&&t.includes('25.000')));
      await page.evaluate(()=>scrollTo(0,0));
      await page.getByRole('button',{name:/Apri l.assistente/}).click();
      const input=page.locator('input[placeholder*="Databricks"]');await input.fill('Quali tecnologie e strumenti padroneggia?');await input.press('Enter');
      await page.getByRole('link',{name:'Esplora le competenze',exact:true}).click();
      await page.waitForFunction(()=>location.hash==='#preview-skills');
      await page.keyboard.press('Escape');
      for (const lang of ['it', 'en']) {
        await page.getByRole('button',{name:lang.toUpperCase(),exact:true}).click();
        await page.getByRole('link',{name:lang==='it'?'Anteprima CV':'Preview CV',exact:true}).click();
        const frame=page.locator('iframe[title="'+(lang==='it'?'Anteprima CV PDF':'CV PDF preview')+'"]');
        await frame.waitFor();assert((await frame.getAttribute('src')).endsWith(`Matteo_Cavo_CV_${lang.toUpperCase()}.pdf`));
        await page.keyboard.press('Escape');await frame.waitFor({state:'detached'});
      }
      await page.getByRole('button',{name:'IT',exact:true}).click();
      // Clipboard failure cannot display success. Hold/release the API promise too.
      await page.evaluate(()=>{location.hash='rome-mobility-intelligence';});await settled(page,'rome-mobility-intelligence');
      await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}});document.execCommand=()=>false;});
      await rmi.getByRole('button',{name:/Copia URL del caso studio/}).click();
      await rmi.getByRole('status').waitFor();assert.equal(await rmi.getByText('Copiato!',{exact:true}).count(),0);
      await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>new Promise(r=>window.finishCopy=r)}});});
      await rmi.getByRole('button',{name:/Copia URL del caso studio/}).click();assert.equal(await rmi.getByText('Copiato!',{exact:true}).count(),0);
      await page.evaluate(()=>window.finishCopy());await rmi.getByText('Copiato!',{exact:true}).waitFor();
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(process.env.TEST_SCREENSHOTS) await page.screenshot({path:path.join(process.env.TEST_SCREENSHOTS,`rmi-${viewport.width}.png`)});
      assert.deepEqual(errors,[]); console.log(`PASS ${viewport.width}px: filters, history, relationship, metrics, sources, chatbot, clipboard failure/deferred success, CV IT/EN, responsive width`);
      await context.close();
    }
    // A runtime sync may change the selected flagship without rebuilding the app.
    const context=await browser.newContext();const page=await context.newPage();
    for(const scenario of ['none','multiple','quaero']) {
      const changed=records.map(p=>({...p,isFlagship:scenario==='multiple'||(scenario==='quaero'&&p.github.endsWith('/Quaero'))}));
      await context.route('**/data/projects.json',route=>route.fulfill({json:changed}));
      await page.goto(base);await page.locator('article.featured-card').first().waitFor();
      assert.equal(await page.locator('article.featured-card').count(),8);
      assert.equal(await page.locator('article.featured-card').first().getAttribute('id'),scenario==='quaero'?'quaero':'rome-transport');
      assert.equal(await page.locator('#rome-mobility-intelligence').count(),1);
      await context.unroute('**/data/projects.json');
    }
    console.log('PASS runtime flagship change: zero/multiple fallback and unrelated flagship, no duplicates');await context.close();
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
