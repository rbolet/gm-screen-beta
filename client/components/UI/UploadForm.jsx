import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import { Campaign } from '@client/context/campaign-context';

export default function UploadForm(props) {
  const [filePathLabel, setFilePathLabel] = useState('Choose an image to upload');

  return (
    <Form>
      <Form.Row className="align-items-center py-2 mr-1">
        <Form.Group as={Col} controlId="filePath" className="m-0">
          <input required type="file" className="custom-file-input" name="filePath" onChange={event => { setFilePathLabel(event.target.value); }}/>
          <label id="filepath-label" className="custom-file-label text-truncate my-0 mx-2" htmlFor="filePath">{filePathLabel}</label>
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="alias">
          <Form.Label>Alias</Form.Label>
          <Form.Control required name="alias" type="text" placeholder="Your name for this image"/>
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
      <input type="hidden" name="campaignId" value={this.props.campaignId} />
    </Form>
  );
}
