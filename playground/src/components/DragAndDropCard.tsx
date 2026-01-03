import type { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

const ItemTypes = {
  CARD: 'card',
} as const;

const style: React.CSSProperties = {
  cursor: 'move',
};

export interface CardProps {
  id: string;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onClick?: () => void;
  isActive?: boolean;
  /** Test status: 'passed', 'failed', or undefined for no status */
  status?: 'passed' | 'failed';
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DragAndDropCard: FC<CardProps> = ({ id, text, index, moveCard, onClick, isActive, status }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(() => ({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  }), [index, moveCard]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    isDragging: (monitor) => id === monitor.getItem()?.id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, index]);

  const draggingStyle: React.CSSProperties = isDragging ? { visibility: 'hidden' } : {};

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ ...style, ...draggingStyle }}
      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isActive ? 'active' : ''}`}
      data-handler-id={handlerId || undefined}
      onClick={onClick}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
      {status && (
        <span className={`badge ${status === 'passed' ? 'bg-success' : 'bg-danger'} ms-2`}>
          {status === 'passed' ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
};

export default DragAndDropCard;
