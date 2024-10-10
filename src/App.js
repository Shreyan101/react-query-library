import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelPage from './pages/HotelPage';
import HotelDetail from './pages/HotelDetail';
import HotelPagePagination from './pages/HotelPagePagination';
import HotelPageInfiniteScroll from './pages/HotelPageInfiniteScroll';
import HotelPageInfiniteScrollV2 from './pages/HotelPageInfiniteScrollV2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/hotel' element={<HotelPage />} />
        <Route exact path='/hotel/:hotelId' element={<HotelDetail />} />
        <Route
          exact
          path='/hotel/pagination'
          element={<HotelPagePagination />}
        />
        <Route
          exact
          path='/hotel/infinitescroll'
          element={<HotelPageInfiniteScroll />}
        />
        <Route
          exact
          path='/hotel/hotelsinfinitescrollv2'
          element={<HotelPageInfiniteScrollV2 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
