/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-start">
        {/* left */}
        <div className="md:w-1/2">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Physics
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius culpa
            dolorum totam illum neque quidem.
          </p>
        </div>
        {/* right */}
        <div className="mt-5 md:mt-0 md:ml-20 md:w-1/2 w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                required
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <div className="flex gap-2 text-sm mt-5">
              <span>Do not have an account?</span>
              <Link
                to="/sign-up"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
          {errorMessage && (
            <Alert className="mt-3" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
