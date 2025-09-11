import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../slices/authSlice";
import { type RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate("/board");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError())
  },[dispatch])

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser(values) as any);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-500"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-500"
              />

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full py-3 font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
