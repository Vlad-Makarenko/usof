/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { getAllTags, setDefaulTag } from '../store/tagSlice';
import { Tag } from '../components/Tag';
import { SrchInput } from '../components/SrchInput';

export const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag, tags, isLoading } = useSelector((state) => state.tag);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [displayedTags, setDisplayedTags] = useState([]);

  const filterHandler = (e) => {
    setFilter(e.target.value);
    const tempTags = [...tags];
    switch (e.target.value) {
      case 'Popular':
        setDisplayedTags(
          tempTags.sort((a, b) => b.questionsCount - a.questionsCount),
        );
        break;
      case 'Name':
        setDisplayedTags(
          // eslint-disable-next-line no-nested-ternary
          tempTags.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0)),
        );
        break;
      case 'New':
        setDisplayedTags(tempTags.reverse());
        break;
      default:
        setDisplayedTags(tags);
        break;
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setFilter('');
    const tempTags = [...tags];
    setDisplayedTags(
      tempTags.filter((value) => value.title.includes(e.target.value)),
    );
  };

  useEffect(() => {
    setDisplayedTags(tags);
  }, [tags]);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(setDefaulTag());
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={10}>
          <h2>{tag.title}</h2>
          <p>{tag.description}</p>
        </Col>
        <Col md={2} className="d-flex align-items-center">
          {tag.id ? (
            <Button variant="outline-warning" onClick={() => { navigate('/'); }}>
              {tag.questionsCount}
              {' '}
              questions
            </Button>
          ) : (
            <></>
          )}
        </Col>
        <Col
          md={12}
          className="d-flex align-items-center justify-content-between mb-3 mt-3"
        >
          <SrchInput changeHandler={searchHandler} searchInput={search} />
          <ButtonGroup aria-label="Basic example" style={{ marginRight: '1%' }}>
            <Button
              variant="outline-dark"
              active={filter === 'Popular'}
              onClick={filterHandler}
              value="Popular"
            >
              Popular
            </Button>
            <Button
              variant="outline-dark"
              active={filter === 'Name'}
              onClick={filterHandler}
              value="Name"
            >
              Name
            </Button>
            <Button
              variant="outline-dark"
              active={filter === 'New'}
              onClick={filterHandler}
              value="New"
            >
              New
            </Button>
          </ButtonGroup>
        </Col>
        {isLoading ? (
          <Col md={12} className="d-flex justify-content-center">
            <Spinner animation="border" variant="warning" />
          </Col>
        ) : (
          <Col md={12} className="d-flex justify-content-around flex-wrap">
            {displayedTags.map((category) => (
              <Tag key={category.id} tag={category} />
            ))}
          </Col>
        )}
      </Row>
    </Container>
  );
};
