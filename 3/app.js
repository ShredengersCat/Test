// 1 deepEqual function
deepEqual({name: 'test'}, {name: 'test'}) // output true
deepEqual({name: 'test'}, {name: 'test1'}) // output false
deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
deepEqual({name: 'test'}, {name: 'test', age: 10}) // false

function deepEqual (obj1, obj2) {
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

// 2 chunkArray function
chunkArray([1,2,3,4,5,6,7,8], 3);
function chunkArray(array, upperLimit) {
    let arrayChunks = [];
    let lowerLimit = 0;
    let iterations = Math.ceil(array.length/upperLimit);
    for (let i = 0; i < iterations; i++) {
        arrayChunks.push(array.slice(lowerLimit,upperLimit));
        lowerLimit = upperLimit;
        upperLimit += upperLimit;
    }
    return arrayChunks;
}

// 3 bulkRun
const f1 = () => 1;
const f2 = (a) => a;
const f3 = (...args) => new Promise(resolve => { setTimeout(resolve, 1000, args) });

bulkRun(
    [
        [f1, []],
        [f2, [2]],
        [f3, [3, 4]]
    ]
).then(); // Output: [1, 2, [3, 4]]

function bulkRun(array) {
    let promises = array.map(e => e[0](...e[1]));
    return Promise.all(promises);
}

//4 Min Matrix multiply
let matrix = [
    [5, 3, 6],
    [7, 11, 2],
    [15, 9, 4]
];

// console.log(multiplyMatrixMin(matrix));

function multiplyMatrixMin(matrix) {
    const min = Math.min(...matrix.reduce((res, cur) => res.concat(cur)));
    const m = matrix.length, n = matrix[0].length;
    let result = [];

    for (let i = 0; i < m; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] % 2 !== 0) {
                result[i][j] = min*matrix[i][j];
            } else {
                result[i][j] = matrix[i][j];
            }
        }
    }

    return result;
}

// 5 arrayToObject

let arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

function arrayToObject(array) {
    let result = Object.fromEntries(array);
    for (let key in result) {
        if (Array.isArray(result[key])) {
            result[key] = arrayToObject(result[key]);
        }
    }
    return result;
}

// console.log(arrayToObject(arr));

// 6 getBase64FromUrl

let getImageBlob = function(url){
    return new Promise( async resolve=>{
        let response = await fetch( url );
        let blob = response.blob();
        resolve( blob );
    });
};

let blobToBase64 = function(blob) {
    return new Promise( resolve=>{
        let reader = new FileReader();
        reader.onload = function() {
            let dataUrl = reader.result;
            resolve(dataUrl);
        };
        reader.readAsDataURL(blob);
    });
}

let getBase64FromUrl = async function( url ){
    let blob = await getImageBlob( url );
    let base64 = await blobToBase64( blob );
    return base64;
}

// getBase64FromUrl('https://lh3.googleusercontent.com/i7cTyGnCwLIJhT1t2YpLW-zHt8ZKalgQiqfrYnZQl975-ygD_0mOXaYZMzekfKW_ydHRutDbNzeqpWoLkFR4Yx2Z2bgNj2XskKJrfw8')
//     .then(base64Image => console.log(base64Image))

// 7 objectToArray

// console.log(objectToArray(arrayToObject(arr)));

function objectToArray(obj) {
    let result = Object.entries(obj);
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++){
            if (typeof result[i][j] === "object") {
                result[i][j] = objectToArray(result[i][j]);
            }
        }
    }
    return result;
}

// 8 nodeChildCount

const div = document.createElement('div');
const p = document.createElement('p');
const span = document.createElement('span');
p.appendChild(span);
div.appendChild(p);

console.log(nodeChildCount(div)); // 2
//nodeChildCount(div, 1); // 1
//nodeChildCount(div, 2); // 2

function nodeChildCount(node, deep = null) {
    let result = 0;
    result += node.childElementCount;
    if (typeof deep === "object") {
        if (node.childNodes[0].childElementCount > 0) {
            result += nodeChildCount(node.childNodes[0]);
        } else {
            return result;
        }
    } else if (deep > 0) {
        if (node.childNodes[0].childElementCount > 0) {
            result += nodeChildCount(node.childNodes[0], deep);
        } else {
            return result;
        }
    } else {
        return result;
    }
}

//  9 removeDuplicate

let x = "Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Double Double Double";

String.prototype.removeDuplicate = function () {
    let str = this.split(" ");
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if (result.indexOf(str[i]) === -1) {
            result.push(str[i]);
        }
    }
    return result.join(", ");
}

// 10 reliableMultiply

function NotificationException(a,b) {
    this.name = "NotificationException";
    this.action = primitiveMultiply(a, b);
}

function ErrorException() {
    this.name = "ErrorException";
    this.action = "Error";
}

function primitiveMultiply(a, b) {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    } else if (rand > 0.85) {
        throw new ErrorException();
    } else {
        throw new NotificationException(a, b);
    }
}

function reliableMultiply(a, b) {
    try {
        return primitiveMultiply(a,b);
    } catch (e) {
        if (e.name === "ErrorException") {
            return e.action;
        } else if (e.name === "NotificationException") {
            return e.action;
        } else {
            throw e;
        }
    }
}

