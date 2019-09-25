import React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ModalContainer } from 'components/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { useModalContext, useLinksContext } from 'context';
import { Link as ILink, Category, checkIfCategory } from 'interfaces';
import Link from 'components/Link';
import ButtonGroup from 'components/ButtonGroup';
import { categories, icons } from 'components/CategorySelect';

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

/**
 * @todo: handle invalid urls (add event listener to )
 */
const AddLinkModal: React.FC = () => {
  const classes = useStyles();
  const { toggleModal } = useModalContext();
  const { links, setLinks } = useLinksContext();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const initialState: ILink = {
    id: -1,
    url: '',
    title: '',
    description: '',
    image: '',
    category: 'other',
  };

  const [values, setValues] = React.useState<ILink>(initialState);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  function handleChange(name: keyof ILink) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (name === 'url' && !!value) {
        getMetaData(event.target.value).then((metadata) => {
          setValues({ ...values, ...metadata });
        });
      }
      setValues({ ...values, [name]: value });
    };
  }

  function handleCategoryChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { value } = event.target;
    setValues({ ...values, category: checkIfCategory(value) });
  }

  async function getMetaData(url: string) {
    const response = await fetch('api/link/metadata', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    const metadata = await response.json();

    return { ...metadata, url };
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const response = await fetch('api/link/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const newLink = await response.json();
    toggleModal();
    setLinks([newLink, ...links]);
  }

  return (
    <Container data-testid="link-modal">
      <Header>Add Link</Header>
      <Form>
        <TextField
          id="standard-name"
          label="Url"
          type="url"
          required
          autoFocus
          value={values.url}
          onChange={handleChange('url')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-name"
          label="Title"
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-name"
          label="Description"
          value={values.description}
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

        <Link link={{ id: null, ...values }} displayMode />
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
            onClick={handleSubmit}
          >
            Add
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
