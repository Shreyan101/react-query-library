import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getPaginatedData = (pageId) => {
  return axios.get(`http://localhost:4000/hotels/?_limit=4&_page=${pageId}`);
};

const HotelPagePagination = () => {
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
    <div style={{ width: '100%', backgroundColor: 'black', height: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hotelData?.data?.map((hotel) => (
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
        ))}
      </div>
      <div>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 7}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default HotelPagePagination;
