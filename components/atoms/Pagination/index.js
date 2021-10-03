import styles from "./Pagination.module.css";

const Pagination = (props) => {

     const {totalPage, handleSetCurrentPage, currentPage} = props;

     return (
          <div className="flex justify-center">
               <div className={styles.paginationBox} onClick={() => handleSetCurrentPage(currentPage <= 1 ? 1 : (currentPage-1))}>
                    &lt;&lt; Previous
               </div>
               {Array(totalPage).fill(null).map((value, index) => {

                    return (
                         <div key={index+1} className={styles.paginationBox + " " + (index+1 === currentPage ? styles.selected : '')} onClick={() => handleSetCurrentPage(index+1)}>
                              {index+1}
                         </div>
                    )
               }
               )}
               <div className={styles.paginationBox} onClick={() => handleSetCurrentPage(currentPage >= totalPage ? totalPage : (currentPage+1))}>
                    Next &gt;&gt;
               </div>
          </div>
     )
}

export default Pagination;
