var _ = require('lodash');
var moment = require('moment')
const callsites = require('callsites');
var path = require('path')
var userHelper = require('./helpers')
const winston = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const infoLogger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: '\x1b[32m\x1b[1m[INFO]\x1b[0m\t', message: false }),
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        printf(info => `${info.label} ${info.timestamp}: ${info.message}`)
    ),
    transports:[
        new winston.transports.Console()
    ]
})

const errorLogger = winston.createLogger({
    level: 'error',
    format: combine(
        label({ label: '\x1b[31m\x1b[1m[ERROR]\x1b[0m\t', message: false }),
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        printf(info => `${info.label} ${info.timestamp}: ${info.message}`)
    ),
    transports:[
        new winston.transports.Console()
    ]
})

console.log = (function() {
    // var original = console.log;
    return function() {
        var callerFile = path.basename(callsites()[1].getFileName());
        var lineNumber = callsites()[1].getLineNumber()
        var finalMessage = "\x1b[34m" + callerFile + "| " + lineNumber + "  \x1b[0m"
        if(arguments[0] !== undefined && typeof arguments[0] == 'object') {
            //User has supplied object as first parameter
            //Check if bot id and user id can be extracted
            var data = arguments[0]
            var streamId = _.get(data, 'context.session.opts.streamId');
            var userId = userHelper.getUserId(data)
            finalMessage += "\x1b[35m" + streamId + " "+ userId + "\x1b[0m " + combineArguments(1, arguments.length, arguments)
        } else {
            finalMessage += "\x1b[0m"+combineArguments(0, arguments.length, arguments)
        }
        // arguments[0] = finalMessage + "\x1b[0m"
        infoLogger.info(finalMessage)
        // original.apply(console, arguments)
    }
})();

console.error = (function() {
    // var original = console.error;
    return function() {
        var callerFile = path.basename(callsites()[1].getFileName());
        var lineNumber = callsites()[1].getLineNumber()
        var finalMessage = "\x1b[1m\x1b[41m\x1b[37m"+ callerFile + "| " + lineNumber + " "
        if(arguments[0] !== undefined && typeof arguments[0] == 'object') {
            var data = arguments[0]
            var streamId = _.get(data, 'context.session.opts.streamId');
            var userId = userHelper.getUserId(data)
            finalMessage += streamId + " "+ userId + " "+ combineArguments(1, arguments.length, arguments) + "\x1b[0m"
        } else {
            finalMessage += combineArguments(0, arguments.length, arguments) + "\x1b[0m"
        }
        errorLogger.error(finalMessage)
        // original.apply(console, arguments)
    }
})();

function combineArguments(start,end,args) {
    var result = ""
    for(var i=start;i<end;i++) {
        if(args[i] !== undefined) {
            if(typeof args[i] == 'object') {
                result += JSON.stringify(args[i])
            } else {
                result += args[i]
            }
        }
    }
    return result
}