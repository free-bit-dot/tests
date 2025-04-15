const puppeteer = require("puppeteer");

const addProperty = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/sale.html"); 

  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector("input[name='title']");
  await page.type("input[name='title']", "Sample Property");

  await page.waitForSelector("input[name='location']");
  await page.type("input[name='location']", "Sample Location");

  await page.waitForSelector("input[name='price']");
  await page.type("input[name='price']", "100000");

  await page.waitForSelector("select[name='type']");
  await page.select("select[name='type']", "Продаж"); 

  const filePath = "C:/Users/Sasha/Desktop/06.jpg"; 
  const input = await page.$("input[type='file']");
  await input.uploadFile(filePath);

  (await page.$("button[type='submit']")).click();

  await page.waitForNavigation();

  await browser.close();
};

module.exports = addProperty;
