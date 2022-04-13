import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import ReportEvents from '@rpii/wdio-report-events' ;
import WebdriverIO  from "../lib/wdio-commands-api" ;
const path = require('path');
const fs = require("fs-extra");

let eventReporter = new ReportEvents();



class Commands {

    logMessage(message: string) {
        eventReporter.logMessage(message);
    };

    logScreenshot(message: string, outputDirectory: string = 'reports/html-reports/screenshots/') {
        const timestamp = dayjs().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        fs.ensureDirSync(outputDirectory);
        const filepath = path.join(outputDirectory, timestamp + '.png');
        //@ts-ignore
        browser.saveScreenshot(filepath);
        eventReporter.logMessage(message);
        eventReporter.logScreenshot(filepath);
    };

    //Selector commands

    setCheckBox(state: boolean): void {
        // @ts-ignore
        if (this.isSelected() !== state) {
            // @ts-ignore
            this.click();
        }
    };

    isDisplayedWithin(timeout?: number | undefined): boolean {
        try {
            // @ts-ignore
            return this.waitForDisplayed({timeout: timeout});
        } catch (err) {
            return false;
        }
    };

    waitForExistAndClick(timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.click();
        }
    };

    waitForDisplayedAndClick(timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForDisplayed({timeout: timeout})) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.click();
        }
    };

    waitForEnabledAndClick(timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForEnabled({timeout: timeout})) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.click();
        }
    };
    waitForExistAndSetValue(value: any, timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.setValue(value);
        }
    };

    waitForExistAndSelectByValue(value: any, timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            this.selectByValue(value);
        }
    };

    waitForDisplayedAndSetValue(value: string, timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForDisplayed({timeout: timeout})) {
            // @ts-ignore
            this.setValue(value);
        }
    };

    waitForEnabledAndSetValue(value: string, timeout?: number | undefined): void {
        // @ts-ignore
        if (this.waitForEnabled({timeout: timeout})) {
            // @ts-ignore
            this.setValue(value);
        }
    };
    waitForNotExist(timeout?: number | undefined): void {
        // @ts-ignore
        this.waitForExist({timeout: timeout, reverse: true});
    };

    waitForNotDisplayed(timeout?: number | undefined): void {
        // @ts-ignore
        this.waitForDisplayed({timeout: timeout, reverse: true});
    };

    trimText(text: string | number): string {
        text = (typeof text === 'number')
            ? text.toString()
            : text;
        return text
            .trim() // strip leading and trailing white-space characters
            .replace(/\s+/, ' ') // replace sequences of whitespace characters by a single space
    };

    waitUntilTextBecomes(text: string | RegExp, timeout?: number | undefined): boolean {
        let value: string;
        try {
            let fn = (text instanceof RegExp)
                ? (value: string) => {
                    return text.test(value);
                }
                : (value: string) => {
                    return text.localeCompare(value) == 0;
                };
            // @ts-ignore
            browser.waitUntil(async () => {
                // @ts-ignore
                try {
                    //trick, reevaluate selector to prevent stale element
                    // @ts-ignore
                    value = await $(this.selector).getText();
                } catch (error) {
                    if (error.name === 'stale element reference') {
                        //TODO research how to fix fix this
                        // const element = await refetchElement(this, commandName)
                        // @ts-ignore
                        // value =  await $(this.selector).getText();
                        console.error("'wdio-command: stale element reference:" + this.selector.url);
                    } else {
                        throw error;
                    }
                }
                return fn(value);
            }, {timeout:  timeout});
            return true;
        } catch (ex) {
            console.log(ex);
        }
        return false;
    };

    public addCommands(theBrowser: WebdriverIO.Browser | WebdriverIO.MultiRemoteBrowser) {

        theBrowser.addCommand('logMessage', this.logMessage);
        theBrowser.addCommand('logScreenshot', this.logScreenshot);

        //Selector commands
        theBrowser.addCommand('setCheckBox', this.setCheckBox, true);
        theBrowser.addCommand('isDisplayedWithin', this.isDisplayedWithin, true);
        theBrowser.addCommand('waitForExistAndClick', this.waitForExistAndClick, true);
        theBrowser.addCommand('waitForDisplayedAndClick', this.waitForDisplayedAndClick, true);
        theBrowser.addCommand('waitForEnabledAndClick', this.waitForDisplayedAndClick, true);
        theBrowser.addCommand('waitForExistAndSetValue', this.waitForExistAndSetValue, true);
        theBrowser.addCommand('waitForExistAndSelectByValue', this.waitForExistAndSelectByValue, true);
        theBrowser.addCommand('waitForDisplayedAndSetValue', this.waitForDisplayedAndSetValue, true);
        theBrowser.addCommand('waitForEnabledAndSetValue', this.waitForDisplayedAndSetValue, true);
        theBrowser.addCommand('waitForNotExist', this.waitForNotExist, true);
        theBrowser.addCommand('waitForNotDisplayed', this.waitForNotDisplayed, true);
        theBrowser.addCommand('waitUntilTextBecomes', this.waitUntilTextBecomes, true);
    }
}

export default new Commands();