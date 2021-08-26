const express = require('express')
const {performance} = require('perf_hooks');
const app = express()

function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1;
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}

// app.get('/', function (req, res) {
//     // console.log(req);
//     // var user_id = req.params['id']
//     // console.log(req.query.id)
//
//     var v1 = performance.now();
//     id = req.query.id
//     if (id == null){
//         // console.log("There is no id");
//     }else{
//         var str = '';
//         for(var i=0; i<id; i++){
//             str += "a";
//         }
//         str += "c";
//         // console.log(str);
//         var myRe =/^((a)*)+b$/;
//         var myArray = myRe.test(str);
//         // console.log(myArray);
//     }
//     var v2 = performance.now();
//     // console.log("total time  taken = "+(v2-v1)+"milliseconds");
//     // res.send('Hello World');
//     res.send("total time  taken = "+(v2-v1)+" milliseconds")
// })

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
        // console.log("There is no id");
    }else{
        rsa_computation(id);
    }
    var v2 = performance.now();
    // console.log("total time  taken = "+(v2-v1)+"milliseconds");
    // res.send('Hello World');
    res.send("total time  taken = "+(v2-v1)+" milliseconds")
})


var port = process.env.PORT || 3000;
app.listen(port);
