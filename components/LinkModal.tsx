import React from 'react';
import styled from 'styled-components';
import { ModalContainer } from 'components/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useModalContext, useLinksContext } from 'context';
import { Link as ILink } from 'interfaces';
import Link from 'components/Link';
import ButtonGroup from 'components/ButtonGroup';

/**
 * @todo: handle invalid urls (add event listener to )
 */
const AddLinkModal: React.FC = () => {
  const { toggleModal } = useModalContext();
  const { links, setLinks } = useLinksContext();
  const initialState = {
    id: -1,
    url: '',
    title: '',
    description: '',
    image: '',
  };

  const [values, setValues] = React.useState<ILink>(initialState);

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
    setValues(initialState);
  }

  return (
    <Container data-testid="link-modal">
      <h3>Add Link</h3>
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
  width: 100%;
  max-width: 61.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled(ButtonGroup)`
  max-width: 50%;
  margin-left: auto;
`;

const SubmitButton = styled(Button)`
  min-width: 15rem;
`;

export default AddLinkModal;
