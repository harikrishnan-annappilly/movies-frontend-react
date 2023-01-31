import _ from "lodash";
import React from "react";

function Paginate(props) {
    const { totalItems, pageSize, currentPage, onPageChange } = props;
    const pages = Math.ceil(totalItems / pageSize);
    const pageRange = _.range(1, pages + 1);

    function renderPages() {
        return pageRange.map((p) => (
            <li key={p} className="page-item">
                <a
                    className={
                        p === currentPage
                            ? "clickable page-link active"
                            : "clickable page-link"
                    }
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </a>
            </li>
        ));
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pageRange.length > 1 ? renderPages() : null}
            </ul>
        </nav>
    );
}

export default Paginate;
