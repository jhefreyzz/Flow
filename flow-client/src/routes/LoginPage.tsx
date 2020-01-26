import React, { useState, useEffect, Fragment, memo } from "react";
import * as Yup from "yup";
import {
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  AlertIcon,
  Alert,
  Image,
  Text
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { FaGoogle } from "react-icons/fa";
import { useFormik } from "formik";

import logo from "../logo.svg";
import { RootState } from "../store";
import Loader from "../components/shared/Loader";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const firebase = useFirebase();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const history = useHistory();
  const [isLoading, setLoading] = useState();
  const [authError, hasAuthError] = useState();
  const { handleChange, handleSubmit, errors, values, touched } = useFormik<
    LoginFormValues
  >({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: values => {
      setLoading(true);
      firebase.login(values).catch(err => hasAuthError(err));
    }
  });

  const googleLogin = () => {
    firebase
      .login({ provider: "google", type: "popup" })
      .catch(err => hasAuthError(err.message));
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        history.push("/");
      }
    });
  }, [firebase, history]);

  if (!isLoaded(auth)) {
    return <Loader />;
  }

  return (
    <Fragment>
      {isEmpty(auth) && isEmpty(auth) && (
        <Box bg="gray.100" height="100vh">
          <Box marginX="auto" marginY="0" maxWidth="380px">
            <Image src={logo} />
            <Box
              bg="white"
              padding="2rem"
              boxShadow="2px 2px 10px 0px rgba(148,123,148,1);"
            >
              <Text
                textAlign="center"
                fontSize="24px"
                color="gray.500"
                padding="1.5rem"
              >
                Sign in to Flow
              </Text>
              {authError && (
                <Alert status="error" marginBottom="0.5rem">
                  <AlertIcon />
                  {authError.message}
                </Alert>
              )}
              <form onSubmit={handleSubmit} autoComplete="off">
                <FormControl
                  marginBottom="2rem"
                  isInvalid={Boolean(touched.email && errors.email)}
                >
                  <Input
                    name="email"
                    placeholder="Enter email address..."
                    onChange={handleChange}
                    value={values.email}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  marginBottom="2rem"
                  isInvalid={Boolean(touched.password && errors.password)}
                >
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                    onChange={handleChange}
                    value={values.password}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  variantColor="green"
                  isFullWidth
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
                <Text fontSize="xs" paddingY="1rem" textAlign="center">
                  OR
                </Text>
                <Button
                  onClick={googleLogin}
                  leftIcon={FaGoogle}
                  isFullWidth
                  variantColor="yellow"
                  color="white"
                  variant="solid"
                >
                  Sign in with Google
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default memo(LoginPage);
