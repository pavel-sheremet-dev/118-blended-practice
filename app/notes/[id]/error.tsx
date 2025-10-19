'use client';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  console.log('notes/[id]/error.tsx', error);
  return <p>{`Could not fetch note details. ${error.message}`}</p>;
}
