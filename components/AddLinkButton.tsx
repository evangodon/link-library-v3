import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from 'node-fetch';
import styled from 'styled-components';
import { useModalContext } from 'context';
import { Link } from 'interfaces';

const AddLinkButton: React.FC = () => {
  const { toggleModal } = useModalContext();

  const AddLinkModal = () => {
    const initialState = {
      url: '',
      title: '',
      description: '',
    };

    const [values, setValues] = React.useState<Link>(initialState);

    function handleChange(name: keyof Link) {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
      };
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleModal(() => AddLinkModal)}
      >
        Add Link
      </Button>
    </>
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
export default AddLinkButton;
