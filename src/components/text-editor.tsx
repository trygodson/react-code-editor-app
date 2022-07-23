import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { useAction } from '../hooks/use-actions';
import { Cell } from '../state';
import './text-editor.css';

interface TextEditorProp {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProp> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useAction();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (!editing) {
    return (
      <div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={cell.content === '' ? '# Markdown Editor' : cell.content} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="text-editor">
      <MDEditor value={cell.content} onChange={(e: any) => updateCell(cell.id, e || '')} />

      {/* <MDEditor.Markdown /> */}
    </div>
  );
};

export default TextEditor;
