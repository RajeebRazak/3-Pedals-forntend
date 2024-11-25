import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  //const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

    const SignupSchema = Yup.object().shape({
        firstname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastname: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .max(10, 'Too Long Password')
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password must match')
          .required('Required'),
          phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, 'phonenumber must contain only digits')
          .min(10, 'phonenumber must be at least 10 digits')
          .max(10, 'Invalid phonenumber')
          .required('Required'),
      });
      
  const onSubmit = async (values) => {
   
    try{
      /* //send the form data to backend  */
      const response = await axios.post("http://localhost:3000/auth/signup", values);
      
      alert("Successfully Registered");
      navigate("/login");
    } catch(error) {
    console.error("Error:", error);
    alert("Registration failed. Please try again")
  } 

  };
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
  <Formik
    initialValues={{
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    }}
    validationSchema={SignupSchema}
        onSubmit={onSubmit}
  >
    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-md">
    
      <div className="mb-4 text-2xl font-semibold text-center text-blue-500">
      3Pedals Detailing
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
            First Name
          </label>
          <Field
            type="text"
            name="firstname"
            placeholder="First Name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="firstname" component="div" className="text-red-500 text-xs italic mt-1" />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Last Name
          </label>
          <Field
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs italic mt-1" />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
            Email
          </label>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic mt-1" />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
            Phone Number
          </label>
          <Field
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="phonenumber" component="div" className="text-red-500 text-xs italic mt-1" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
          Password
        </label>
        <Field
          type="password"
          name="password"
          placeholder="Password"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <Field
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic mt-1" />
      </div>
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline text-base w-auto"
      >
        Submit
      </button>
    </Form>
  </Formik>
</div>

  );
}

export default Register;
