import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const HotelPage = () => {
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
    <div style={{ width: '100%', backgroundColor: 'black' }}>
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
    </div>
  );
};

export default HotelPage;
