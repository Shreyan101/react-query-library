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

## In React Query, by default, it refetches the data every time the component mounts to ensure you're working with the latest data. If you want to prevent this behavior (i.e., avoid refetching on every mount), you can set the staleTime option. This controls how long the data remains "fresh" before being considered "stale" and refetching.

- To prevent refetching on mount, you can set a long staleTime, meaning the data will be considered fresh for the duration specified. You can also use refetchOnWindowFocus and refetchOnMount options to control more specific behavior.

```
-  const {
    data: supliers,
    isLoading: supplierIsLoading,
    error: supplierError,
    isError: supplierIsError,
  } = useQuery({
    queryKey: ['Suppliers'],
    queryFn: getsupliersData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
```

## Query Cache Feature of react query

- It is provided by the library
- By default every query result is cached for 5 min,  and react query relies on that cache for subsquent requests.
- For first time useQuery hook is fired for hotel data isLoading is set to true and a network request is sent to fetch the data, as soon as the request is completed it is cached using query key and queryFn as unique identifiers.
- now when you navigate to home and revisit hotel page react query will check if the data for the query already exist in the cache or not. if it does so the 
cached data will be immediately returned without isLoading set to true.
- However react query know that server data might have updated and cache might not have the latest data , so the background prefetch is triggered for the same query if the fetch is successfull the new data is updated in the UI.

## If isLoading flag is not changed so do we have any key to know that background refetching is happening ? 

- Yes, isFetching is the flag.

## what if we know database data is not going to change very often, In that case it doesnt make sense to make api call everytime we come on hotel page

- react query addresses this issue and help let us configured how long a data should remain fresh.

- we can add another property to useQuery hook , staleTime: time, by default value is 0 but we can keep time accn to our convinent.

  
```
-  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorMessage,
    isFetching: hotelIsFetching,
  } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => {
      return axios.get('http://localhost:4000/hotels');
    },
    staleTime: 5000,
  });
```

  ## polling

  - when require network call to be made at regular interval of time

  - lets say hotel data need to called every 2 sec, we have one property in useQuery hook known as refetchInterval, by default the value is false so it is not going to pull data at regular interval but it takes time in ms so if we want to pull data regularly at some interval so we need to add this proprty and time.

```
-   const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorMessage,
    isFetching: hotelIsFetching,
  } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => {
      return axios.get('http://localhost:4000/hotels');
    },
    refetchInterval: 2000,
  });
```

  - Another thing is , if we switch to another tab the polling stops so polling only continues as long as the current tab is in focus.

  - if we still want to pull the data even if user goes to other page we can use one property called refetchIntervalInBackground, we have to set it as true


  ## Fetch data manually when user event happens, for eg: clicked on btn

  - We don't want to make call when componet is mounted, we want to do this manuaaly.

  - we can add one property, enabled: false, it disables the automatic refetching any time when component gets mounted.

```
  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorMessage,
    isFetching: hotelIsFetching,
  } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => {
      return axios.get('http://localhost:4000/hotels');
    },
    enabled: false,
  });
  ```

  - we have refetch method provided by react query which can be used on handler function of btn to fetch the data.

    
```
    const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorMessage,
    isFetching: hotelIsFetching,
    refetch: getHotelData,
  } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => {
      return axios.get('http://localhost:4000/hotels');
    },
    enabled: false,
  });

   <button onClick={getHotelData}>Fetch Data</button>
```

   ## query by id using react query

```
  const { hotelId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => fetchHotelDetails(hotelId),
  });
  console.log('data', data);
```

- Every single query is considered as a separate query because we are passing id in it , lets say we pull data for 1dt and 2nd hotel data by clicking on those. 1st hotel query and 2nd are cached. if we go to 3rd hotel it will not pull data from cache as each query are different from other so we need to give unique query.

## Pagination

- placeholderData: keepPreviousData,

- Usually loading text is shown when we click on next page to fetch next data, to give more good user experience we can do is retaining the previous data waiting for new data to be loaded and then showing it we can do it by using placeholderData: keepPreviousData , it will help in retaining previous data and prevent loading to be shown.

- check HotelPagePagination folder for code
- 
```
const getPaginatedData = (pageId) => {
  return axios.get(`http://localhost:4000/hotels/?_limit=4&_page=${pageId}`);
};

  const [page, setPage] = useState(1);

  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
    error: hotelErrorMessage,
    isFetching: hotelIsFetching,
    refetch: getHotelData,
  } = useQuery({
    queryKey: ['hotels', page],
    queryFn: () => getPaginatedData(page),
    placeholderData: keepPreviousData,
  });
```

## Infinite scroll using react query

- we want to append the data once clicked on load more.

- useInfiniteQuery

- when using useInfiniteQuery, the query fn always receive an object and inside object we get pageParam property.

- whenever the component gets mounted on dom we need to tell react query the  first page that need to be fetched should start from 1.

- we have initialPageParam as property which can be set to 1

- we also have getNextPageParam - this method is used to calculate next page number. if there is no page left it return undefined. it has 2 parameter 

eg: (lastPage, allPages) - lastPage it contains the entire API response of the last , most recent data fetched.
allPages - It is an array of objects, each object is the entire API response of the past data fetches.


- hasNextPage - boolean which tells more pages are left or not

```
-  <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>

- const getPaginatedData = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/hotels/?_limit=4&_page=${pageParam}`);
};

  const {
    data: hotelData,
    isLoading: hotelLoading,
    isFetching: hotelIsFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['hotels-infinitescroll'],
    queryFn: getPaginatedData,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      // allPages conatins  bascially all pages fetched so far
      if (allPages.length < 16) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });
```


  #### working

  - First time when component gets mounted the data is fetched with initial pageParam to be 1 and as soon as fetching is done the getNextPageParam gets executed and stores nectPage value internally. as soon as 1st page fetching is done the allPages is going to have 1 page fetched so far.

  - when loadMore btn is clicked fetchNextPageMethod is called the saved value 2 is sent to pageParam, and same cycle is continued until last page is reached.

  ## How we can automatically fetch data while scrolling down

  - to demostrate this we are using - react-intersection-observer
  - npm i react-intersection-observer

  - check InFiniteScrollV2 page

```
   - const getPaginatedData = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/hotels/?_limit=10&_page=${pageParam}`
  );
};

  const { ref, inView } = useInView();

  const {
    data: hotelData,
    isLoading: hotelLoading,
    isFetching: hotelIsFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['hotelsinfinitescrollv2'],
    queryFn: getPaginatedData,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      // allPages conatins  bascially all pages fetched so far
      if (allPages.length < 7) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

   <div ref={ref} style={{ color: '##fff' }}>
          {isFetchingNextPage && 'Loading....'}
    </div>
```

## Mutations

## Instruct  react-query to automatically fetch the data once data is updated ( after post call )

- Doing manual refetch is one option, but what if we can do it automatically.

- we have a hook called useQueryClient.

- useQueryClient gives access to the queryClient which we have provided very start inside index.js.

- we have provided queryClient to entire application.

- we have onSuccess() method , we can nuse queryClient.incalidateQueries("hotels")
- 
```
//GET method
const getHotelsData = () => {
    return axios.get("http://localhost:4000/posts");
}

// POST method
const addHotels = (hotel) => {
    return axios.post("http://localhost:4000/posts", hotel);
}

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const queryClient = useQueryClient()

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["hotels"],
        queryFn: getHotelsData
    })

    const { mutate } = useMutation({
        mutationFn: addHotels,
           onSuccess: () => {
             queryClient.incalidateQueries("hotels")
         }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const hotel = { ....your data }
        mutate(hotel);
        setTitle("");
        setBody("");
    }
```

## Further optimizations in queryValidation ( post call - updating data )

- if we add any hotel and hit post we have a post request followed by get request.

- we are already getting the new added hotel object in response of post api, so why should we fetch the entire hotels again just to show one new item ?

- we can resolve this by , react-query let us take this response object and add it to the internal hotel cache list and show it instanteneously in browser so we don't have to make additional call.

```
-  const { mutate } = useMutation({
        mutationFn: addHotels,
           onSuccess: (newData) => {
             queryClient.setQueryData(["hotels"], (oldQueryData) => {
              return {
                ...oldQueryData,
                data: [...oldQueryData.data, newData.data]
              }
             })
         }
    });
```

## How to do optimistic update using react-query

- updating the state before performing a mutation under the assumption that nothing can go wrong

- It gives impression that app is blazing fast

- we need 3 methds here - onMutate() onError() onSettled()

- onMutate() method is called before the mutation function is fired  and it receives the same payload/ variables taht mutation function receives.
To cancel any outgoing refetches so they donot override our optimistic updates so we can do it by 

await queryclient.cancelQueries(["hotels"]); 

```
    const { mutate } = useMutation({
        mutationFn: addPost,
        onMutate: async (newPost) => {
            await queryClient.cancelQueries(["hotels"]);
            const previousPostData = queryClient.getQueryData(["hotels"]);

            queryClient.setQueryData(["hotels"], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }]
                }
            })

            return {
                previousPostData
            }
        },
        onError: (_error, _post, context) => {
            queryClient.setQueryData(["hotels"], context.previousPostData)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["hotels"]);
        }
    });
```
