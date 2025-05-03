// components/PaginationComponent.tsx
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // Optional: default 5
}

const PaginationComponent: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const pages: React.ReactNode[] = [];
  const half = Math.floor(maxVisiblePages / 2);
  const start = Math.max(2, currentPage - half);
  const end = Math.min(totalPages - 1, currentPage + half);

  // Always show page 1
  pages.push(
    <PaginationItem key={1}>
      <PaginationLink
        onClick={() => onPageChange(1)}
        isActive={currentPage === 1}
      >
        1
      </PaginationLink>
    </PaginationItem>
  );

  // Start Ellipsis
  if (start > 2) {
    pages.push(
      <PaginationItem key="start-ellipsis">
        <span className="px-2 select-none">...</span>
      </PaginationItem>
    );
  }

  // Middle Pages
  for (let i = start; i <= end; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink
          onClick={() => onPageChange(i)}
          isActive={currentPage === i}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  // End Ellipsis
  if (end < totalPages - 1) {
    pages.push(
      <PaginationItem key="end-ellipsis">
        <span className="px-2 select-none">...</span>
      </PaginationItem>
    );
  }

  // Always show last page if more than 1
  if (totalPages > 1) {
    pages.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          onClick={() => onPageChange(totalPages)}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {pages}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
