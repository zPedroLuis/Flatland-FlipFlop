'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end',_ => {
    inputString = inputString.replace(/\s*$/,'')
    .split('\n')
    .map(str => str.replace(/\s*$/,''));

    main();
    });

function readLine() {
    return inputString[currentLine++]
}

// Complete a função flatlandSpaceStations abaixo.

//n = numero de cidades
//int n[m] = os indices de cidades com estação espacial
function flatlandSpaceStations(n, c) {
    
    c.sort((a, b) => a - b);
    
    let maxDistance = 0;
    
    
    for (let i = 0; i < n; i++) {
        
        if (c.includes(i)) {
            continue; 
        } else {
            let distance;
            
            for (let j = 0; j < c.length; j++) {
                
                if (i < c[0]) {
                    distance = c[0] - i;
                    break;
                }
                
                else if (i > c[c.length - 1]) {
                    distance = i - c[c.length - 1];
                    break;
                }
                
                else if (i > c[j] && i < c[j + 1]) {
                    distance = Math.min(i - c[j], c[j + 1] - i);
                    break;
                }
            }
            
            maxDistance = Math.max(maxDistance, distance);
        }
    }
    
    return maxDistance;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const nm = readLine().split('');
    const n = parseInt(nm[0], 10);
    const m = parseInt(nm[1], 10);
    const c = readLine().split('').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");
    ws.end();
}


