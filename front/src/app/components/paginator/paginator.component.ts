// paginator.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() pageLimit = 1;
  @Output() onPageChange = new EventEmitter<number>();

  pages: (number | string)[] = [];

  ngOnChanges(): void {
    this.updatePages();
  }

  private updatePages(): void {
    const pageRange = 5; // Change according to your needs
    this.pages = [];

    if (this.pageLimit <= pageRange) {
      for (let i = 1; i <= this.pageLimit; i++) {
        this.pages.push(i);
      }
    } else {
    }
  }

  handlePageClick(page: number): void {
    if (page >= 1 && page <= this.pageLimit) {
      this.onPageChange.emit(page);
    }
  }

  handlePreviousPage(): void {
    if (this.currentPage > 1) {
      this.handlePageClick(this.currentPage - 1);
    }
  }

  handleNextPage(): void {
    if (this.currentPage < this.pageLimit) {
      this.handlePageClick(this.currentPage + 1);
    }
  }
  get isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  get displayedPages(): (number | string)[] {
    const displayedPages: (number | string)[] = [];
    const pageRange = this.isMobile ? 3 : 5;

    if (this.pageLimit <= pageRange) {
      for (let i = 1; i <= this.pageLimit; i++) {
        displayedPages.push(i);
      }
    } else {
      if (this.currentPage <= Math.ceil(pageRange / 2)) {
        for (let i = 1; i <= pageRange - 1; i++) {
          displayedPages.push(i);
        }
        displayedPages.push('...');
        displayedPages.push(this.pageLimit);
      } else if (
        this.currentPage >=
        this.pageLimit - Math.floor(pageRange / 2)
      ) {
        displayedPages.push(1);
        displayedPages.push('...');
        for (let i = this.pageLimit - pageRange + 2; i <= this.pageLimit; i++) {
          displayedPages.push(i);
        }
      } else {
        displayedPages.push(1);
        displayedPages.push('...');
        for (
          let i = this.currentPage - Math.floor(pageRange / 2);
          i <= this.currentPage + Math.floor(pageRange / 2);
          i++
        ) {
          displayedPages.push(i);
        }
        displayedPages.push('...');
        displayedPages.push(this.pageLimit);
      }
    }

    return displayedPages;
  }
}
