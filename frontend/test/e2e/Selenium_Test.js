var webdriver = require('selenium-webdriver')
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

driver.get('localhost:8080')
driver.findElement(By.className('md-icon-button')).click()
for (var i = 0; i < 2; i++) {
  driver.findElement(By.id('HomeButton')).click()
  driver.findElement(By.id('TemplatesButton')).click()
  driver.findElement(By.id('Botconfig')).click()
}
driver.findElement(By.className('md-sidenav-backdrop')).click()

driver.findElement(By.id('__id')).click()
driver.findElement(By.id('__id')).click()

driver.findElement(By.id('deployButton')).click()
