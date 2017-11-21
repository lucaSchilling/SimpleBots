"use strict"
const {Builder, logging, until, Key} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver')
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

//driver.get('http://141.19.142.6/dist/config/frontend/')
driver.get('localhost:8080')

driver.findElement(By.id('tab-botarmy')).click()
driver.findElement(By.id('next')).click()
driver.findElement(By.CssSelector("md-step#second mdbutton")).click()
//driver.findElement(By.CssSelector('cont')).click()

/*
driver.findElement(By.id('Botconfig')).click().then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://141.19.142.6:8081/#/Botconfig'){
        console.error("Stimmt nicht überein!");
}
})

driver.findElement(By.className('md-sidenav-backdrop')).click()

var _id = Math.round (Math.random() * 1357)
var welcomeMessage = ['Hello :)','Hi :)','HuHu :)','Willkommen :)','Ich bin bereit :)','Los geht´s!'][Math.floor(Math.random()*6)]
var options = ['aaa','bbb','ccc','ddd','eee','fff'][Math.floor(Math.random()*6)]
var template = 'Welcome Bot'
var name = ['Bauer','Frank','Otto','Hans','Ronaldo','Schmidt',][Math.floor(Math.random()*6)]
var lastEdit = new Date().getHours() +":" + new Date().getMinutes()

var idF = driver.findElement(By.id('_id'))
idF.click()
idF.sendKeys(_id)

var wmF = driver.findElement(By.id('welcomeMessage'))
wmF.click()
wmF.sendKeys(welcomeMessage);

var oF = driver.findElement(By.id('options'))
oF.click()
oF.sendKeys(options);

var tF = driver.findElement(By.id('template'))
tF.click()
tF.sendKeys(template);

var nF = driver.findElement(By.id('name'))
nF.click()
nF.sendKeys(name);

var leF = driver.findElement(By.id('lastEdit'))
leF.click()
leF.sendKeys(lastEdit);

driver.findElement(By.id('deployButton')).click()
*/