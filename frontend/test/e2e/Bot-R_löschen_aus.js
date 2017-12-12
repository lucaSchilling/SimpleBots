"use strict"
const {Builder, logging, until, Key} = require('selenium-webdriver');

var webdriver = require('selenium-webdriver')
var By = webdriver.By


var driver = new webdriver.Builder().forBrowser('chrome').build()

driver.get('http://localhost:8080/')

driver.sleep(1000)

driver.findElement(By.css("*[id='app'] > div > div > div.md-tabs-navigation.md-elevation-0 > button:nth-of-type(3) > div > span.md-button-content")).click()

driver.sleep(1000).then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Stimmt nicht überein!");
        console.log(currentUrl)
    }
})
driver.sleep(1000)

driver.findElements(By.css('tbody tr')).then(function(row){
    //console.log('Found', row.length-1)
    
    if(row.length > 1){
        driver.findElement(By.css('tbody tr:nth-of-type(2) td:nth-of-type(1) div  div  div  div')).click();
        driver.sleep(1000)
             
        driver.findElement(By.css('tbody tr:nth-of-type(2) td:nth-of-type(1) div  div  div  div')).click();
        driver.sleep(1000)
    } else {
        console.log("Es muss mindestens 1 Bot laufen")
    }
    
});

//driver.findElement(By.id('delete')).click()