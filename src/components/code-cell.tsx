import { useEffect } from 'react';
import { useAction } from '../hooks/use-actions';
import { usedTypedSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resize from './resizable';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useAction();
  const bundle = usedTypedSelector(state => state.bundle[cell.id]);
  const cummulativeCode = usedTypedSelector(state => {
    const { data, order } = state.cells;
    const orderedCell = order.map(i => {
      return data[i];
    });

    const showFunc = `
    import _React from 'react'
    import _ReactDOM from 'react-dom'


    var show = (v) => {
      if(typeof v === 'object'){
          if(v.$$typeof && v.props){

            _ReactDOM.render(v, document.querySelector('#root'));
          }else{

            document.querySelector('#root').innerHTML = JSON.stringify(v)
          }
      }else{

        document.querySelector('#root').innerHTML = v
      }
    };
    `;
    const showFuncNoop = `var show = () => {}`;

    let cummulativecode = [];
    for (let c of orderedCell) {
      if (c.type === 'code') {
        if (c.id === cell.id) {
          cummulativecode.push(showFunc);
        } else {
          cummulativecode.push(showFuncNoop);
        }
        cummulativecode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cummulativecode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cummulativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cummulativeCode.join('\n'));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cummulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <Resize direction="vertical">
      <div style={{ display: 'flex', height: 'calc(100% - 10px)', width: '100%' }}>
        <Resize direction="horizontal">
          <CodeEditor
            initialValue={
              cell.content === ''
                ? '/*  You can write out a react component or use show(<h1>In Browser Code Editor</h1>)*/'
                : cell.content
            }
            onChange={e => updateCell(cell.id, e)}
          />
        </Resize>
        {/* <textarea value={text} onChange={e => setText(e.target.value)}></textarea> */}
        {/* <div>
          <button onClick={handleClick}>submit</button>
        </div> */}
        {!bundle || bundle.loading === true ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resize>
  );
};

export default CodeCell;
