import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function TagsetAccordion({ name, description }) {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            {name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{description}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default TagsetAccordion;