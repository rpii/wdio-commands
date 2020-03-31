const concat = require('concat');
concat(["./src/wdio-commands-api.d.ts.stub" , "./lib/wdio-commands.d.ts"], "./lib/wdio-commands-api.d.ts")
    .then(result => console.log(result));