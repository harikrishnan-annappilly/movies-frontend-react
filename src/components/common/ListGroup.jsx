import React from "react";

function ListGroup(props) {
    const { items, selectedItem, onChange } = props;
    return (
        <div>
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key={item._id}
                        className={
                            item._id === selectedItem._id
                                ? "clickable list-group-item active"
                                : "clickable list-group-item"
                        }
                        onClick={() => onChange(item)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListGroup;
