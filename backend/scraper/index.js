const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
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
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    // const response = await page.$$eval('div.pre-header', (data) => data);
    const content = await page.content();
    const $ = cheerio.load(content);
    const titles = [];
    const contents = [];
    const authors = [];
    const dates = [];

    $('.col-sm-5').each((idx, elem) => {
      const title = $(elem).text();
      titles.push(title);
    });
    $('.text').each((idx, elem) => {
      const eachContent = $(elem).text();
      contents.push(eachContent);
    });
    let count = 0;
    $('.col-sm-6').each((idx, elem) => {
      if (count % 2 === 0) {
        let authorAndDate = $(elem).text();
        let arr = [];
        arr = authorAndDate.split(' ');
        authors.push(arr[2]);
        dates.push({
          day: arr[4],
          month: arr[5],
          year: arr[6],
          time: arr[7],
        });
      }
      count++;
    });
  } catch (err) {
    console.log(err);
  }
}
createScraper();
