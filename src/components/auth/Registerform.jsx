import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation.js';
import Authinput from './Authinput.jsx';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser ,changeStatus} from '../../features/userSlice.js';
import Picture from './Picture.jsx';
import axios from 'axios';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export default function Registerform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const { register, handleSubmit,watch, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema), // Use Yup schema with react-hook-form
  });

  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      await uploadImage().then(async(response)=>{
        let  res=await dispatch(registerUser({...data,picture:response.secure_url})
      );
      if (res?.payload?.user) {
        navigate("/");
      }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('upload_preset', cloud_secret);
    formData.append('file', picture);

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          <Authinput
            name="name" // Use lowercase to match the schema
            type="text"
            placeholder="First Name"
            register={register}
            error={errors.name?.message}
          />
          <Authinput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors.email?.message}
          />
          <Authinput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors.status?.message}
          />
          <Authinput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />

          {/* If we have an error */}
          {
            error ? (
              <div>
                <p className="text-red-500">{error}</p>
              </div>
            ) : null
          }

          {/* Submit button */}
          <button className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit">
            {status === "loading" ? <PulseLoader color='#fff' size={16} /> : "Sign up"}
          </button>

          {/* Sign In Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Have an account ?</span>
            <Link to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
