import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Navbar from "./section/NavBar";
import BottomBar from "./section/BottomBar";
import SearchTests from "./page/SearchTests";
import TestDetails from "./page/TestDetails";
import ClinicDetails from "./page/ClinicDetails";
import BookingAppointment from "./page/BookingAppointment";
import MyBookings from "./page/MyBookings";
import Reports from "./page/Reports";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";

function App() {
  const { pathname } = useLocation();

  const hideBars = pathname === "/" || pathname === "/auth_register";

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="flex h-screen w-full max-w-md flex-col bg-white shadow-lg">
        {!hideBars && (
          <div className="shrink-0">
            <Navbar />
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth_register" element={<Register />} />
            <Route path="/db" element={<Dashboard />} />

            <Route path="/search_test" element={<SearchTests />} />
            <Route path="/test_details/:id" element={<TestDetails />} />
            <Route path="/clinic_details" element={<ClinicDetails />} />
            <Route
              path="/booking_apponitment/:testId"
              element={<BookingAppointment />}
            />
            <Route path="/my_bookings" element={<MyBookings />} />
            <Route path="/my_reports" element={<Reports />} />
            <Route path="/my_profile" element={<Profile />} />
          </Routes>
        </main>

        {!hideBars && (
          <div className="shrink-0">
            <BottomBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
