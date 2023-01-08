import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import ReportEvents from '@rpii/wdio-report-events' ;
import WebdriverIO  from "../lib/wdio-commands-api.js" ;
import path from 'path';

let eventReporter = new ReportEvents();

class Commands {

    async  logMessage(message: string) {
        eventReporter.logMessage(message);
        return Promise.resolve() ;
    };

    async logScreenshot(message: string) {
        const timestamp = dayjs().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        // path..ensureDirSync('reports/html-reports/screenshots/');
        const filepath = path.join('reports/html-reports/screenshots/', timestamp + '.png');
        //@ts-ignore
        await browser.saveScreenshot(filepath);
        eventReporter.logMessage(message);
        eventReporter.logScreenshot(filepath);
        return Promise.resolve() ;
    };

    //Selector commands

    async setCheckBox(state: boolean): Promise<void> {
        // @ts-ignore
        if (await this.isSelected() !== state) {
            // @ts-ignore
            await this.click();
        }
        return Promise.resolve() ;
    };

    async isDisplayedWithin(timeout?: number | undefined): Promise<boolean> {
        try {
            // @ts-ignore
            return await this.waitForDisplayed({timeout: timeout});
        } catch (err) {
            return Promise.resolve(false) ;
        }
    };

    async waitForExistAndClick(timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            await this.scrollIntoView();
            // @ts-ignore
            await this.click();
        }
        return Promise.resolve() ;
    };

    async waitForDisplayedAndClick(timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForDisplayed({timeout: timeout})) {
            // @ts-ignore
            await this.scrollIntoView();
            // @ts-ignore
            await this.click();
        }
        return Promise.resolve() ;
    };

    async waitForEnabledAndClick(timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForEnabled({timeout: timeout})) {
            // @ts-ignore
            await this.scrollIntoView();
            // @ts-ignore
            await this.click();
        }
        return Promise.resolve() ;
    };

    async waitForExistAndSetValue(value: any, timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            await this.scrollIntoView();
            // @ts-ignore
            await this.setValue(value);
        }
        return Promise.resolve() ;
    };

    async waitForExistAndSelectByValue(value: any, timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForExist({timeout: timeout})) {
            // @ts-ignore
            await this.selectByValue(value);
        }
        return Promise.resolve() ;
    };

    async waitForDisplayedAndSetValue(value: string, timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await  this.waitForDisplayed({timeout: timeout})) {
            // @ts-ignore
            await  this.setValue(value);
        }
        return Promise.resolve() ;
    };

    async waitForEnabledAndSetValue(value: string, timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        if (await this.waitForEnabled({timeout: timeout})) {
            // @ts-ignore
            await this.setValue(value);
        }
        return Promise.resolve() ;
    };
    async waitForNotExist(timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        await this.waitForExist({timeout: timeout, reverse: true});
        return Promise.resolve() ;
    };

    async waitForNotDisplayed(timeout?: number | undefined): Promise<void> {
        // @ts-ignore
        await this.waitForDisplayed({timeout: timeout, reverse: true});
        return Promise.resolve() ;
    };

    trimText(text: string | number): string {
        text = (typeof text === 'number')
            ? text.toString()
            : text;
        return text
            .trim() // strip leading and trailing white-space characters
            .replace(/\s+/, ' ') // replace sequences of whitespace characters by a single space
    };

    async waitUntilTextBecomes(text: string | RegExp, timeout?: number | undefined): Promise<boolean> {
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
                    //@ts-ignore
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
            return Promise.resolve(true) ;
        } catch (ex) {
            console.log(ex);
        }
        return Promise.resolve(false) ;
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