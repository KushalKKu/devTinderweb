

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeOneUserFromFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getFeed = async (currentPage = 1) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/feed?page=${currentPage}&limit=10`, {
        withCredentials: true,
      });

      const newUsers = res?.data?.data;

      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        dispatch(addFeed(newUsers));
        setPage(currentPage + 1); 
      }
    } catch (err) {
      console.error(err);
      setHasMore(false); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feed.length === 0) {
      getFeed(page);
    }
  }, [feed.length, page]);

  const handleUserAction = () => {
  
    dispatch(removeOneUserFromFeed(feed[0]._id));

    if (feed.length < 3 && hasMore && !loading) {
      getFeed(page);
    }
  };

  if (!feed || feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} onAction={handleUserAction} />
    </div>
  );
};

export default Feed;




