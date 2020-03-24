import Commands  from "../src/wdio-commands" ;

import  { expect } from  "chai";

export class EventListener {

    saveScreenshot(filepath) {
        console.log("screenshot event sink:" + filepath) ;
        expect(true,"screenshot event fired:" + filepath) ;
    }

    saveMessage(message) {
        console.log("message event sink:" + message)
        expect(true,"message event fired:" + message) ;
    }
}

suite('test suite', function () {
    let proxy = new ReportEvents() ;
    let eventSink = new EventListener() ;
    proxy.connectMessageEvent(eventSink.saveMessage.bind(this));
    proxy.connectScreenshotEvent(eventSink.saveScreenshot.bind(this));
    test('fire log message', function () {
        console.log("firing message event") ;

        proxy.logMessage("This is a test log message");
    });
    test('fire log screenshot', function () {
        console.log("firing screenshot event") ;
        proxy.logScreenshot("test.png");
    });
});
