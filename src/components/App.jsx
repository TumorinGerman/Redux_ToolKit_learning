// @ts-check

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { normalize, schema } from 'normalizr';
import Posts from './Posts.jsx';
import PostForm from './PostForm.jsx';

import { actions as usersActions } from '../slices/usersSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';

const App = () => {
  const dispatch = useDispatch();

  const getNormalized = (data) => {
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      author: user,
    });

    const post = new schema.Entity('posts', {
      author: user,
      comments: [comment],
    });

    return normalize(data, [post]);
  };

  useEffect(() => {
    const fetchData = () => {
      const  data  =  [
        {
          id: 'post1',
          author: { id: 'user1', username: 'user1', name: 'User 1' },
          body: 'Первый пост',
          comments: [
            {
              id: 'comment1',
              author: { id: 'user2', username: 'user2', name: 'User 2' },
              text: 'Первый комментарий',
            },
            {
              id: 'comment2',
              author: { id: 'user3', username: 'user3', name: 'User 3' },
              text: 'Второй комментарий',
            },
          ],
        },
        {
          id: 'post2',
          author: { id: 'user2', username: 'user2', name: 'User 2' },
          body: 'Второй пост',
          comments: [],
        },
      ];
      const normalizedData = getNormalized(data);
      const {
        users,
        posts,
        comments,
      } = normalizedData.entities;

      dispatch(usersActions.addUsers(users));
      dispatch(postsActions.addPosts(posts));
      dispatch(commentsActions.addComments(comments));
    };

    fetchData();
  });

  return (
    <>
      <div className="card">
        <div className="card-header">
          Создать пост
        </div>
        <div className="card-body">
          <PostForm />
        </div>
      </div>
      <div className="mt-5">
        <Posts />
      </div>
    </>
  );
};

export default App;
