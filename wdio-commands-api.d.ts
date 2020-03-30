// Merge namespace with global WebdriverIO
declare global {
    export namespace WebdriverIO {
        interface Element {
            setCheckBox: (state: boolean) => Element;
            isDisplayedWithin: (timeout?: undefined | number) => boolean;
            waitForExistAndClick: (timeout?: undefined | number) => Element;
            waitForDisplayedAndClick: (timeout?: undefined | number) => Element;
            waitForExistAndSetValue: (value: string, timeout?: undefined | number) => Element;
            waitForExistAndSelectByValue: (value: string, timeout?: undefined | number) => Element;
            waitForDisplayedAndSetValue: (timeout?: undefined | number) => Element;
            waitForNotExist: (timeout?: undefined | number) => Element;
            waitForNotDisplayed: (timeout?: undefined | number) => Element;
            waitUntilTextBecomes: (text:string|RegExp, timeout?: number| undefined) => boolean;
        }
        interface BrowserObject {
            logMessage: (message: string) => BrowserObject;
            logScreenshot: (message: string) => BrowserObject;
        }
    }
}
export { Element, BrowserObject } from "@wdio/sync";
declare class Commands {
    logMessage(message: string): any;
    logScreenshot(message: string): any;
    setCheckBox(state: boolean): any;
    isDisplayedWithin(timeout?: number | undefined): boolean;
    waitForExistAndClick(timeout?: number | undefined): any;
    waitForDisplayedAndClick(timeout?: number | undefined): any;
    waitForExistAndSetValue(value: any, timeout?: number | undefined): any;
    waitForExistAndSelectByValue(value: any, timeout?: number | undefined): any;
    waitForDisplayedAndSetValue(value: string, timeout?: number | undefined): any;
    waitForNotExist(timeout?: number | undefined): any;
    waitForNotDisplayed(timeout?: number | undefined): any;
    trimText(text: string | number): string;
    waitUntilTextBecomes(text: string | RegExp, timeout?: number | undefined): boolean;
    addCommands(browser: WebdriverIO.BrowserObject): void;
}
declare const _default: Commands;
export default _default;
