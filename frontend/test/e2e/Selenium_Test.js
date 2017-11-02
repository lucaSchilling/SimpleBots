var webdriver = require('selenium-webdriver')
var By = webdriver.By

var driver = new webdriver.Builder().forBrowser('chrome').build()

driver.get('localhost:8080')
driver.findElement(By.id('1')).click()
