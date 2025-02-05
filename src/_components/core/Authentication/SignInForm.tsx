import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';  
import { signInThunk } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { RootState } from '../../../redux/store';
import { AppDispatch } from '../../../redux/store';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import Image from 'next/image';  

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .min(8, 'Password must be at least 8 characters long'),
});

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { token, error } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema, 
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(signInThunk(values)); 
        if (response.type === 'auth/signIn/fulfilled') {
          toast('Signed in successfully!', { type: 'success' });
          router.push('/'); 
        }
      } catch (error: any) {
        // Capture error message here
        const errorMessage = error.response?.data?.message || 'Failed to sign in. Please try again.';
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Logo */}
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Image
          src="/logo.svg"  // Path to your logo in the public folder
          alt="Logo"
          width={150}  // Adjust the width of the logo as per your requirement
          height={50}  // Adjust the height of the logo as per your requirement
        />
      </Box>

      {/* Sign In Form */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            marginTop: 2,
            backgroundColor: '#fbc02d', 
            '&:hover': {
              backgroundColor: '#f9b72d', 
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        {error && <Typography color="error" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}
      </form>
    </Box>
  );
};


export default SignInForm;