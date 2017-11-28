"use strict"
const {Builder, logging, until, Key} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver')
const assert = require('assert');
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

/*
* driver.get: URL wo getestet werden soll.
*/

driver.get('http://localhost:8080/')

driver.sleep(1000)

/*
* By.css: damit navigiert man zum Tab "Botarmy" und mit .click() klickt man darauf. 
* Callback funktion um die URL zu vergleichen und zwar die aktuelle URL mit dem URL die erwartet wird. 
  Falls die URL nicht übereinstimmt wirft die Konsole eine Meldung "Stimmt nicht überein aus".
*/
driver.findElement(By.css("*[id='app'] div div div.md-tabs-navigation.md-elevation-0 button:nth-of-type(2) div.md-ripple span.md-button-content")).click()
driver.sleep(1000).then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Bot-Army - URL stimmt nicht überein!");
    } else if(currentUrl == 'http://localhost:8080/'){
        console.log("Bot-Army -URL stimmt überein!");
    }   
})

/*
* .sleep(1000) immer nach jedem klick, da es auftreten kann, dass der klick-funktion klickt bevor 
  die Seite geladen wird dies führt zu Fehlern.
*/
driver.sleep(1000)

/*
* driver.findElement(By.id("")) sucht die id="next" und klickt drauf. Die URL wird wieder verglichen.
*/
driver.findElement(By.id('next')).click().then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Next - URL stimmt nicht überein!");
    } else if(currentUrl == 'http://localhost:8080/'){
        console.log("Next -URL stimmt überein!");
    }   
})
driver.sleep(1000)

/*
* driver.findElement(By.id("")) sucht die id="continue" und klickt drauf. Die aktuelle und erwartende 
  URL wird wieder verglichen.
*/
driver.findElement(By.id('continue')).click().then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Continue - URL stimmt nicht überein!");
    } else if(currentUrl == 'http://localhost:8080/'){
        console.log("Continue - URL stimmt überein!");
    }   
})
driver.sleep(1000)

/*
* 5 Bots werden hier erstellt
*/
for(var i = 0; i<5; i++){
/*
* Hier werden Variablen definiert die für das Ausfüllen von Textfelder benutzt werden
*/
var _id = Math.round (Math.random() * 1357)
var welcomeMessage = ['Hello :)','Hi :)','HuHu :)','Willkommen :)','Ich bin bereit :)','Los geht´s!'][Math.floor(Math.random()*6)]
var options = ['aaa','bbb','ccc','ddd','eee','fff'][Math.floor(Math.random()*6)]
var template = 'Welcome Bot'
var name = ['Bauer','Frank','Otto','Hans','Ronaldo','Schmidt',][Math.floor(Math.random()*6)]
var lastEdit = new Date().getHours() +":" + new Date().getMinutes()

/*
* sendKeys(_id) sendet den Inhalt von der Variable _id in das Textfeld mit dem id="id"
*/
var idF = driver.findElement(By.id('id'))
idF.click()
idF.clear()
driver.sleep(1000)
idF.sendKeys(_id)
driver.sleep(1000)

/*
* sendKeys(name) sendet den Inhalt von der Variable name in das Textfeld mit dem id="name"
*/
var nF = driver.findElement(By.id('name'))
nF.click()
nF.clear()
driver.sleep(1000)
nF.sendKeys(name);
driver.sleep(1000)

/*
* sendKeys(welcomeMessage) sendet den Inhalt von der Variable welcomeMessage in das 
  Textfeld mit dem id="welcomeMessage"
*/
var wmF = driver.findElement(By.id('welcomeMessage'))
wmF.click()
wmF.clear()
driver.sleep(1000)
wmF.sendKeys(welcomeMessage);
driver.sleep(1000)

/*
* sendKeys(options) sendet den Inhalt von der Variable options in das 
  Textfeld mit dem id="options"
*/
var oF = driver.findElement(By.id('options'))
oF.click()
oF.clear()
driver.sleep(1000)
oF.sendKeys(options);
driver.sleep(1000)

var leF = driver.findElement(By.id('field'))
leF.click()
driver.sleep(1000)

var faq = driver.findElement(By.id('FAQ'))
faq.click() 
driver.sleep(2000)

leF.click()
driver.sleep(1000)

var taB = driver.findElement(By.id('taB'))
taB.click() 
driver.sleep(2000)

leF.click()
driver.sleep(1000)

var wB = driver.findElement(By.id('wB'))
wB.click() 
driver.sleep(1000)

/*
* sendKeys(lastEdit) sendet den Inhalt von der Variable lastEdit in das 
  Textfeld mit dem id="lastEdit"
*/
var lE = driver.findElement(By.id('lastEdit'))
lE.click()
lE.clear()
driver.sleep(1000)
lE.sendKeys(lastEdit);
driver.sleep(1000)

driver.findElement(By.id('deployButton')).click()/*.then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Stimmt nicht überein!");
        console.log(currentUrl)
}
})
*/
driver.sleep(1000)

}

/*
* Zu Bot Status Tab wechseln
*/
driver.findElement(By.css("*[id='app'] > div > div > div.md-tabs-navigation.md-elevation-0 > button:nth-of-type(3) > div > span.md-button-content")).click().then(function(){
    return driver.getCurrentUrl();
}).then (function(currentUrl){
    if(currentUrl != 'http://localhost:8080/'){
        console.error("Bot Status - URL stimmt nicht überein!");
    } else if(currentUrl == 'http://localhost:8080/'){
        console.log("Bot Status - URL stimmt überein!");
    }   
})
driver.sleep(1000)

/*
* Die Bots werden hier nach und nach angesprochen. Bots werden an und ausgeschaltet, werden gelöscht.
* TODO: Falls Bot nicht glöscht wird, wird die letzte Zeile in der Tabelle nicht besucht.
*/
driver.findElements(By.css('tbody tr')).then(function(row){
    
        var rowCurrentLength = row.length
    
        for(var i=2; i<rowCurrentLength; i++){
            
            if(i==2){
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + i +') td:nth-of-type(1) div  div  div  div')).click()
                driver.sleep(1000)
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + i +') td:nth-of-type(1) div  div  div  div')).click()
                driver.sleep(1000)
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + i +') td:nth-of-type(7) div  button  div  span.md-button-content')).click().then(function(){
                    driver.findElements(By.css('tbody tr')).then(function(rowNew){
                        if(rowNew.length == row.length-1){
                            console.log("Bot löschen erfolgreich!")
                            
                        } else{
                            console.log("Bot löschen nicht erfolgreich!")
                        }
                })
                   
            })
    
        } else if(i==3){
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + (i) +') td:nth-of-type(1) div  div  div  div')).click();
                driver.sleep(1000)
                driver.findElement(By.css('tbody tr:nth-of-type(' + (i) +') td:nth-of-type(7) div  button  div  span.md-button-content')).click().then(function(){
                    driver.findElements(By.css('tbody tr')).then(function(rowNew2){
                        if(rowNew2.length == row.length-2){
                            console.log("Bot löschen erfolgreich!")
                            
                        } else{
                            console.log("Bot löschen nicht erfolgreich!")
                        }
                })
            })
        
        } else {
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + i +') td:nth-of-type(1) div  div  div  div')).click();
                driver.sleep(1000)
    
                driver.findElement(By.css('tbody tr:nth-of-type(' + i +') td:nth-of-type(1) div  div  div  div')).click();
                driver.sleep(1000)
    
                console.log("Durchlauf " + i + " " + row.length)
            }
    }
});