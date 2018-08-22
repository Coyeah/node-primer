const puppeteer = require('puppeteer');
const { mn } = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://image.baidu.com/');
  console.log('go to https://image.baidu.com/');

  await page.setViewport({
    width: 1920,
    height: 1080
  });
  console.log('reset viewport');

  await page.focus('#kw');
  await page.keyboard.sendCharacter('兔子');
  await page.click('.s_search');
  console.log('go to search list');

  page.on('load', async () => {
    console.log('page loading done, start fetch...');

    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img');
      return Array.prototype.map.call(images, img => img.src);
    })
    console.log(`get ${srcs.length} images, start download`);

    srcs.forEach(async (src) => {
      await page.waitFor(500);
      await srcToImg(src, mn);
    })

    await browser.close();
  })
})();