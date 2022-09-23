import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import useRequest, { ErrorResponse } from "../../hooks/use-request";
import ErrorMarkup from "../../components/ErrorMarkup";

export interface IUser {
  id: string;
  email: string;
}

const signin = () => {
  const router = useRouter();

  const { doRequest } = useRequest("/api/users/signin", "post");

  const mutation = useMutation<
    IUser,
    [{ message: string; field: string }],
    Parameters<typeof doRequest>["0"]
  >(doRequest);

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    mutation.mutate({ email, password });
  };

  if (mutation.isLoading) {
    return <div>Loading...</div>;
  }

  if (mutation.isSuccess) {
    router.push("/");
  }

  return (
    <>
      <h1>Sign In</h1>

      {mutation.isError && ErrorMarkup(mutation.error)}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </>
  );
};

export default signin;
