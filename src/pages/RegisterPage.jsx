import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };

  return (
    <>
      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
              <div className="mb-6">
                <label htmlFor="firstName" className="block mb-2">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First Name is Required",
                  })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none  ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.firstName && (
                  <div role="alert" className="text-red-600">
                    {errors.firstName.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="lastName" className="block mb-2">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last Name is Required",
                  })}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none  ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.lastName && (
                  <div role="alert" className="text-red-600">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email Address is Required",
                  })}
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none  ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.email && (
                  <div role="alert" className="text-red-600">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is Required",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none  ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.password && (
                  <div role="alert" className="text-red-600">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <p>{errors?.root?.random?.message}</p>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Create Account
                </button>
              </div>
              <p className="text-center">
                Already have account?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
