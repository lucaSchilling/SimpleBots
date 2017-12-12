"use strict"
const { Builder, logging, until, Key } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver')
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

driver.get('http://141.19.142.6:8080/#/')

driver.sleep(1000)

var username = "Ibrahim ist der King"
var password = "true"


driver.findElement(By.xpath("//*[@id='username']")).click()
driver.findElement(By.xpath("//*[@id='username']")).sendKeys(username)

driver.findElement(By.xpath("//*[@id='password']")).click()
driver.findElement(By.xpath("//*[@id='password']")).sendKeys(password)
driver.sleep(3000)

driver.findElement(By.cpath("//*[@id='inner']/div/div[2]/div[3]/div/i")).click()

driver.findElement(By.xpath("//*[@id='md-select-menu-llyeynra']/li[2]/button/div/span")).click();



driver.sleep(3000)
driver.findElement(By.css("*[id='inner'] > div > div.md-card-content > div.md-field.md-theme-default.md-has-value > div > i > svg")).click();
driver.sleep(3000)
driver.findElement(By.css("*[id='md-select-menu-luhsqzvqr'] > li:nth-of-type(1) > button > div > span.md-list-item-text")).click();

driver.findElement(By.xpath("//*[@id='inner']/div/div[3]/button")).click()

driver.sleep(1000)

driver.findElement(By.xpath("//*[@id='app']/div[1]/div/div[1]/a[3]")).click()
driver.sleep(1000).then(function () {
    return driver.getCurrentUrl();
}).then(function (currentUrl) {
    if (currentUrl != 'http://141.19.142.6:8080/#/botarmy') {
        console.error("Stimmt nicht überein!");
        console.log(currentUrl)
    } else {
        console.log("Botarmy - URL stimmt überein!")
    }
})

driver.sleep(1000)

driver.findElement(By.xpath("//*[@id='wlcmdiv']")).click()

// driver.findElement(By.id('next')).click().then(function(){
//     return driver.getCurrentUrl();
// }).then (function(currentUrl){
//     if(currentUrl != 'http://localhost:8080/'){
//         console.error("Stimmt nicht überein!");
// }
// })
// driver.sleep(1000)

// driver.findElement(By.id('continue')).click().then(function(){
//     return driver.getCurrentUrl();
// }).then (function(currentUrl){
//     if(currentUrl != 'http://localhost:8080/'){
//         console.error("Stimmt nicht überein!");
// }
// })
// driver.sleep(1000)

// var _id = Math.round (Math.random() * 1357)
// var welcomeMessage = ['Hello :)','Hi :)','HuHu :)','Willkommen :)','Ich bin bereit :)','Los geht´s!'][Math.floor(Math.random()*6)]
// var options = ['aaa','bbb','ccc','ddd','eee','fff'][Math.floor(Math.random()*6)]
// var template = 'Welcome Bot'
// var name = ['Bauer','Frank','Otto','Hans','Ronaldo','Schmidt',][Math.floor(Math.random()*6)]
// var lastEdit = new Date().getHours() +":" + new Date().getMinutes()

// var idF = driver.findElement(By.id('id'))
// idF.click()
// idF.sendKeys(_id)
// driver.sleep(1000)

// var nF = driver.findElement(By.id('name'))
// nF.click()
// nF.sendKeys(name);
// driver.sleep(1000)

// var wmF = driver.findElement(By.id('welcomeMessage'))
// wmF.click()
// wmF.sendKeys(welcomeMessage);
// driver.sleep(1000)

// var oF = driver.findElement(By.id('options'))
// oF.click()
// oF.sendKeys(options);
// driver.sleep(1000)

// var tF = driver.findElement(By.id('field'))
// tF.click()
// driver.sleep(1000)

// var wB = driver.findElement(By.id('wB'))
// wB.click() 
// driver.sleep(1000)

// var leF = driver.findElement(By.id('lastEdit'))
// leF.click()
// leF.sendKeys(lastEdit);
// driver.sleep(1000)

// driver.findElement(By.id('deployButton')).click()/*.then(function(){
//     return driver.getCurrentUrl();
// }).then (function(currentUrl){
//     if(currentUrl != 'http://localhost:8080/'){
//         console.error("Stimmt nicht überein!");
//         console.log(currentUrl)
// }
// })
// */
// driver.sleep(1000)

// driver.findElement(By.css("*[id='app'] > div > div > div.md-tabs-navigation.md-elevation-0 > button:nth-of-type(3) > div > span.md-button-content")).click()
