import { useAction } from '../hooks/use-actions';
import './add-cell.css';

interface AddCellProps {
  previousCellId: string | null;
  force?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId: prevoiusCellId, force = false }) => {
  const { insertCellAfter: insertCellBefore } = useAction();
  return (
    <div className={`add-cell ${force && 'force'}`}>
      <div className="add-button">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(prevoiusCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(prevoiusCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
