
export type Props = {
        page: number;
        pages: number;
        onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
        const pageNumbers = [];
        for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i);
        }
        const clickHandler = (e:any, number:any) => {
                e.preventDefault();
                onPageChange(number);
        }

        return (
                <div className="flex justify-center">
                        <ul className="flex border border-slate-300">
                                {pageNumbers.map((number, index) => (
                                        <li className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`} key={index}>
                                                <button
                                                        onClick={(e) => clickHandler(e, number)}
                                                >
                                                        {number}
                                                </button>
                                        </li>
                                ))}
                        </ul>
                </div>
        );
};

export default Pagination;