'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { Bold as BoldIcon, Italic as ItalicIcon, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  textAlign?: string;
  textColor?: string;
}

const RichTextEditor = ({ content, onChange, textAlign, textColor }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-[#F8F9FA]">
      <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-white">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <BoldIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ItalicIcon className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>
      <EditorContent 
        editor={editor} 
        className={`prose prose-sm max-w-none p-5 min-h-[300px] focus:outline-none ${
          textAlign === 'right' ? 'rtl font-rubik' : 'font-anek'
        }`}
        style={{ textAlign: textAlign as any, color: textColor }}
      />
    </div>
  );
};

export default RichTextEditor;
