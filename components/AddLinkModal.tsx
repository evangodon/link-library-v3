import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useModalContext, useLinksContext } from 'context';
import { Link as ILink } from 'interfaces';
import Link from './Link';

/**
 * @todo: Fix formatting of text (sometimes too long, desc should be max 2 lines)
 * @todo: handle invalid urls
 */
const AddLinkModal: React.FC = () => {
  const { toggleModal } = useModalContext();
  const { links, setLinks } = useLinksContext();
  const initialState = {
    url: '',
    title: '',
    description: '',
    image: '',
  };

  const [values, setValues] = React.useState<Partial<ILink>>(initialState);

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

  async function getMetaData(url: string) {
    const response = await fetch('api/links/metadata', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    const metadata = await response.json();

    return { ...metadata, url };
  }

  async function handleSubmit() {
    const response = await fetch('api/links/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const newLink = await response.json();
    toggleModal();
    setLinks([newLink, ...links]);
    setValues(initialState);
  }

  return (
    <ModalContainer>
      <h3>Add Link</h3>
      <TextField
        id="standard-name"
        label="Url"
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

      <Link link={values} />
      <Button variant="contained" color="primary" size="medium" onClick={handleSubmit}>
        Add
      </Button>
    </ModalContainer>
  );
};

const ModalContainer = styled.form`
  background-color: #fff;
  height: auto;
  min-width: 40rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  label {
    font-size: 1.4rem;
  }
`;

export default AddLinkModal;
