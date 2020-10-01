import React from "react";

function Pagination({ paginate, method, params }) {
    return (
        <div className="text-center mt-5">
            {paginate.pagination.prev_page_url && (
                <button
                    onClick={
                        paginate.pagination.prev_page_url &&
                        (() => {
                            const url = new URL(
                                paginate.pagination.prev_page_url
                            );
                            const urlParams = new URLSearchParams(url.search);
                            const page = urlParams.get("page");
                            method(...params, page);
                        })
                    }
                    aria-label='previous'
                    className="-ml-px px-4 py-2 border rounded-l-md border-gray-300 bg-gray-100 text-gray-700 hover:text-gray-500 focus:outline-none"
                >
                    <i className="fas fa-angle-left"></i>
                </button>
            )}

            {Array(paginate.pagination.last_page)
                .fill()
                .map((x, i) => {
                    i++;
                    return (
                        <button
                            aria-label={i}
                            className="-ml-px px-4 py-2 border border-gray-300 bg-gray-100 text-gray-700 hover:text-gray-500 focus:outline-none"
                            onClick={() => {
                                method(...params, i);
                            }}
                            key={i}
                            style={
                                paginate.pagination.current_page === i
                                    ? { color: "orange" }
                                    : {}
                            }
                        >
                            {i}
                        </button>
                    );
                })}
            {paginate.pagination.next_page_url && (
                <button
                    onClick={
                        paginate.pagination.next_page_url &&
                        (() => {
                            const url = new URL(
                                paginate.pagination.next_page_url
                            );
                            const urlParams = new URLSearchParams(url.search);
                            const page = urlParams.get("page");
                            method(...params, page);
                        })
                    }
                    aria-label='next'
                    className="-ml-px px-4 py-2 border rounded-r-md border-gray-300 bg-gray-100 text-gray-700 hover:text-gray-500 focus:outline-none"
                >
                    <i className="fas fa-angle-right"></i>
                </button>
            )}
        </div>
    );
}

export default Pagination;
