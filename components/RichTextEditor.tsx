'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { TextStyle } from '@tiptap/extension-text-style';
import { Bold as BoldIcon, Italic as ItalicIcon, List, ListOrdered, Type } from 'lucide-react';

// Custom Text Style extension that includes font-size support
const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {}
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          }
        },
      },
    }
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize: (fontSize: string) => ({ chain }: { chain: any }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
    } as any
  },
})

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
      CustomTextStyle,
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
      <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-white flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <BoldIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ItalicIcon className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-orange-50 text-[#C24E00]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2">
          <Type className="w-4 h-4 text-gray-400" />
          <select 
            onChange={(e) => {
              const size = e.target.value;
              editor.chain().focus().setFontSize(size).run();
            }}
            className="bg-transparent text-sm text-gray-600 outline-none py-1 cursor-pointer"
            value={editor.getAttributes('textStyle').fontSize || '16px'}
          >
            {[12, 14, 16, 18, 20, 24, 30, 36, 48].map(size => (
              <option key={size} value={`${size}px`}>{size}px</option>
            ))}
          </select>
        </div>
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
