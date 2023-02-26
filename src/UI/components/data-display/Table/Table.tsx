import React, { PropsWithChildren, useMemo } from "react";
// import {} from '@mui/material';
import {
  TablePaper,
  TableStyled,
  TableContainerStyled,
  TableHeadStyled,
  TableRowStyled,
  TableCellStyled,
  TableBodyStyled,
  TablePaginationStyled,
} from "./Table.styled";

export interface TableProps<T> {
  header: string[];
  data: T[];
  rowElement: (item: T, index: number) => React.ReactNode;
  itemsPerPage?: number;
  currentPage?: number;
}

export type TableComponetType = <T>(props: TableProps<T>) => React.ReactElement;

const Table: TableComponetType = ({
  header,
  rowElement,
  data,
  currentPage,
  itemsPerPage,
}) => {
  const tableData = useMemo<typeof data>(() => {
    if (itemsPerPage !== undefined && currentPage !== undefined) {
      return data.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      );
    }
    return data;
  }, [data, itemsPerPage, currentPage]);

  return (
    <TablePaper>
      <TableContainerStyled>
        <TableStyled>
          <TableHeadStyled>
            <TableRowStyled>
              {header.map((title, index) => {
                return <TableCellStyled key={index}>{title}</TableCellStyled>;
              })}
            </TableRowStyled>
          </TableHeadStyled>

          <TableBodyStyled>
            {tableData.map((item, index) => {
              return rowElement(item, index);
            })}
          </TableBodyStyled>
        </TableStyled>
      </TableContainerStyled>
    </TablePaper>
  );
};

export default Table;
export const TableRow = TableRowStyled;
export const TableCell = TableCellStyled;
export const TablePagination = TablePaginationStyled;
