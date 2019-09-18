import React from 'react';
import { ModalContainer } from 'components/Modal';
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
    id: 0,
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

  async function handleSubmit() {
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

      <Link link={{ id: null, ...values }} />
      <Button variant="contained" color="primary" size="medium" onClick={handleSubmit}>
        Add
      </Button>
    </ModalContainer>
  );
};

export default AddLinkModal;
