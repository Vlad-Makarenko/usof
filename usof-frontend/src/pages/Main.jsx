/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  ToggleButton,
  Tooltip,
} from 'react-bootstrap';
import { ArrowDown, ArrowRepeat, ArrowUp } from 'react-bootstrap-icons';
import { filterPosts, getAllPosts, searchPosts } from '../store/postSlice';
import { SrchInput } from '../components/SrchInput';
import { DATE_RADIOS, DEFAUL_FILTERS, SORT_RADIOS } from '../utils/constants';
import { getAllTags } from '../store/tagSlice';
import { TagsSideBar } from '../components/TagsSideBar';

export const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoading: postsLoading,
    filteredPosts,
    allPosts,
  } = useSelector((state) => state.post);
  const { tags, isLoading: tagsLoading } = useSelector((state) => state.tag);

  const [info, setInfo] = useState('New');
  const [localFilter, setLocalFilter] = useState(DEFAUL_FILTERS);

  const changeHandler = (event) => {
    if (event.target.name === 'sort') setInfo(event.target.value);
    setLocalFilter({ ...localFilter, [event.target.name]: event.target.value });
  };

  const toggleOrder = () => {
    // eslint-disable-next-line no-unused-expressions
    localFilter.order === 'asc'
      ? setLocalFilter({ ...localFilter, order: 'desc' })
      : setLocalFilter({ ...localFilter, order: 'asc' });
  };

  useEffect(() => {
    const posts = [...allPosts];
    dispatch(filterPosts({ posts, filters: localFilter }));
  }, [localFilter]);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllTags());
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={9}>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-between mb-4"
          >
            <h2>
              {info}
              {' '}
              Questions
            </h2>
            <Button variant="outline-dark">Ask Question</Button>
          </Col>
          <Col
            md={12}
            className="d-flex align-items-center justify-content-between mb-4"
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ width: '40%' }}
            >
              <SrchInput
                searchInput={localFilter.search}
                changeHandler={changeHandler}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <ButtonGroup
                aria-label="Basic example"
                style={{ marginRight: '1%' }}
              >
                <OverlayTrigger
                  key="reset"
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom">Clear filters</Tooltip>
                  }
                >
                  <Button
                    variant="secondary"
                    onClick={() => setLocalFilter(DEFAUL_FILTERS)}
                    className="pt-1 ps-2 pe-2"
                  >
                    <ArrowRepeat size={25} color="white" />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  key="order"
                  placement="bottom"
                  overlay={(
                    <Tooltip id="tooltip-bottom">
                      Order by
                      {' '}
                      {localFilter.order}
                    </Tooltip>
                  )}
                >
                  <Button
                    variant="secondary"
                    onClick={toggleOrder}
                    className="pt-1 ps-2 pe-2"
                  >
                    {localFilter.order === 'desc' ? (
                      <ArrowDown size={25} color="white" />
                    ) : (
                      <ArrowUp size={25} color="white" />
                    )}
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
              <ButtonGroup className="me-2">
                {SORT_RADIOS.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${radio.value}`}
                    type="radio"
                    variant="outline-dark"
                    name="sort"
                    value={radio.value}
                    checked={localFilter.sort === radio.value}
                    onChange={changeHandler}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <ButtonGroup className="me-2">
                {DATE_RADIOS.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${radio.value}`}
                    type="radio"
                    variant="outline-dark"
                    name="date"
                    value={radio.value}
                    checked={localFilter.date === radio.value}
                    onChange={changeHandler}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </Col>
          <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }} />
          {postsLoading ? (
            <Col
              md={12}
              className="d-flex flex-column align-items-center justify-content-between mt-4"
            >
              <Spinner animation="border" variant="warning" />
            </Col>
          ) : (
            <Col
              md={12}
              className="d-flex flex-column align-items-center justify-content-between mt-4"
            >
              {filteredPosts?.map((post, idx) => (
                <div key={post.id}>
                  <p>
                    id:
                    {post.id}
                    idx:
                    {' '}
                    {idx}
                  </p>
                  <p>
                    title:
                    {post.title}
                  </p>
                  <p>
                    time:
                    {post.createdAt}
                  </p>
                  <Moment fromNow>{post.createdAt}</Moment>
                </div>
              ))}
            </Col>
          )}
        </Col>

        <Col
          md={3}
          className="d-flex flex-column align-items-center mt-1"
        >
          {tagsLoading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <TagsSideBar filter={localFilter} filterControl={setLocalFilter} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
