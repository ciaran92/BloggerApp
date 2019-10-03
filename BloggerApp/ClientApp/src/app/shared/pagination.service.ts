import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

    constructor() { }
    
    /**
   * Method used to return an array of current viewable pages
   * @param currentPage current page the user is on
   * @param pageSize how many articles will be displayed per page
   * @param totalPages the total number of pages that there will be based off of the amount of articles 
   * @param maxPages the max amount of pages that will be shown in the pagination nav area
   */
    updatePages(currentPage: number, pageSize: number, totalPages: number, maxPages: number) {

        if(currentPage < 1) 
        {
            currentPage = 1;
        }
        else if(currentPage > totalPages) 
        {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        
        if(totalPages <= maxPages) 
        {
            startPage = 1;
            endPage = totalPages;
        } 
        else 
        {
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

            if(currentPage <= maxPagesBeforeCurrentPage) 
            {
                startPage = 1;
                endPage = maxPages;
            } 
            else if(currentPage + maxPagesAfterCurrentPage >= totalPages) 
            {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } 
            else 
            {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, 100);

        return Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    }
}