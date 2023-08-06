const puppeteer = require('puppeteer-extra')
const crypto = require("crypto");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { createCursor } = require('ghost-cursor-playwright');
const { request } = require('http');


puppeteer.use(StealthPlugin())

const sleep = s => new Promise(e => setTimeout(e, s));


(async () => {

    browser_args = []
    browser_args.push('--lang=en')
    browser_args.push( '--disable-gpu')
    browser_args.push(`--window-size=1024,1024` )
    browser_args.push('about:blank')
    
    const browser = await puppeteer.launch( { args:browser_args, headless: false, executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe" } );
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', route => {

        console.log(`[REQUEST] ${route.url()}`)

        if (route.url().includes(".css") || route.url().includes("assets")) {
            return route.abort()
        } else {
            return route.continue();
        }
    })

    page.on('requestfinished', async (route) => {
        const response = await route.response();
        try { 
            console.log(`[CF COOKIE] ${response.headers().set-cookie}`)
        } catch (e) { console.log(`[LOG] NO COOKIE`)}
    })

    var cursor = await createCursor(page)
    await page.goto('https://inversecurity.org/', { waitUntil: "networkidle0", timeout: 1000000 });

    
    await page.screenshot({path: 'well-challenger-lol.png'});
    await sleep(6000)
    await page.screenshot({path: 'well-challenger-lol-no.png'});
    await sleep(6000)
    await page.screenshot({path: 'well-challenger-lol-no1.png'});
    await sleep(6999)
    await page.goto('https://inversecurity.org/dash/login.php', { waitUntil: "networkidle0", timeout: 1000000 });
    await sleep(6999)
    await page.screenshot({path: 'well-challenger-lol-dash.png'});
    await browser.close();
})();