//TODO fix this when there is time.  testing in a real app
import  { expect } from  "chai";
import commands from  "../src/wdio-commands";
const { remote } = require('webdriverio');
const sync = require('@wdio/sync').default;

suite('test suite for custom commands ', function () {
    test('load commands', function () {
        let browser ;
        browser = await remote({
            runner: true,
            outputDir: __dirname,
            capabilities: {
                browserName: 'chrome'
            }
        });
        // let elem = await browser.$('#foo')
        commands.addCommands(browser);
        browser.logMessage("Test Message");
        browser.logScreenshot("Test Screenshot Message");
        let sel =$("\\div[@id='test']");
        sel.isDisplayedWithin(2000) ;
        sel.waitForExistAndClick() ;
        sel.waitForDisplayedAndClick() ;
        sel.waitForNotExist() ;
        sel.waitForNotDisplayed() ;
        sel.setValue("test") ;
    });
});
