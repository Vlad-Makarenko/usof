/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

import { Nav } from 'react-bootstrap';
import {
  BookmarkCheckFill,
  PeopleFill,
  Stack,
  TagsFill,
} from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';

export const LeftSideBar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    {
      to: '/saved',
      title: 'Saved posts',
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
          (sideCategories[3].isActive = false),
        ]);
        break;
      case '/tags':
        setSideCategories([
          ...sideCategories,
          (sideCategories[1].isActive = true),
          (sideCategories[0].isActive = false),
          (sideCategories[2].isActive = false),
          (sideCategories[3].isActive = false),
        ]);
        break;
      case '/users':
        setSideCategories([
          ...sideCategories,
          (sideCategories[2].isActive = true),
          (sideCategories[1].isActive = false),
          (sideCategories[0].isActive = false),
          (sideCategories[3].isActive = false),
        ]);
        break;
      case '/saved':
        setSideCategories([
          ...sideCategories,
          (sideCategories[3].isActive = true),
          (sideCategories[2].isActive = false),
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
          (sideCategories[3].isActive = false),
        ]);
        break;
    }
  }, [location.pathname]);

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {sideCategories.map((category, idx) => {
        if (category.to === '/saved' && !isAuthenticated) {
          return <div key={category.to} />;
        }
        return (
          <Nav.Item
          // eslint-disable-next-line react/no-array-index-key
            key={idx}
            eventKey={category.to}
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
            {category.to === '/saved' ? <BookmarkCheckFill /> : <></>}
            <span style={{ marginLeft: '5px' }}>{category.title}</span>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};
