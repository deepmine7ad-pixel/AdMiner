// scripts/generate_adau_image.js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async()=>{
    const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({width:400,height:100});

    // Load local page served by http-server in Action
    await page.goto('http://127.0.0.1:8000/live_adau.html', {waitUntil:'networkidle2'});
    await page.waitForTimeout(1000);

    // Snapshot canvas element
    const canvas = await page.$('#badge');
    await canvas.screenshot({path:path.join(process.cwd(),'adau.png')});

    await browser.close();
    console.log('Saved adau.png');
})();
