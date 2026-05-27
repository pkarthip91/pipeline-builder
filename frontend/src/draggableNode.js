// draggableNode.js
export const DraggableNode = ({ type, label, icon, color = '#6366f1' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      title={label}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        borderRadius: '7px',
        background: `${color}18`,
        border: `1px solid ${color}44`,
        transition: 'all 0.15s ease',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}30`;
        e.currentTarget.style.borderColor = `${color}88`;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.borderColor = `${color}44`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon && (
        <span style={{ lineHeight: 0, display: 'inline-flex', color }}>
          {icon}
        </span>
      )}
      <span style={{
        color: 'var(--text)',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
};
