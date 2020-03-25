const moment = require('moment');
const path = require('path');
const fs = require("fs-extra");

import ReportEvents from "@rpii/wdio-report-events" ;
let eventReporter = new ReportEvents();
import {Element, BrowserObject } from "@wdio/sync";
export {Element, BrowserObject } from "@wdio/sync";

class Commands {
    defaultWaitTime:number;

    constructor() {
        this.defaultWaitTime =  10000;
    }

    logMessage(message: string): any {
        eventReporter.logMessage(message);
        return browser;
    };

    logScreenshot(message: string) : any {
        const timestamp = moment().format('YYYYMMDD-HHmmss.SSS');
        fs.ensureDirSync('reports/html-reports/screenshots/');
        const filepath = path.join('reports/html-reports/screenshots/', timestamp + '.png');
        browser.saveScreenshot(filepath);
        eventReporter.logMessage(message);
        eventReporter.logScreenshot(filepath);
        return browser;
    };

    //Selector commands

    setCheckBox(state: boolean): any {
        // @ts-ignore
        console.log("Checkbox:" + this.isSelected());
        // @ts-ignore
        if (this.isSelected() !== state) {
            // @ts-ignore
            this.click();
        }
        return this;
    };

    isDisplayedWithin(timeout: number | undefined) : boolean {
        try {
            // @ts-ignore
            return this.waitForDisplayed(timeout);
        } catch (err) {
            return false;
        }
    };

    waitForExistAndClick(pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        // @ts-ignore
        if (this.waitForExist(timeout)) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.click();
        }
        return this;
    };

    waitForVisibleAndClick(pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        // @ts-ignore
        if (this.waitForDisplayed(timeout)) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.click();
        }
        return this;
    };

    waitForExistAndSetValue(value: any, pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        // @ts-ignore
        if (this.waitForExist(timeout)) {
            // @ts-ignore
            this.scrollIntoView();
            // @ts-ignore
            this.setValue(value);
        }
        return this;
    };

    waitForExistAndSelectByValue(value: any, timeout: number  | undefined): any {
        // @ts-ignore
        if (this.waitForExist(timeout)) {
            // @ts-ignore
            this.selectByValue(value);
        }
        return this;
    };

    waitForVisibleAndSetValue(value: string, timeout?: number | undefined): any {
        // @ts-ignore
        if (this.waitForDisplayed(timeout)) {
            // @ts-ignore
            this.setValue(value);
        }
        return this;
    };

    waitForNotExist(timeout: number = this.defaultWaitTime): any {
        // @ts-ignore
        this.waitForExist(timeout, true);
        return this;
    };

    waitForNotVisible(timeout: number = this.defaultWaitTime): any {
        // @ts-ignore
        this.waitForDisplayed(timeout, true);
        return this;
    };

    public addCommands(browser: WebdriverIO.BrowserObject) {

        browser.addCommand('logMessage', this.logMessage);
        browser.addCommand('logScreenshot', this.logScreenshot);

        //Selector commands
        browser.addCommand('setCheckBox', this.setCheckBox, true);
        browser.addCommand('isDisplayedWithin', this.isDisplayedWithin, true);
        browser.addCommand('waitForExistAndClick', this.waitForExistAndClick, true);
        browser.addCommand('waitForVisibleAndClick', this.waitForVisibleAndClick, true);
        browser.addCommand('waitForExistAndSetValue', this.waitForExistAndSetValue, true);
        browser.addCommand('waitForExistAndSelectByValue', this.waitForExistAndSelectByValue, true);
        browser.addCommand('waitForVisibleAndSetValue', this.waitForExistAndSetValue, true);
        browser.addCommand('waitForNotExist', this.waitForNotExist, true);
        browser.addCommand('waitForNotVisible', this.waitForNotVisible, true);

    }
}

export default new Commands();