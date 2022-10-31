/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { getAllUsers } from '../store/userSlice';
import { SrchInput } from '../components/SrchInput';
import { Nothing } from '../components/Nothing';
import { UserCard } from '../components/userCard';

export const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const filterHandler = (e) => {
    setFilter(e.target.value);
    const tempUsers = [...users];
    switch (e.target.value) {
      case 'Popular':
        setDisplayedUsers(
          tempUsers.sort((a, b) => b.rating - a.rating),
        );
        break;
      case 'Name':
        setDisplayedUsers(
          // eslint-disable-next-line no-nested-ternary
          tempUsers.sort((a, b) => (a.login > b.login ? 1 : b.login > a.login ? -1 : 0)),
        );
        break;
      case 'New':
        setDisplayedUsers(tempUsers.reverse());
        break;
      default:
        setDisplayedUsers(users);
        break;
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setFilter('');
    const tempUsers = [...users];
    setDisplayedUsers(
      tempUsers.filter((value) => value.login.toLowerCase().includes(e.target.value.toLowerCase())),
    );
  };

  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={12}>
          <h2>Users</h2>
        </Col>
        <Col
          md={12}
          className="d-flex align-items-center justify-content-between mb-3 mt-3"
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: '30%' }}
          >
            <SrchInput changeHandler={searchHandler} searchInput={search} />
          </div>
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
          <>
            {displayedUsers.length ? (
              <Col md={12} className="d-flex justify-content-around flex-wrap">
                {displayedUsers.map((category) => (
                  <UserCard key={category.id} user={category} />
                ))}
              </Col>
            ) : (
              <Nothing />
            )}
          </>
        )}
      </Row>
    </Container>
  );

  // return (
  //   <div>
  //     {users.map((user) => (
  //       <div key={user.id}>
  //         <p>{user.id}</p>
  //         <p>{user.login}</p>
  //         <p>{user.full_name}</p>
  //         <p>{user.profile_picture}</p>
  //         <p>{user.rating}</p>
  //         <p>{user.role}</p>
  //         <p>{user.createdAt}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
};
