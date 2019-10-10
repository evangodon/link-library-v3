import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ModalContainer } from 'components/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import debounce from 'lodash/debounce';
import { useModalContext, useSnackbarContext } from 'context';
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

type Props = {
  hydratedState?: ILink;
};

/**
 * @todo: handle invalid urls (add event listener to )
 */
const AddLinkModal: React.FC<Props> = ({ hydratedState }) => {
  const classes = useStyles();
  const { toggleModal } = useModalContext();
  const { openSnackbar } = useSnackbarContext();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const initialState: ILink = {
    id: -1,
    url: '',
    title: '',
    description: '',
    image: '',
    category: 'article',
  };

  const [values, setValues] = useState<ILink>(hydratedState || initialState);
  const [labelWidth, setLabelWidth] = useState(0);
  const [invalidURL, setInvalidURL] = useState(false);
  const [loading, setLoading] = useState<LoadingType>(false);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

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
      setInvalidURL(false);
    } else {
      getUrlMetadata(value);
    }
  }

  const getUrlMetadata = debounce(
    async (url: string) => {
      if (isValidURL(url)) {
        setInvalidURL(false);
        setLoading('URL-METADATA');
        console.log('REQUESTING', url);
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
    },
    3000,
    { trailing: false }
  );

  function handleCategoryChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { value } = event.target;
    setValues({ ...values, category: checkIfCategory(value) });
  }

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading('SUBMISSION');

    const { res: updatedLink } = await request('api/link/update', {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (updatedLink) {
      toggleModal();
      openSnackbar({ variant: 'success', message: 'Link Updated' });
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading('SUBMISSION');

    const { res: newLink } = await request('api/link/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    setLoading(false);

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
          label={invalidURL ? 'Invalid Url' : 'Url'}
          error={invalidURL}
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
            disabled={loading === 'SUBMISSION'}
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
