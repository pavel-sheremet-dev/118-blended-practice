'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
// import { User } from '@/types/user';

export default function PostDetailsClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);

  // useEffect(() => {
  //   const fn = async () => {};
  //   fn();
  // }, []);

  const handleClickBack = () => {
    router.push('/posts/filter/All');
  };
  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>
              ← Back
            </button>
            {isLoading && <div>LOADING</div>}
            {isError && <div>POST NOT FOUNT</div>}
            {isSuccess && (
              <div className={css.post}>
                <div className={css.wrapper}>
                  <div className={css.header}>
                    <h2>{data.title}</h2>
                  </div>

                  <p className={css.content}>{data.body}</p>
                </div>
                <p className={css.user}>Author: {data.userId}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
