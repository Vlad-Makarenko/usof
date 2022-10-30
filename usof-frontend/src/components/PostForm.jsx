/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getAllTags } from '../store/tagSlice';
import { tagsToSelect } from '../utils/postsUtils';
import askImg from '../assets/background.png';
import { createPost, updatePost } from '../store/postSlice';
import { EditPostOff } from '../store/modalSlice';

export const PostForm = ({ isEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, post } = useSelector((state) => state.post);
  const { isLoading: tagLoading, tags } = useSelector((state) => state.tag);

  const [tagOptions, setTagOptions] = useState([]);
  const [defaultVal, setDefaultVal] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    categories: [],
  });

  const postHandler = (e) => {
    e.preventDefault();
    console.table(postForm);
    if (isEditing) {
      dispatch(updatePost({ ...postForm, id: post.id }));
      dispatch(EditPostOff());
      navigate(`/posts/${post.id}`);
    } else {
      dispatch(createPost(postForm));
      navigate(`/`);
    }
  };

  const changeHandler = (event) => {
    setPostForm({ ...postForm, [event.target.name]: event.target.value });
  };

  const tagChange = (option) => {
    const titleArr = option.map((opt) => opt.value);
    setPostForm({ ...postForm, categories: titleArr });
  };

  useEffect(() => {
    setTagOptions(tagsToSelect(tags));
  }, [tagLoading]);

  useEffect(() => {
    dispatch(getAllTags());
    if (isEditing) {
      const tempCategories = post.categories.map((tag) => ({ value: tag.title, lable: tag.title }));
      console.log(tempCategories);
      setDefaultVal(tempCategories);
      setPostForm({
        title: post.title,
        content: post.content,
        categories: tempCategories.map((opt) => opt.value),
      });
    }
  }, []);

  return (
    <form
      onSubmit={postHandler}
      className="d-flex flex-column justify-content-center"
    >
      <h5>Title:</h5>
      <span>
        Be specific and imagine you’re asking a question to another person.
      </span>
      <Container
        className="d-flex align-items-center serchForm p-0 m-0 mt-2 mb-1"
        fluid
      >
        <input
          type="text"
          required
          onChange={changeHandler}
          value={postForm.title}
          name="title"
          className="searchInput p-3"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
      </Container>
      <h5>Content:</h5>
      <span>
        Introduce the problem and expand on what you put in the title. Minimum
        30 characters.
      </span>
      <Container
        className="d-flex align-items-center serchForm p-0 m-0 mt-2 mb-1"
        fluid
      >
        <textarea
          type="text"
          onChange={changeHandler}
          value={postForm.content}
          name="content"
          className="searchInput p-3 m-0"
          placeholder="Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself."
          rows={5}
        />
      </Container>
      <h5>Tags:</h5>
      <span>
        Tags help ensure that your question will get attention from the right
        people.
      </span>
      <Select
        className="basic-single searchInput p-0 pt-2 m-0"
        classNamePrefix="select"
        defaultValue={defaultVal}
        isLoading={tagLoading}
        isClearable
        isSearchable
        isMulti
        name="categories"
        options={tagOptions}
        onChange={tagChange}
        placeholder="Start typing to see suggestions."
      />
      <Container
        className="d-flex justify-content-between p-0 m-0 mt-2 mb-1"
        fluid
      >
        <Container
          className="d-flex align-items-start p-0 m-0 mt-2 mb-1"
          fluid
        >
          <Button
            type="submit"
            className="ms-1 mt-2 mb-2 waves-effect"
            variant="warning"
            disabled={isLoading}
          >
            {isEditing ? (
              'Edit question'
            ) : (
              'Post your question'
            )}
          </Button>
          <Button
            type="button"
            className="ms-2 mt-2 mb-2 waves-effect"
            variant="outline-danger"
            onClick={() => {
              setPostForm({
                title: '',
                content: '',
                categories: [],
              });
            }}
            disabled={isLoading}
          >
            Discard draft
          </Button>
        </Container>
        {!isEditing && <img src={askImg} height="150" alt="ask" />}
      </Container>

    </form>
  );
};
