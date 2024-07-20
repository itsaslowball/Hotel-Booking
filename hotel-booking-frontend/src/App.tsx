import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout"
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./context/AppContext";
import { AddHotel } from "./pages/AddHotel";
import { MyHotels } from "./pages/MyHotels";
import { EditHotel } from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";


function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route path='/register' element={
          <Layout>
            <Register />
          </Layout>
        } />
        <Route path='/sign-in' element={
          <Layout>
            <SignIn />
          </Layout>
        } />

        <Route path="/search"
          element={ 
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route path="/detail/:hotelId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        
        {isLoggedIn && <>
          
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
               </Layout>
              
            } />

          <Route path='/add-hotels' element={
            <Layout>
              <AddHotel />
            </Layout>
          } />

          <Route path='/my-hotels' element={
            <Layout>
              <MyHotels />
            </Layout>
          } />

          <Route path='/my-bookings' element={
            <Layout>
              <MyBookings />
            </Layout>
          } />

          <Route path="/edit-hotel/:hotelId" element={
            <Layout>
              <EditHotel />
            </Layout>
          } />


        </>
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App