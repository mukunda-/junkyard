function quicksort( A, lo, hi ) {
   if( lo === undefined ) {
      lo = 0;
      hi = A.length - 1;
   }
   
   if( lo < hi ) {
      let p = partition( A, lo, hi );
      quicksort( A, lo, p );
      quicksort( A, p + 1, hi );
   }
}

// Tony Hoare's Partition Scheme
function partition( A, lo, hi ) {
   let pivot = A[Math.floor( (lo + hi) / 2 )];
   let i = lo - 1
   let j = hi + 1
   while( true ) {
      do {
         i++;
      } while( A[i] < pivot );
      do {
         j--;
      } while( A[j] > pivot );
      
      if( i >= j ) {
         return j
      }
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
   }
}

///////////////////////////////////////////////////////////////////////////////
let a = [23,6,7,8,23,2,3,5,87,3,6,8,8,3,2,21,5,7,8,4,2,-1,-3,-6,-33,-999];

let b = a.slice();
b.sort( (a, b) => a - b );

quicksort( a );

for( const i in a ) {
   if( a[i] != b[i] ) console.log( "error" );
}

a = [-3,25,1,2]
quicksort(a);
console.log(a);