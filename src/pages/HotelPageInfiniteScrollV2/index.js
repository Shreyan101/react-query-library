import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const getPaginatedData = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/hotels/?_limit=10&_page=${pageParam}`
  );
};

const HotelPageInfiniteScrollV2 = () => {
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (hotelLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Loading.....</h2>
      </div>
    );
  }

  console.log('hotelData', hotelData);
  console.log('hotelLoading', hotelLoading);
  console.log('hotelIsFetching', hotelIsFetching);

  return (
    <div style={{ width: '100%', backgroundColor: 'black', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hotelData?.pages?.map((page) =>
          page?.data?.map((hotel) => (
            <Link
              to={`/hotel/${hotel?.id}`}
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
              key={hotel?.id}
            >
              <div
                style={{
                  padding: '20px',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  maxWidth: '300px',
                }}
              >
                || Name - {hotel?.name} || Cost Per Night- {hotel?.costPerNight}{' '}
                ||
              </div>
            </Link>
          ))
        )}
        <div ref={ref} style={{ color: '#fff' }}>
          {isFetchingNextPage && 'Loading....'}
        </div>
      </div>
    </div>
  );
};

export default HotelPageInfiniteScrollV2;
