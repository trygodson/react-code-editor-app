import { Cell } from '../state';
import ActionBar from './actionBar';
import CodeCell from './code-cell';
import CodeEditor from './code-editor';
import TextEditor from './text-editor';

interface CellItemProp {
  cell: Cell;
}

const CellListItem: React.FC<CellItemProp> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div
          className="action-bar-wrapper"
          style={{ width: '100%', zIndex: 5, backgroundColor: '#37414b', height: '30px' }}
        >
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <div
          className="action-bar-wrapper"
          style={{ width: '100%', zIndex: 5, backgroundColor: '#37414b', height: '30px' }}
        >
          <ActionBar id={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </>
    );
  }

  return <div style={{ position: 'relative' }}>{child}</div>;
};

export default CellListItem;
