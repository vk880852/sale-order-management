import { Box, Flex, Button } from "@chakra-ui/react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ActiveOrders from "./pages/ActiveOrders.jsx";
import CompletedOrders from "./pages/CompletedOrders.jsx";
import { useAuth } from "./components/AuthContext.jsx";

function App() {
  const { user, logout } = useAuth();

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
         <Button as={NavLink} to="/active-orders">Active Sale Orders</Button>
         <Button as={NavLink} to="/completed-orders">Completed Sale Orders</Button>
        <ThemeToggle />
        {user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button as={NavLink} to="/login">
            Login
          </Button>
        )}
      </Flex>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/active-orders"
          element={user ? <ActiveOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/completed-orders"
          element={user ? <CompletedOrders /> : <Navigate to="/login" />}
        />
        <Route path="/" element={user ? <Navigate to="/active-orders" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/active-orders" : "/login"} />} />
      </Routes>
    </Box>
  );
}

export default App;
