import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { signinUser, signupUser } from "../../api";
import { AxiosError } from "axios";
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

const signin = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof signupUser>["0"]
  >(signinUser, {
    onSuccess: () => router.push("/"),
  });

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <Container>
        <Title>Signin</Title>
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
            <Button type="submit">Signin</Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default signin;
