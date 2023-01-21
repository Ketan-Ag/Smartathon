import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './SignIn.css';
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
// import UserContext from '../../Context/UserContext';
// import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignIn (props) {
  let navigate = useNavigate()
  // const usercontext = useContext(UserContext);
  // const {setuser, setUserToken} = usercontext;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(6, "Password length must be greater than 6 letters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      
      axios
        .post("https://mainapi.springfest.in/cap/user/checkregister", {
          email: formik.values.email,
          password: formik.values.password,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.code == 0) {
            // setUserToken(response.data.message.token)
            
            console.log("success");
            props.showToast(true,"Successfully Logged In","Success")
            axios
            .post("https://mainapi.springfest.in/cap/user/alldata", {
              token:response.data.message.token
            })
            .then(response1 =>{
              // setuser(response1.data.message)
              console.log('moe',response1.data.message )
              localStorage.setItem("user",JSON.stringify({
                "token": response.data.message.token,
                "data": response1.data.message
              }))
              navigate("/profile")
            })
            // localStorage.setItem('logstat',true)
            props.setOpenModal(false);
            
          } else {
            props.showToast(true,response.data.message,"Unsuccessful")
          }
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          props.showToast(true,"Unable to Sign In","Unsuccessful")

        });
    },
  });

  return (

    
     <>
     <div className="form-box1">
      
      <h2>Sign In</h2>
      
      <form className="signin" onSubmit={formik.handleSubmit}>
        <div className="inputfield">
        <span><FaIcons.FaUserTie/></span><label>Email:</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        
        
        <div className="inputfield">
        <span><RiIcons.RiLockPasswordFill/></span><label>Password:</label>
          <input
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
        
        <br/>
        <button className="sgnbutton" type="submit" >Sign In</button>
      </form>
      
    </div>
    

     </> 
    

  );
};

export default SignIn;
