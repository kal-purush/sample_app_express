// const throng = require('throng')

const WORKERS = process.env.WEB_CONCURRENCY || 2

const PORT = process.env.PORT || 8080
//
// throng(WORKERS, start)
//
// function start(workid) {
//   const express = require('express')
//   const {performance} = require('perf_hooks');
//   const app = express()
//
//   function rsa_computation(limit) {
//       let p = 178542003245811211274167228297361192303886321036074276889145691522634525820185614278499562592134188995169731066418203258297035264969457638591284906658912408319763156912951486020761069099132619194489006875108217247513715271974383296142805846405783845170862140174184507256128825312324419293575432423822703857091;
//       let r = 187;
//           for (let i = 1; i < limit; i++) {
//             p=(p*p)%r;
//           }
//       return p;
//   }
//
//   app.get('/', function (req, res) {
//       var v1 = performance.now();
//       id = req.query.id
//       if (id == null){
//       }else{
//           rsa_computation(id);
//       }
//       var v2 = performance.now();
//       res.send("total time  taken = "+(v2-v1)+" milliseconds")
//   })
//   app.listen(PORT);
//   // console.log('Listening on', PORT)
// }


var cluster = require('cluster');

if(cluster.isMaster) {
    var numWorkers = WORKERS;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const express = require('express')
    const {performance} = require('perf_hooks');
    const app = express()

    function rsa_computation(limit) {
        let p = 178542003245811211274167228297361192303886321036074276889145691522634525820185614278499562592134188995169731066418203258297035264969457638591284906658912408319763156912951486020761069099132619194489006875108217247513715271974383296142805846405783845170862140174184507256128825312324419293575432423822703857091;
        let r = 187;
            for (let i = 1; i < limit; i++) {
              p=(p*p)%r;
            }
        return p;
    }

    app.get('/', function (req, res) {
        var v1 = performance.now();
        id = req.query.id
        if (id == null){
        }else{
            rsa_computation(id);
        }
        var v2 = performance.now();
        res.send("total time  taken = "+(v2-v1)+" milliseconds")
    })
    // app.listen(PORT);

    var server = app.listen(PORT, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}
