import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getPaginatedData = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/hotels/?_limit=4&_page=${pageParam}`);
};

const HotelPageInfiniteScroll = () => {
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
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default HotelPageInfiniteScroll;
