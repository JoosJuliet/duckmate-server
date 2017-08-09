


var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
	withCapabilities(webdriver.Capabilities.chrome())
	.build();

			driver.get('http://en.wikipedia.org');
	//		driver.findElement(By.name('q')).sendKeys('webdriver');
		//	driver.findElement(By.name('btnG')).click();
	//		driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//			driver.quit();
