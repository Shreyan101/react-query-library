import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const fetchHotelDetails = (hotelId) => {
  return axios.get(`http://localhost:4000/hotels/${hotelId}`);
};

const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => fetchHotelDetails(hotelId),
  });
  console.log('data', data);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <h2>{data?.data?.name}</h2>
        <h2>{data?.data?.costPerNight}</h2>
      </div>
    </div>
  );
};

export default HotelDetail;
