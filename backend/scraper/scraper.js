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
    //Open the browser
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
    //Open the given URL
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    //Get the content from the URL
    const content = await page.content();
    const $ = cheerio.load(content);
    const titles = [];
    const contents = [];
    const authors = [];
    const creationDate = [];
    const creationTime = [];

    //Get the title
    $('.col-sm-5').each((idx, elem) => {
      let title = $(elem).text();

      //Remove unnessecey letters && spaces
      title = title.split(/\t|\n/).filter((text) => !/^\s*$/g.test(text));
      let newTitle = title[0];
      arr = authorAndDate.split(' ');
      if (
        newTitle === 'Anonymous' ||
        newTitle === 'Unknown' ||
        newTitle === 'Guest' ||
        newTitle === ''
      ) {
        newTitle = 'Anonymous';
      }
      titles.push(newTitle);
    });

    //Get the content
    $('.text').each((idx, elem) => {
      let eachContent = $(elem).text();

      //Remove unnessecey letters && spaces
      eachContent = eachContent
        .split(/\t|\n/)
        .filter((text) => !/^\s*$/g.test(text));

      contents.push(eachContent);
    });
    let count = 0;

    //Get author & date & time
    $('.col-sm-6').each((idx, elem) => {
      if (count % 2 === 0) {
        let authorAndDate = $(elem).text();
        let arr = [];
        arr = authorAndDate.split(' ');
        if (
          arr[2] === 'Anonymous' ||
          arr[2] === 'Unknown' ||
          arr[2] === 'Guest' ||
          arr[2] === ''
        ) {
          arr[2] = 'Anonymous';
        }
        authors.push(arr[2]);

        creationDate.push(`${arr[4]}/${arr[5]}/${arr[6].slice(0, 4)}`);
        creationTime.push(arr[7]);
      }
      count++;
    });

    //Put all the data in array of objects
    const allPastes = [];
    for (let i = 0; i < titles.length; i++) {
      allPastes.push({
        title: titles[i],
        content: contents[i],
        author: authors[i],
        creationDate: creationDate[i],
        creationTime: creationTime[i],
      });
    }

    return allPastes;
  } catch (err) {
    console.log(err);
  }
}
module.exports = createScraper;
