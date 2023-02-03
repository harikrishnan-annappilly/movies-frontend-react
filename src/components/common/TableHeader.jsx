import React from "react";

function TableHeader(props) {
    const { columns, onSortClick } = props;
    return (
        <thead className="user-select-none">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key || column.path}
                        className="clickable"
                        onClick={column.path ? () => onSortClick(column) : null}
                    >
                        {column.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
