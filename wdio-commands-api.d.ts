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
            waitUntilTextBecomes: (text:string|RegExp , timeout?: number| undefined) => Element;
        }
        interface BrowserObject {
            logMessage: (message: string) => BrowserObject;
            logScreenshot: (message: string) => BrowserObject;
        }
    }
}
export { }; //This file needs to be a module
