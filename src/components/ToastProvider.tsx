"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return <Toaster position="top-center" toastOptions={{ duration: 3000 }} />;
};

export default ToastProvider;