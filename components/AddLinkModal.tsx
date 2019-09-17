import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useModalContext } from 'context';
import { Link } from 'interfaces';

const AddLinkModal: React.FC = () => {
  const { toggleModal } = useModalContext();
  const initialState = {
    url: '',
    title: '',
    description: '',
  };

  const [values, setValues] = React.useState<Link>(initialState);

  function handleChange(name: keyof Link) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === 'url') {
        getMetaData(event.target.value);
      }
      setValues({ ...values, [name]: event.target.value });
    };
  }

  async function getMetaData(url: string) {
    const metadata = await fetch('api/links/metadata', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });

    console.log({ metadata });
  }

  function handleSubmit() {
    fetch('api/links/add', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    setValues(initialState);
    toggleModal();
  }

  return (
    <ModalContainer>
      <h3>Add Link</h3>
      <TextField
        id="standard-name"
        label="Url"
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
  max-width: 60rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  label {
    font-size: 1.4rem;
  }
`;

export default AddLinkModal;
