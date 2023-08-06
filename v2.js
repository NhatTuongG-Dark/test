const puppeteer = require('puppeteer-extra')
const crypto = require("crypto");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { createCursor } = require('ghost-cursor-playwright');
const { request } = require('http');
const tmp = require('tmp')
const proxyChain = require('proxy-chain');
puppeteer.use(StealthPlugin())
const tmpobj = tmp.dirSync();
const tempDirPath = tmpobj.name.replace(tmpobj.name.split("\\")[tmpobj.name.split("\\") .length - 1], "")

const sleep = s => new Promise(e => setTimeout(e, s));


(async () => {
    for (var i = 0; i < 5; i++) {
        createSession()
    }
})();

async function createSession() { 
    var start = +new Date();


    var new_profile = tempDirPath + crypto.randomBytes(20).toString('hex');
    browser_args = []
    browser_args.push(`--user-data-dir="${new_profile}"`)
    browser_args.push('--lang=en')
    browser_args.push( '--disable-gpu')
    browser_args.push(`--window-size=1024,1024` )
    browser_args.push('about:blank')
    var original_proxy_url = 'http://' + "terminaluwu123:youaregaylol@geo.iproyal.com:22323"
    var new_proxy_url = await proxyChain.anonymizeProxy(original_proxy_url);
    browser_args.push(`--proxy-server=${new_proxy_url}` )
    
    const browser = await puppeteer.launch( { args:browser_args, headless: false, executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe" } );
    for (var i = 0; i < 5; i++) {
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', route => {

        console.log(`[REQUEST] ${route.url()}`)

        if (route.url().includes(".css") || route.url().includes("assets") || route.url().includes(".png") || route.url().includes(".jpeg") || route.url().includes("others")) {
            return route.abort()
        } else {
            return route.continue();
        }
    })

    bypassed = false

    var cursor = await createCursor(page)
    await page.goto('https://inversecurity.org/', { waitUntil: "networkidle0", timeout: 1000000 });

    sleep(1000)

    //10 Retries
    for (var i = 0; i < 10; i++) {
        if (bypassed == false) {
            sleep(80)
            const data = await page.evaluate(() => document.querySelector('*').outerHTML);
            sleep(80)
            if (data.includes('Checking if the site connection is secure')) {
                await sleep(500)
                console.log(`[!] Challenge Is Not Bypassed Yet Sleeping....`)
                sleep(200)
            } else { 
                sleep(1000)
                bypassed = true
                console.log('[!] Challenged Bypassed')
            }
        }
    }

    sleep(1000)
    var cookies = await page.cookies();
    console.log(cookies)
    await page.screenshot({path: 'well-challenger-lol-dash.png'});
}
    await browser.close();
    
    var end = +new Date();
    var time = end - start;
    console.log('Time Took To Start A Session :  '+ time + 'ms');
    
}

// Error Handler, Dont Touch
process.on('unhandledRejection', (error) => { console.log(error) });
process.on("uncaughtException", (err, origin) => { console.log(err) })
process.on('uncaughtExceptionMonitor', (err, origin) => { console.log(err) });
process.on('beforeExit', (code) => { console.log(code) });
process.on('exit', (code) => { console.log(code) });
process.on('multipleResolves', (type, promise, reason) => { }); 