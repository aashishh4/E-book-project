import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });

  function submit(values) {
    const obj = {
      email: values.email,
      password: values.password,
    };

    axios
      .post('http://144.126.210.187:8088/api/login-user', obj)
      .then((res) => {
        if (res.data.status === true) {
          toast.success("Login Sucessfully")
          setTimeout(() => {
            login();
            navigate('/bookpage');
          }, 2000);
        }else{
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
        toast.error(error?.data?.message);
      })
      ;
  }

  return (
    <>
      <div className="MainLogo">
        <img src="logoas.svg" alt="Logo" />
      </div>
      <div className="LoginPage">
        <h1>Log in</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="LoginInput">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <button type="submit">Login</button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
