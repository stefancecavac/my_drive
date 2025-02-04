export const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-5">
      <label htmlFor="email" className=" text-base-content font-medium text-sm gap-2 flex flex-col">
        Email address
        <input id="email" name="email" type="email" required className=" input textarea-md w-full" />
      </label>
      <label htmlFor="email" className=" text-base-content font-medium text-sm gap-2 flex flex-col">
        Password
        <input id="password" name="password" type="password" required className=" input textarea-md w-full" />
      </label>

      <button type="submit" className="btn btn-primary w-full">
        Sign up
      </button>
    </form>
  );
};
