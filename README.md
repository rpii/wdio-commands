# @rpii/wdio-commands
##NOTICE
This is a work in progress. Dont have a way to test it remotely other than publish.
Sorry for any problems...These are tough times.  With 2.0 code is working and types are resolving.
Some async issue still occurs with waitUntilTextBecomes, but if your test runs less than 90 seconds its ok.  Still looking at that.

## Usage
Typescript package which provides aggregated webdriver.io commands to perform complex actions
This package adds the following commands to the WebDriverIO Element:

```
            setCheckBox: (state: boolean) => Element;
            isDisplayedWithin: (timeout: undefined | number) => boolean;
            waitForExistAndClick: (timeout: undefined | number) => Element;
            waitForDisplayedAndClick: (timeout: undefined | number) => Element;
            waitForExistAndSetValue: (value: string, timeout: undefined | number) => Element;
            waitForExistAndSelectByValue: (value: string, timeout: undefined | number) => Element;
            waitForDisplayedAndSetValue: (timeout: undefined | number) => Element;
            waitForNotExist: (timeout: undefined | number) => Element;
            waitForNotDisplayed: (timeout: undefined | number) => Element;
            waitUntilTextBecomes(text:string|RegExp , timeout?: number| undefined): boolean
```
to use add to wdio.conf.js:

```
import commands from "@rpii/wdio-commands" ;
```
add to the before hook:
```
commands.addCommands(browser) ;
```
###Sample

    in a page object:
```

    $("//button[@id='submit-button']").waitForVisibleAndClick(2000) ;
```

The default Wait Time is 10 seconds if the timeout is omitted