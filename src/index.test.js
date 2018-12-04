import puppeteer from 'puppeteer';
describe('index', () => {
  let page;
  let testData;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    testData = {
      entries: [
        {
          API: 'API for api searching',
          HTTPS: 'true',
          Auth: 'ApiKey'
        },
        {
          API: 'API for testing',
          HTTPS: 'true',
          Auth: 'ApiKey'
        }
      ]
    };
    page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.setRequestInterception(true);
    await page.on('request', request => {
      request.respond({
        content: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(testData)
      });
    });
  });
  afterAll(() => {
    browser.close();
  });
  it('should have title "API Search"', async () => {
    const title = await page.title();
    expect(title).toMatch('API Search');
  });
  describe('searching for api', () => {
    let apiTable;
    beforeAll(async () => {
      await page.waitForSelector('.search-form');
      await page.type('input[name=category]', 'anime');
      await page.$eval('.search-btn', btn => btn.click());
      apiTable = await page.waitForSelector('.api-table');
    });
    it('element with class apiTable should exist', () => {
      expect(apiTable).toBeTruthy();
    });
    it("tbody's childElementCount should equal the length of testData.entries", async () => {
      const tbodyChildElementCount = await page.$eval(
        'tbody',
        element => element.childElementCount
      );
      expect(tbodyChildElementCount).toBe(Object.keys(testData.entries).length);
    });
  });
});
