# store-buddy

**store-buddy** is a portable, type-safe and well-documented wrapper for [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Use _one_ reference to a stored item in localStorage or sessionStorage across your entire project, while ensuring that the stored item's type and/or object structure is not changed, to prevent unexpected behaviour and bugs.

## Installation

```sh
npm install store-buddy
```

## Usage

```ts
import storeBuddy from 'store-buddy';

// Initialise an entry in localStorage with the key 'site-data' and save an
// string ("hello world") to that entry as its value
const data1 = storeBuddy('site-data').init('hello world');
data1.load(); // returns the string saved at the 'site-data' key: "hello world"

// The same as above, except with the addition of type safety
const data2 = storeBuddy<string>('site-data-2').init('hello world');
data2.save('hello ye olde worlde'); // overwrite old value with new value of the same type
data2.save(123); // this is invalid! (type of new value is not string)

// Clear all data attributed to each key, for the sake of cleanliness :)
data1.clear();
data2.clear();

// Load the first entry again, but it's been erased(!) (via clear()) so an error
// is thrown instead (better to have the string as expected than a null value!)
data1.load();

// The option of using sessionStorage instead of localStorage is also available
// with a second boolean argument in the main function
const data3 = storeBuddy('site-data', true).init(
  'I only last as long as a single user session!'
);
```

## Contributions & bug reports

All contibutions are welcome, such as ideas for additional features, fixing mistakes in the Readme & documentation, or an issue which details a bug that has been found. Please open an issue if you wish to contribute.

## License

MIT, [see license file](LICENSE) for details.
