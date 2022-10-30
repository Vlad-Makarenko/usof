import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Col,
  OverlayTrigger,
  Row,
  ToggleButton,
  Tooltip,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowRepeat, ArrowUp } from 'react-bootstrap-icons';
import { filterPosts, getAllPosts } from '../store/postSlice';
import { SrchInput } from './SrchInput';
import { DATE_RADIOS, DEFAUL_FILTERS, SORT_RADIOS } from '../utils/constants';
import { getAllTags } from '../store/tagSlice';

export const Filters = ({ localFilter, setLocalFilter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allPosts } = useSelector((state) => state.post);

  const [info, setInfo] = useState('New');

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
    <Row>
      <Col
        md={12}
        className="d-flex align-items-center justify-content-between mb-4"
      >
        <h2>
          {info}
          {' '}
          Questions
        </h2>
        <Button variant="outline-dark" onClick={() => { navigate('/ask'); }}>Ask Question</Button>
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
              delay={{ show: 300 }}
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
              delay={{ show: 300 }}
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
            {SORT_RADIOS.map((radio) => (
              <ToggleButton
                key={radio.value}
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
            {DATE_RADIOS.map((radio) => (
              <ToggleButton
                key={radio.value}
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
    </Row>
  );
};
