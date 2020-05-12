import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Campaign } from '@client/context/campaign-context';

export default function UploadForm(props) {
  const { campaign, addImageToCampaign } = useContext(Campaign);
  const [filePathLabel, setFilePathLabel] = useState('Choose an image to upload');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    addImageToCampaign(formData);
    setFilePathLabel('Choose an image to upload');
    // .catch(err => console.error('Error submitting form', err));
  }

  return (
    <Form onSubmit={event => { handleSubmit(event); }} id="image-upload">
      <Form.Row className="align-items-center py-2 mr-1">
        <Form.Group as={Col} className="m-0">
          <input name="imageFile" required type="file" className="custom-file-input" onChange={event => { setFilePathLabel(event.target.value); }}/>
          <label className="custom-file-label text-truncate my-0 mx-2">{filePathLabel}</label>
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="alias">
          <Form.Label>Alias</Form.Label>
          <Form.Control required type="text" name="alias" placeholder="Your name for this image"/>
        </Form.Group>
        <Form.Group as={Col} controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control required as="select" name="category">
            <option></option>
            <option>Environment</option>
            <option>Secondary</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <input type="hidden" name="campaignId" value={campaign.campaignId} />
    </Form>
  );
}
