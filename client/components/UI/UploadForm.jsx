import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function UploadForm(props) {
  const [filePathLabel, setFilePathLabel] = useState('Choose an image to upload');

  return (
    <Form>
      <Form.Row className="align-items-center py-2">
        <Form.Group as={Col} controlId="uploadForm.file" className="m-0">
          <input required type="file" className="custom-file-input" name="image-upload" onChange={event => { setFilePathLabel(event.target.value); }}/>
          <label id="filepath-label" className="custom-file-label text-truncate my-0 mx-2" htmlFor="image-upload">{filePathLabel}</label>
        </Form.Group>
        <Button>Upload</Button>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="uploadForm.alias">
          <Form.Label>Alias</Form.Label>
          <Form.Control type="text" placeholder="Your name for this image"/>
        </Form.Group>
        <Form.Group as={Col} controlId="uploadForm.category">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option></option>
            <option>Environment</option>
            <option>Secondary</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
