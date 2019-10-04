import React from 'react';
import clsx from 'clsx';
import SnackbarMUI from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import Grow from '@material-ui/core/Grow';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import {
  CheckCircle,
  AlertCircle,
  AlertOctagon,
  XOctagon,
  X as CloseIcon,
} from 'react-feather';
import { useSnackbarContext } from 'context';

const variantIcon = {
  success: CheckCircle,
  warning: AlertOctagon,
  error: XOctagon,
  info: AlertCircle,
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[400],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  position: {
    top: 100,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export interface Props {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

function MySnackbarContentWrapper(props: Props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

function GrowTransition(props: TransitionProps) {
  return <Grow {...props} />;
}

const Snackbar: React.FC = () => {
  const classes = useStyles();
  const { snackbarOpen, config, closeSnackbar } = useSnackbarContext();

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  return (
    <SnackbarMUI
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className={classes.position}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={GrowTransition}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={config.variant}
        message={config.message}
      />
    </SnackbarMUI>
  );
};

export default Snackbar;
