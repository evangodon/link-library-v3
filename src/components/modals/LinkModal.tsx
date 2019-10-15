import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ModalContainer } from 'components/modals/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDebounce } from 'use-lodash-debounce';
import { useModalContext, useSnackbarContext, useAuthContext } from 'context/index';
import { Link as ILink, Category, checkIfCategory } from 'interfaces';
import Link from 'components/Link';
import ButtonGroup from 'components/ButtonGroup';
import { categories, icons } from 'components/CategorySelect';
import { isValidURL } from 'utils/isValidUrl';
import { request } from '@api/request';

const useStyles = makeStyles(() =>
  createStyles({
    categorySelect: {
      margin: '1.4rem 0 2.6rem 0',
    },
    categoryMenuItem: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'min-content 1fr',
      gridColumnGap: '.4rem',
    },
  })
);

type LoadingType = 'URL-METADATA' | 'SUBMISSION' | false;
type InvalidUrlType = true | false | 'UNKNOWN';

type Props = {
  hydratedState?: ILink;
};

/**
 * @todo: improve invalid url state => 'valid' | 'invalid' | 'unknown'
 */
const AddLinkModal: React.FC<Props> = ({ hydratedState }) => {
  const classes = useStyles();
  const { toggleModal } = useModalContext();
  const { openSnackbar } = useSnackbarContext();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const initialState: ILink = {
    id: -1,
    userId: -1,
    url: '',
    title: '',
    description: '',
    image: '',
    category: 'article',
  };
  const { user } = useAuthContext();

  const [values, setValues] = useState<ILink>(
    hydratedState || {
      ...initialState,
      userId: user && user !== 'LOADING' ? user.uid : -1,
    }
  );
  const [labelWidth, setLabelWidth] = useState(0);
  const [invalidURL, setInvalidURL] = useState<InvalidUrlType>(
    hydratedState ? false : 'UNKNOWN'
  );
  const [loading, setLoading] = useState<LoadingType>(false);
  const debouncedUrlQuery = useDebounce(values.url, 500, { trailing: true });

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  useEffect(() => {
    if (values.url.length > 0 && !hydratedState) {
      getUrlMetadata(values.url);
    }
  }, [debouncedUrlQuery]);

  function handleChange(name: keyof ILink) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues({ ...values, [name]: value });
    };
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValues({ ...values, url: value });
    if (value.length === 0) {
      setInvalidURL('UNKNOWN');
    }
  }

  const getUrlMetadata = async (url: string) => {
    if (isValidURL(url)) {
      setInvalidURL(false);
      setLoading('URL-METADATA');
      const { res: metadata } = await request('api/link/metadata', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

      if (metadata) {
        setValues({ ...values, url, ...metadata });
        setLoading(false);
      }
    } else {
      setInvalidURL(true);
    }
  };

  function handleCategoryChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { value } = event.target;
    setValues({ ...values, category: checkIfCategory(value) });
  }

  console.log({ values });

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading('SUBMISSION');

    const { res: updatedLink, error } = await request('api/link/update', {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (error) {
      openSnackbar({ variant: 'error', message: 'Something went wrong' });
    }

    if (updatedLink) {
      toggleModal();
      openSnackbar({ variant: 'success', message: 'Link Updated' });
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading('SUBMISSION');

    const { res: newLink, error } = await request('api/link/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (error) {
      openSnackbar({ variant: 'error', message: 'Something went wrong' });
    }

    if (newLink) {
      toggleModal();
      openSnackbar({ variant: 'success', message: 'Link Added' });
    }
  }

  return (
    <Container data-testid="link-modal">
      <Header>{`${hydratedState ? 'Update' : 'Add'} Link`}</Header>
      <Form>
        <TextField
          id="standard-name"
          label={
            invalidURL !== 'UNKNOWN' && Boolean(invalidURL) ? 'Invalid Url' : 'Url'
          }
          error={invalidURL !== 'UNKNOWN' && Boolean(invalidURL)}
          type="url"
          required
          autoFocus
          value={values.url}
          onChange={handleUrlChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-name"
          label="Title"
          value={values.title || ''}
          onChange={handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-name"
          label="Description"
          value={values.description || ''}
          onChange={handleChange('description')}
          margin="normal"
          variant="outlined"
        />
        <FormControl className={classes.categorySelect}>
          <InputLabel
            ref={inputLabel}
            className={classes.categoryMenuItem}
            htmlFor="category-select"
          >
            Category
          </InputLabel>
          <Select
            value={values.category}
            onChange={handleCategoryChange}
            labelWidth={labelWidth}
            inputProps={{
              name: 'category',
              id: 'category-select',
            }}
          >
            {categories.map((category: Category, index) => (
              <MenuItem
                key={index}
                value={category}
                className={classes.categoryMenuItem + ' category-menu'}
              >
                {icons[category]}
                <span>{category[0].toUpperCase() + category.slice(1)}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {values.url && !invalidURL && (
          <Link
            link={{ id: null, ...values }}
            displayMode
            loading={loading === 'URL-METADATA'}
          />
        )}
        <ButtonContainer>
          <SubmitButton
            color="primary"
            size="medium"
            role="submit"
            onClick={() => toggleModal()}
          >
            Cancel
          </SubmitButton>
          <SubmitButton
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            onClick={hydratedState ? handleUpdate : handleSubmit}
            startIcon={loading === 'SUBMISSION' && <CircularProgress size={20} />}
            disabled={
              invalidURL === 'UNKNOWN' ||
              Boolean(invalidURL) ||
              loading === 'SUBMISSION' ||
              loading === 'URL-METADATA'
            }
          >
            {hydratedState ? 'Update' : 'Create'}
          </SubmitButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled(ModalContainer)`
  .category-menu svg {
    width: 1.6rem;
  }
`;

const Header = styled.h3`
  text-align: center;
  font-weight: 400;
  font-size: var(--fs-large);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  #select-category {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.4rem;
      position: relative;
      bottom: 2px;
    }
  }
`;

const ButtonContainer = styled(ButtonGroup)`
  max-width: 50%;
  margin-left: auto;
`;

const SubmitButton = styled(Button)`
  min-width: 15rem;
`;

export default AddLinkModal;
