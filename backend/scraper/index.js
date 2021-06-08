const puppeteer = require('puppeteer');
let browser;
const defaultProxyUrl = '9050';
const runWithProxy = [
  //   `--proxy-server=socks5://host.docker.internal:${defaultProxyUrl}`,
  `--proxy-server=socks5://127.0.0.1:${defaultProxyUrl}`,
  '--disable-setuid-sandbox',
  '--no-sandbox',
  //   '--link webappnetwork:webappnetwork',
];
async function createScraper() {
  try {
    console.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: false,
      args: runWithProxy,
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }

  let url = 'http://nzxj65x32vh2fkhk.onion/all';
  let page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  try {
    console.log(1);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    console.log(2);
    const response = await page.$$eval('div.col-sm-12', (data) => data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
createScraper();
