# @rpii/wdio-commands

## Usage
Typescript package which provides aggregated webdriver.io commands to perform complex actions
This package adds the following commands to the WebDriverIO Element:

```
            setCheckBox: (state: boolean) => Element;
            isDisplayedWithin: (timeout: undefined | number) => boolean;
            waitForExistAndClick: (pause: number, timeout: undefined | number) => Element;
            waitForVisibleAndClick: (pause: number, timeout: undefined | number) => Element;
            waitForExistAndSetValue: (value: string, pause: number, timeout: undefined | number) => Element;
            waitForExistAndSelectByValue: (value: string, timeout: undefined | number) => Element;
            waitForVisibleAndSetValue: (timeout: undefined | number) => Element;
            waitForNotExist: (timeout: undefined | number) => Element;
            waitForNotVisible: (timeout: undefined | number) => Element;
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