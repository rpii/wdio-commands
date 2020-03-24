const moment = require('moment');
const path = require('path');
const fs = require("fs-extra");
import ReportEvents from "@rpii/wdio-report-events" ;
import {BrowserObject, Element} from "webdriverio" ;
import {CommandsApi} from "./wdio-commands-api" ;

let eventReporter = new ReportEvents();

export class Commands implements CommandsApi {

    logMessage(message: string): BrowserObject {
        eventReporter.logMessage(message);
        return browser;
    };

    takeScreenshot(message: string): BrowserObject {
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
        console.log("Checkbox:" + this.isSelected());
        if (this.isSelected() !== state) {
            this.click();
        }
        return this;
    };

    isDisplayedWithin(timeout: number | undefined) : boolean {
        try {
            return this.waitForDisplayed(timeout);
        } catch (err) {
            return false;
        }
    };


    waitForExistAndClick(pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        if (this.waitForExist(timeout)) {
            this.scrollIntoView();
            this.click();
        }
        return this;
    };

    waitForVisibleAndClick(pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        if (this.waitForDisplayed(timeout)) {
            this.scrollIntoView()
            this.click();
        }
        return this;
    };

    waitForExistAndSetValue(value: any, pause: number = 0, timeout: number | undefined): any {
        browser.pause(pause);
        if (this.waitForExist(timeout)) {
            this.scrollIntoView();
            this.setValue(value);
        }
        return this;
    };

    waitForExistAndSelectByValue(value: any, timeout: number  | undefined): any {
        if (this.waitForExist(timeout)) {
            this.selectByValue(value);
        }
        return this;
    };

    waitForVisibleAndSetValue(value: string, timeout?: number | undefined): any {
        if (this.waitForDisplayed(timeout)) {
            this.setValue(value);
        }
        return this;
    };

    waitForNotExist(timeout: number = 30000): any {
        this.waitForExist(timeout, true);
        return this;
    };

    waitForNotVisible(timeout: number = 30000): any {
        this.waitForDisplayed(timeout, true);
        return this;
    };

    public addCommands(browser: WebdriverIO.BrowserObject) {

        browser.addCommand('logMessage', this.logMessage);
        browser.addCommand('takeScreenshot', this.takeScreenshot);

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

