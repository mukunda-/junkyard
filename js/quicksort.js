///////////////////////////////////////////////////////////////////////////////
class QuickSort {
   //--------------------------------------------------------------------------
   // Returns the value at the index of a sorted list.
   // `values` is an array that will be modified - partially sorted - to find
   //  the Kth lowest value (index).
   static select( values, index ) {
      return this.quickselect( values, index, 0, values.length - 1 );
   }
   
   //--------------------------------------------------------------------------
   // Sort the given values in-place.
   static sort( values ) {
      return this.quicksort( values, 0, values.length - 1 );
   }
   
   //--------------------------------------------------------------------------
   // Quicksort implementation.
   static quicksort( values, lo, hi ) {
      if( lo < hi ) {
         let p = this.partition( values, lo, hi );
         this.quicksort( values, lo, p );
         return this.quicksort( values, p + 1, hi );
         // Return just in case for tailcall.
      }
   }
   
   //--------------------------------------------------------------------------
   // Returns the median of values sorted. This modifies the values given. Copy
   //  the array if that isn't desired.
   static median( values ) {
      let lo = 0;
      let hi = values.length - 1;
      let k = Math.floor(values.length / 2 - 0.5);
      if( (values.length & 1) === 1 )
         return this.quickselect( values, k, lo, hi );
      else
         return this.quickmedian( values, k, lo, hi );
   }
   
   //-----------------------------------------------------------------------------
   // Quickselect function. Find the kth value in A that is known to be between
   //  `lo` and `hi` inclusive.
   static quickselect( A, k, lo, hi ) {
      if( lo === hi ) return A[lo];
      
      let p = this.partition( A, lo, hi );
      if( k <= p ) {
         return this.quickselect( A, k, lo, p );
      } else { // k > p
         return this.quickselect( A, k, p + 1, hi );
      }
   }
   
   //-----------------------------------------------------------------------------
   // Implementation for finding median. Use median().
   static quickmedian( A, k, lo, hi ) {
      //if( lo === hi ) return A[lo]; // is this required...?
      
      let p = this.partition( A, lo, hi );
      if( k + 1 <= p ) {
         return this.quickmedian( A, k, lo, p );
      } else if( k > p ) {
         return this.quickmedian( A, k, p + 1, hi );
      } else {
         // The numbers sit on opposite sides of the partition, so use two selects
         //  to find them. This should always happen eventually.
         return ( (this.quickselect( A, k, lo, p ) 
                 + this.quickselect( A, k + 1, p + 1, hi )) / 2 );
      }
   }
   
   //-----------------------------------------------------------------------------
   // Tony Hoare's Partition Scheme.
   static partition( A, lo, hi ) {
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
}

///////////////////////////////////////////////////////////////////////////////

//-----------------------------------------------------------------------------
// An alternate O(n log n) implementation to test against.
let medianSafe = (arr) => {
   // doesn't modify arr
   let a = arr.slice();
   a.sort( (a,b) => a-b );
   let mid = Math.floor(a.length / 2 - 0.5);
   if( a.length % 2 === 1 ) {
      return a[mid];
   } else {
      return (a[mid] + a[mid+1]) / 2;
   }
}

//-----------------------------------------------------------------------------
let medianTest = (arr) => {
   let m1 = medianSafe( arr );
   let m2 = QuickSort.median( arr ); // this modifies arr.
   
   if( m1 != m2 ) console.log( "failed test", arr, m1, m2 );
}

//-----------------------------------------------------------------------------

medianTest( [1,2,3,4,5] );
medianTest( [1,2,3,4,5,6] );
medianTest( [-3,-9,25,1,2,76,7,2,2,888,4,2,4,66] );
medianTest( [-3,25,1,2] );
medianTest( [1,2,2,2,2,3,43,4,4,4,4,4,5,5,5,5,5,6,7,8,9,11] );
medianTest( [6,6,6,6,6,6,999,999] );
medianTest( [-4,-4,-4,-4,-4,6,999,999] );

{
   // Testing differentt sizes with a negative portion.
   let testarr = [];
   for( let i = 0; i < 99; i++ ) {
      testarr.push(i - 40);
      medianTest( testarr );
   }
}


{
   // Testing random length random sequences.
   for( let i = 0; i < 99; i++ ) {
      let testarr = [];
      let length = 20 + Math.floor( Math.random() * 100 );
      for( let j = 99; j >= 0; j-- ) {
         testarr[j] = ( -9999 + Math.random() * 9999 * 2 );
      }
      medianTest( testarr );
   }
}

///////////////////////////////////////////////////////////////////////////////
let a = [23,6,7,8,23,2,3,5,87,3,6,8,8,3,2,21,5,7,8,4,2,-1,-3,-6,-33,-999];

let b = a.slice();
b.sort( (a, b) => a - b );

QuickSort.sort( a );

for( const i in a ) {
   if( a[i] != b[i] ) console.log( "error" );
}

console.log( "DONE CONFIRMATION." );
