
let recordStartTime = null;

function startRecord( name ) {
   console.log( "*", name );
   recordStartTime = process.hrtime();
}

function printRecord() {
    
   let recordTime = process.hrtime( recordStartTime );
   let ms = recordTime[0] * 1e9 + recordTime[1] / 1000;
   ms = Math.round(ms);
   ms = ms / 1000;
   console.log( `  ${ms}ms` );
}

function generateString( len ) {
   let chars = "abcdefghijklmnopqrstuvwxyz";
   let str = [];
   for( let i = 0; i < len; i++ ) {
      str.push( chars[ Math.floor(Math.random() * 26) ]);
   }
   return str.join("");
}

function indexSequentialChars( str ) {
   let a = 0;
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str[i];
      if( c === 'a' ) a++;
   }
   return a;
}

function indexSequentialCodes( str ) {
   let a = 0;
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str.charCodeAt(i);
      if( c === 97 ) a++;
      //a += c;
   }
   return a;
}

function buildDummyMap( str ) {
   let map = [];
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str[i];
      map[c] = (map[c] || 0) + 1;
   }
   return map;
}

function buildDummyMap2( str ) {
   let map = {};
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str[i];
      map[c] = (map[c] || 0) + 1;
   }
   return map;
}

function buildDummyMap3( str ) {
   let map = [];
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str.charCodeAt(i);
      map[c] = (map[c] || 0) + 1;
   }
   return map;
}

function buildDummyMap4( str ) {
   let map = new Array( 256 ).fill(0);
   let len = str.length;
   for( let i = 0; i < len; i++ ) {
      let c = str.charCodeAt(i);
      map[c]++;
   }
   return map;
}

const test10000 = generateString( 10000 );
const testIters = 5000;

let sum = 0;

startRecord( "Sequential Characters" ); {
   for( let i = 0; i < testIters; i++ ) 
      sum += indexSequentialChars( test10000 );
} printRecord();

startRecord( "Sequential Codes" ); {
   for( let i = 0; i < testIters; i++ ) 
      sum += indexSequentialCodes( test10000 );
} printRecord();


startRecord( "Index Array With Char" ); {
   for( let i = 0; i < testIters; i++ ) 
      buildDummyMap( test10000 );
} printRecord();

startRecord( "Index Object With Char" ); {
   for( let i = 0; i < testIters; i++ ) 
      buildDummyMap2( test10000 );
} printRecord();

startRecord( "Index Array With Code" ); {
   for( let i = 0; i < testIters; i++ ) 
      buildDummyMap3( test10000 );
} printRecord();

startRecord( "Index Initialized Array With Code" ); {
   for( let i = 0; i < testIters; i++ ) 
      buildDummyMap4( test10000 );
} printRecord();

console.log( sum );