import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { signupUser } from "../../api";
import request from "axios";
import {
  Container,
  Title,
  Button,
  Paper,
  TextInput,
  Stack,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";

import Head from "next/head";
import { useRouter } from "next/router";

interface IUser {
  id: string;
  email: string;
}

type ErrorResponse = {
  errors: [{ message: string }];
};

const signup = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation<
    IUser,
    Error,
    Parameters<typeof signupUser>["0"]
  >(signupUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: (data) => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfully created account",
      });

      router.push("/auth/signin");
    },
    onError: (err) => {
      if (request.isAxiosError(err) && err.response) {
        // Is this the correct way?
        const errors = (err.response?.data as ErrorResponse).errors;

        errors.forEach((err, index) => {
          showNotification({
            title: `Error ${index + 1}`,
            message: err.message,
            sx: { backgroundColor: "red" },
            color: "white",
          });
        });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Container>
        <Title>Sign Up</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Password"
                placeholder="password"
                required
                {...form.getInputProps("password")}
              />
            </Stack>
            <Button type="submit">SignUp</Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default signup;
