import React, { useState, useEffect } from 'react';

import {
  Button, Col, Container, OverlayTrigger, Row, Tooltip,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../styles/SideBar.css';

export const TagsSideBar = ({ filter, filterControl }) => {
  const { tags } = useSelector((state) => state.tag);
  const [displayedTags, setDisplayedTags] = useState([]);

  useEffect(() => {
    const tempTags = [...tags];
    setDisplayedTags(
      tempTags.sort((a, b) => b.questionsCount - a.questionsCount),
    );
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center TagsSideBar pt-2 pb-3">
      <h2>Top Tags</h2>
      {displayedTags.map((tag) => (
        <OverlayTrigger
          key={tag.title}
          placement="left"
          overlay={
            <Tooltip id="tooltip-left">{tag.description}</Tooltip>
        }
        >
          <Button
            variant="outline-dark"
            name="category"
            value={tag.id}
            onClick={() => filterControl({ ...filter, category: tag.id })}
            className="mt-1 mb-1 w-75"
            active={filter.category === tag.id}
          >
            <Row>
              <Col md={8} className="d-flex justify-content-center align-items-center p-0">
                {tag.title}
              </Col>
              <Col md={1} className="d-flex justify-content-center align-items-center p-0">
                <div style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.3)', height: '100%' }} />
              </Col>
              <Col md={3} className="d-flex justify-content-center align-items-center p-0">
                {tag.questionsCount}
              </Col>
            </Row>
          </Button>
        </OverlayTrigger>
      ))}
    </Container>
  );
};
