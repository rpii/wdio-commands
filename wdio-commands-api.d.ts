// Merge namespace with global WebdriverIO
export {};
declare global {
    export namespace WebdriverIO {
        interface Element {
            setCheckBox: (state: boolean) => Element;
            isDisplayedWithin: (timeout: undefined | number) => boolean;
            waitForExistAndClick: (pause: number, timeout: undefined | number) => Element;
            waitForVisibleAndClick: (pause: number, timeout: undefined | number) => Element;
            waitForExistAndSetValue: (value: string, pause: number, timeout: undefined | number) => Element;
            waitForExistAndSelectByValue: (value: string, timeout: undefined | number) => Element;
            waitForVisibleAndSetValue: (timeout: undefined | number) => Element;
            waitForNotExist: (timeout: undefined | number) => Element;
            waitForNotVisible: (timeout: undefined | number) => Element;
            isSelected: () => boolean;
            scrollIntoView: (scrollIntoViewOptions?: undefined | object | boolean) => void;
            // setValue: (
            //     value: string | number | boolean | object | any[],
            //     options?: undefined | any
            // ) => void;
            waitForDisplayed: (
                ms?: number,
                reverse?: undefined | boolean,
                error?: undefined | string
            ) => boolean;
            waitForExist: (
                ms?: number,
                reverse?: undefined | boolean,
                error?: undefined | string
            ) => boolean;
        }

        interface BrowserObject {
            logMessage: (message: string) => BrowserObject;
            takeScreenshot: (message: string) => BrowserObject;
        }
    }
}
