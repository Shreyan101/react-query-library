## React Query

- Library for fetching data in react application.

- In React there is no specific pattern to fetch data in react application

- State Management Librariesare not great for working with asynchronous state or server state

- In client state - Persistent in your app memory and accessing or updating it is synchronous

- Server state - Persistent remotely and requires asynchronous APIs for fetching or updating has shared ownership
    Data can be updated by someone else without your knowledge

- UI data may not be in sync with the remove server/database data

- It becomes challenging when we have to deal with caching , deduplication of multiple requests for the same data, updating stale data in the background, performance optimizations in pagination and lazy loading etc.

- react query have so much intelligence built in that it makes easy for us to handle all these usecase easy.
