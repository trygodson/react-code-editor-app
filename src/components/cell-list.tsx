import React from 'react';
import { usedTypedSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
  const cells = usedTypedSelector(({ cells: { data, order } }) => {
    return order.map(id => {
      return data[id];
    });
  });

  const renderedCells = cells.map((i: any) => (
    <React.Fragment key={i.id}>
      <CellListItem cell={i} />
      <AddCell previousCellId={i.id} />
    </React.Fragment>
  ));
  return (
    <div style={{ margin: '0 20px' }}>
      <AddCell previousCellId={null} force={cells.length === 0 && true} />
      {renderedCells}
    </div>
  );
};

export default CellList;
