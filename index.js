require("dotenv").config();
async function connect() {
    const webdriver = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-notifications");
    const driver = new webdriver.Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    await driver.get("https://www.linkedin.com/mynetwork/");
    let userName = await driver.findElement(webdriver.By.id("username"));
    let password = await driver.findElement(webdriver.By.id("password"));
    let submit = await driver.findElement(
        webdriver.By.xpath("//button[@type='submit']")
    );
    console.log("Logging in...")
    await userName.sendKeys(process.env.LINKEDIN_USER);
    await password.sendKeys(process.env.LINKEDIN_PASS);
    await submit.click();
    console.log("Login Successful...")
    await driver.sleep(5000);
    console.log("Executing Script...")
    driver.executeScript(`
        btns = document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width");
        new_btns = [];
        for(let i=0;i<btns.length;i++){if (btns[i].innerText=="Connect"){new_btns.push(btns[i])}};
        for (let i=0;i<40;i++){new_btns[i].click();console.log(btns[i].innerText)}
    `);
    await driver.sleep(2000);
    console.log("Success!")
    driver.quit();
}
console.log("Connecting to new People...")
connect();
