
import  { expect } from  "chai";
import commands from  "../src/wdio-commands";
const { remote } = require('webdriverio');
const sync = require('@wdio/sync').default;

suite('test suite for custom commands ', function () {
    test('load commands', function () {
        remote({
            runner: true,
            outputDir: __dirname,
            capabilities: {
                browserName: 'chrome'
            }
        }).then((browser) => sync(() => {
                commands.addCommands(browser);
                browser.logMessage("Test Message");
                browser.takeScreenshot("Test Screenshot Message");
            })
        );
    });
});
