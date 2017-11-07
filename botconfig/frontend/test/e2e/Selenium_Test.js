var webdriver = require('selenium-webdriver')
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

driver.get('localhost:8080')
driver.findElement(By.className('md-icon-button')).click()
for (var i = 0; i < 10; i++) {
  driver.findElement(By.id('HomeButton')).click()
  driver.findElement(By.id('TemplatesButton')).click()
}
driver.findElement(By.className('md-sidenav-backdrop')).click()
for (var j = 0; j < 10; j++) {
  driver.findElement(By.id('showButton')).click()
}
driver.findElement(By.className('md-icon-button')).click()
driver.findElement(By.id('HomeButton')).click()
driver.findElement(By.className('md-sidenav-backdrop')).click()
driver.findElement(By.className('md-icon-button')).click()
