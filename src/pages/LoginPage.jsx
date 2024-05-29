import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const { login, logout } = useAuth();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    if (data.password === "password" && data.username === "admin") {
      login(data.username);
    } else {
      <Alert status="success" variant="subtle">
        <AlertIcon />
        Wrong Password
      </Alert>;
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input {...register("username", { required: true })} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input {...register("password", { required: true })} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
