import { useForm } from "react-hook-form";
import { SignUpData, signUpSchema } from "../../Types";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { UseAuthContext } from "../../context/AuthContext";

export const LoginForm = () => {
  const { handleSubmit, register } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const { loginLoading, loginUser } = UseAuthContext();

  const handleLogin = (data: SignUpData) => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
      <label htmlFor="email" className=" text-base-content font-medium text-sm gap-2 flex flex-col">
        Email address
        <input {...register("email")} id="email" name="email" type="email" required className=" input textarea-md w-full" />
      </label>
      <label htmlFor="email" className=" text-base-content font-medium text-sm gap-2 flex flex-col">
        Password
        <input {...register("password")} id="password" name="password" type="password" required className=" input textarea-md w-full" />
      </label>

      <button disabled={loginLoading} type="submit" className="btn btn-primary w-full">
        {loginLoading ? "Loging in ... " : "Login"}
      </button>
    </form>
  );
};
