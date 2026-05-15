'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

function DeletePostButton({ id, title }: Readonly<DeletePostButtonProps>) {
  const [isPending, startTransaction] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    startTransaction(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(`Erro ao apagar post: ${result.error}`);
        return;
      }

      toast.success(`Post apagado com sucesso!`);
    });
  }
  return (
    <>
      <button
        className={clsx(
          'text-red-600 cursor-pointer transition',
          '[&_svg]:w-4.5 [&_svg]:h-4.5',
          'hover:scale-120 hover:text-red-800',
          'disabled:text-slate-600 disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2 />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={`Apagar post`}
          content={`Tem certeza que deseja apagar o post "${title}"?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}

export default DeletePostButton;
