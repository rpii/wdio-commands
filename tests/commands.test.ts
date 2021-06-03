//TODO fix this when there is time.  testing in a real app

import commands from  "../src/wdio-commands";
import { remote } from 'webdriverio'
const sync = require('@wdio/sync').default;

suite('test suite for custom commands ', function () {
    test('load commands', function () {
        let browser  = remote({
            outputDir: __dirname,
            capabilities: {
                browserName: 'chrome'
            }
        });
        // let elem = await browser.$('#foo')
        //@ts-ignore
        commands.addCommands(browser);
        //@ts-ignore
        browser.logMessage("Test Message");
        //@ts-ignore
        browser.logScreenshot("Test Screenshot Message");
        //@ts-ignore
        let sel =browser.$("\\div[@id='test']");
        sel.isDisplayedWithin(2000) ;
        sel.waitForExistAndClick() ;
        sel.waitForDisplayedAndClick() ;
        sel.waitForNotExist() ;
        sel.waitForNotDisplayed() ;
        sel.setValue("test") ;
    });
});
