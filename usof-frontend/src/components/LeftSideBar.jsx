/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { PeopleFill, Stack, TagsFill } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';

export const LeftSideBar = () => {
  const [sideCategories, setSideCategories] = useState([
    {
      to: '/',
      title: 'Stack Overclone',
      isActive: false,
    },
    {
      to: '/tags',
      title: 'Tags',
      isActive: false,
    },
    {
      to: '/users',
      title: 'Users',
      isActive: false,
    },
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSideCategories([
          ...sideCategories,
          (sideCategories[0].isActive = true),
          (sideCategories[1].isActive = false),
          (sideCategories[2].isActive = false),
        ]);
        break;
      case '/tags':
        setSideCategories([
          ...sideCategories,
          (sideCategories[1].isActive = true),
          (sideCategories[0].isActive = false),
          (sideCategories[2].isActive = false),
        ]);
        break;
      case '/users':
        setSideCategories([
          ...sideCategories,
          (sideCategories[2].isActive = true),
          (sideCategories[1].isActive = false),
          (sideCategories[0].isActive = false),
        ]);
        break;
      default:
        setSideCategories([
          ...sideCategories,
          (sideCategories[0].isActive = false),
          (sideCategories[1].isActive = false),
          (sideCategories[2].isActive = false),
        ]);
        break;
    }
  }, [location.pathname]);

  return (
    <Container fluid style={{ padding: '0' }}>
      {sideCategories.map((category, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={
            category.isActive
              ? 'activeSide categoryTitle d-flex align-items-center'
              : 'categoryTitle d-flex align-items-center'
          }
          onClick={() => navigate(category.to)}
        >
          {category.to === '/' ? <Stack /> : <></>}
          {category.to === '/tags' ? <TagsFill /> : <></>}
          {category.to === '/users' ? <PeopleFill /> : <></>}
          <span style={{ marginLeft: '5px' }}>{category.title}</span>
        </div>
      ))}
    </Container>
  );
};
