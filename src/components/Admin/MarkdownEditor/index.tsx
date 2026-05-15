'use client';

import dynamic from 'next/dynamic';
import React, { useId } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
};

export function MarkdownEditor({
  labelText,
  value,
  setValue,
  textAreaName,
  disabled = false,
}: Readonly<MarkdownEditorProps>) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && <label htmlFor={textAreaName}>{labelText}</label>}
      <MDEditor
        className='whitespace-pre-wrap'
        id={textAreaName}
        value={value}
        onChange={val => {
          if (val === undefined) return;
          setValue(val);
        }}
        height={400}
        extraCommands={[]}
        preview='edit'
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
    </div>
  );
}
