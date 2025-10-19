'use client';

// import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';

import css from './PostPreview.module.css';

import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

export default function PostPreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
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
    </Modal>
  );
}
