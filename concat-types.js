const concat = require('concat');
concat(["./wdio-commands-api.d.ts.stub" , "./lib/wdio-commands.d.ts"], "./wdio-commands.d.ts")
    .then(result => console.log(result));