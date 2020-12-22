# store-buddy

**store-buddy** is a wrapper for [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). A stored item of data is instantiated from a class, thus providing a single exportable object across your project to use as the reference to the stored item. Type safety is also granted for TypeScript developers, ensuring that your item is not interpreted as a different type from what you would expect.

## Installation

```sh
npm install store-buddy
```

## Usage

```ts
import sb from 'store-buddy';

const data = new sb.Persistent('site-data', { foo: true });
data.get(); // returns object of type { foo: boolean; }

data.set({ foo: false }); // valid (argument type is same object)
data.set(123); // invalid (argument type is number)

data.remove(); // clear all data attributed to the key "site-data"

// The same methods and behaviour exist in another class, but data lasts only as long as a single session
const sessionData = new sb.Session('site-data-session', { foo: true });
```

## Limitations

Due to the way TypeScript works under-the-hood, there is currently **one** limitation to this library that you should be aware of.

- You cannot extend objects (i.e. set new data that contains the properties of the old object alongside new properties):

```ts
import sb from 'store-buddy';

const data = new sb.Persistent('site-data', { foo: true });
data.set({ foo: false, bar: false }); // ts(2345) error ("Argument of type '<x>' is not assignable to parameter of type '<y>'")
```

This is because the type of the data is set at instantiation of the class using a [type parameter](https://www.typescriptlang.org/docs/handbook/generics.html), to provide type hinting and type safety. Unlike function parameters, type parameters cannot be modified from within a class, method (etc) so when the type of the data is set at instantiation, it sticks.

If you want to add / remove a property of an object or simply overwrite the data with new data of a different type, just instantiate the class again:

```ts
const newData = new sb.Persistent('site-data', { foo: true, bar: false }); // this will overwrite the entry in localStorage with the new object
```

When new limitations are found, I'll be sure to update this section with work-arounds.

## Contributions & bug reports

All contibutions are welcome, such as ideas for additional features, fixing spelling mistakes in the Readme & documentation, or an issue which details a bug that has been found. Please open an issue if you wish to contribute.

## License

MIT, [see license file](LICENSE) for details.
