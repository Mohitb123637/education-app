import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.contact ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      return setErrorMessage('Please fill out all the required fields');
    }

    const formattedData = {
      userName: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
    };

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setMessage(data.message);
      setIsLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
      console.log(message, 'hello');

      // Handle successful signup (e.g., redirect to login page)
      console.log('Signup successful', data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
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
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="Your name" />
              <TextInput
                type="text"
                placeholder="Your name"
                id="name"
                required
                onChange={handleChange}
              />
            </div>
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
            <div className="mb-4">
              <Label value="Your contact number" />
              <TextInput
                type="tel"
                placeholder="Contact Number"
                id="contact"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="Street address" />
              <TextInput
                type="text"
                placeholder="Street Address"
                id="street"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="City" />
              <TextInput
                type="text"
                placeholder="City"
                id="city"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="State" />
              <TextInput
                type="text"
                placeholder="State"
                id="state"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label value="ZIP code" />
              <TextInput
                type="text"
                placeholder="ZIP Code"
                id="zip"
                required
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />{' '}
                  <span className=" pl-3">Loading..?</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link
                to="/sign-in"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
          {errorMessage && (
            <Alert className="mt-3" color="failure">
              {errorMessage}
            </Alert>
          )}
          {message && (
            <Alert className="mt-3" color="success">
              {message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
