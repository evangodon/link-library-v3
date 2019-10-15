import React, { useState } from 'react';
import { createCtx } from './createCtx';

export const [useSnackbarContext, Provider] = createCtx<{
  snackbarOpen: boolean;
  config: Config;
  openSnackbar: (config: Config) => void;
  closeSnackbar: () => void;
}>();

type Variant = 'success' | 'info' | 'warning' | 'error';

type Config = {
  variant: Variant;
  message: string;
};

export const SnackbarProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [config, setConfig] = useState<{ variant: Variant; message: string }>({
    variant: 'success',
    message: '',
  });

  const openSnackbar = ({ variant, message }: Config) => {
    setSnackbarOpen(true);
    setConfig({ variant, message });
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Provider value={{ snackbarOpen, config, openSnackbar, closeSnackbar }}>
        {children}
      </Provider>
    </>
  );
};
