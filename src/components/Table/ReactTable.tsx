import React, { FC, useMemo, DependencyList, useEffect, useRef } from 'react';
import {
  useTable,
  useFlexLayout,
  useSortBy,
  Column,
  Row,
  usePagination,
  Cell,
} from 'react-table';
import styled, { css } from 'styled-components';

import { FlexItemsCenter, GridDivCenteredRow } from '@/components/Base/Div';
import { ArrowDown, ArrowUp } from 'react-feather';

export type TablePalette = 'primary';

const CARD_HEIGHT = `71px`;
const MAX_PAGE_ROWS = 100;
const MAX_TOTAL_ROWS = 1000;

type ColumnWithSorting<D extends Record<string, any>> = Column<D> & {
  sortType?: string | ((rowA: Row<any>, rowB: Row<any>) => -1 | 1);
  sortable?: boolean;
  columns?: Column[];
};

type TableProps = {
  palette?: TablePalette;
  data: object[];
  columns: ColumnWithSorting<object>[];
  columnsDeps?: DependencyList;
  options?: any;
  onTableRowClick?: (row: Row<any>) => void;
  className?: string;
  isLoading?: boolean;
  noResultsMessage?: React.ReactNode;
  showPagination?: boolean;
  pageSize?: number | null;
  hiddenColumns?: string[];
  hideHeaders?: boolean;
  highlightRowsOnHover?: boolean;
  sortBy?: object[];
  showShortList?: boolean;
  lastRef?: any;
};

export const Table: FC<TableProps> = ({
  columns = [],
  columnsDeps = [],
  data = [],
  options = {},
  noResultsMessage = null,
  onTableRowClick = undefined,
  palette = `primary`,
  isLoading = false,
  className,
  showPagination = false,
  pageSize = null,
  hiddenColumns = [],
  hideHeaders,
  highlightRowsOnHover,
  showShortList,
  sortBy = [],
  lastRef = null,
}) => {
  const memoizedColumns = useMemo(
    () => columns,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    columnsDeps,
  );

  // TODO: How do I tell Typescript about the usePagination props?
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setHiddenColumns,
  } = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: {
        pageSize: showPagination
          ? pageSize
            ? pageSize
            : MAX_PAGE_ROWS
          : showShortList
          ? pageSize ?? 5
          : MAX_TOTAL_ROWS,
        hiddenColumns: hiddenColumns,
        sortBy: sortBy,
      },
      autoResetPage: false,
      autoResetSortBy: false,
      ...options,
    },
    useSortBy,
    usePagination,
    useFlexLayout,
  );

  useEffect(() => {
    setHiddenColumns(hiddenColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset to the first page
  // this fires when filters are applied that change the data
  // if a filter is applied that reduces the data size below max pages for that filter, reset to the first page
  useEffect(() => {
    if (pageIndex > pageCount) {
      gotoPage(0);
    }
  }, [pageIndex, pageCount, gotoPage]);

  const defaultRef = useRef(null);

  return (
    <>
      <TableContainer>
        <ReactTable
          {...getTableProps()}
          palette={palette}
          className={className}
        >
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow
                className="table-row"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column: any) => (
                  <TableCellHead
                    hideHeaders={hideHeaders}
                    {...column.getHeaderProps(
                      column.sortable
                        ? column.getSortByToggleProps()
                        : undefined,
                    )}
                  >
                    {column.render(`Header`)}
                    {column.sortable && (
                      <SortIconContainer>
                        <ArrowDown size={12} color="#2ED9FF" />
                        <ArrowUp size={12} color="#2ED9FF" />
                      </SortIconContainer>
                    )}
                  </TableCellHead>
                ))}
              </TableRow>
            );
          })}
          {isLoading
            ? undefined
            : page.length > 0 && (
                <TableBody className="table-body" {...getTableBodyProps()}>
                  {page.map((row: Row, idx: number) => {
                    prepareRow(row);
                    const props = row.getRowProps();
                    const localRef =
                      lastRef && idx === page.length - 1 ? lastRef : defaultRef;
                    return (
                      <TableBodyRow
                        className="table-body-row"
                        {...props}
                        ref={localRef}
                        onClick={
                          onTableRowClick
                            ? () => onTableRowClick(row)
                            : undefined
                        }
                        $highlightRowsOnHover={highlightRowsOnHover}
                      >
                        {row.cells.map((cell: Cell) => (
                          <TableCell
                            className="table-body-cell"
                            {...cell.getCellProps()}
                          >
                            {cell.render(`Cell`)}
                          </TableCell>
                        ))}
                      </TableBodyRow>
                    );
                  })}
                </TableBody>
              )}
          {!!noResultsMessage &&
            !isLoading &&
            data.length === 0 &&
            noResultsMessage}
        </ReactTable>
      </TableContainer>
    </>
  );
};

const TableContainer = styled.div<{ width?: number | string }>`
  background: ${({ theme }) => theme.colors.bgNavy};
  overflow-x: auto;
`;

export const TableRow = styled.div``;

const TableBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const TableBodyRow = styled.div<{ $highlightRowsOnHover?: boolean }>`
  cursor: ${(props) => (props.onClick ? `pointer` : `default`)};

  &:last-child {
    border: none;
  }

  & > div {
    border-bottom: 1px solid #575768;
  }

  &:nth-child(odd) {
  }
`;

const SortIconContainer = styled.span`
  display: flex;
`;

const TableCell = styled(FlexItemsCenter)`
  box-sizing: border-box;
  &:first-child {
    padding-left: 14px;
  }
  &:last-child {
    padding-right: 14px;
  }
`;

const TableCellHead = styled(TableCell)<{ hideHeaders: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray900};
  user-select: none;
  &:first-child {
    padding-left: 18px;
  }
  &:last-child {
    padding-right: 18px;
  }
  ${(props) => (props.hideHeaders ? `display: none` : ``)}
`;

export const TableNoResults = styled(GridDivCenteredRow)`
  padding: 50px 40px;
  text-align: center;
  justify-content: center;
  margin-top: -2px;
  justify-items: center;
  grid-gap: 10px;
  font-size: 16px;
  div {
    text-decoration: underline;
    cursor: pointer;
    font-size: 16px;
  }
`;

const ReactTable = styled.div<{ palette: TablePalette }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.gray900};
  border-radius: 6px;

  ${(props) =>
    props.palette === `primary` &&
    css`
      ${TableBody} {
        max-height: calc(100% - ${CARD_HEIGHT});
      }
      ${TableCell} {
        font-size: 12px;
        height: ${CARD_HEIGHT};
      }
      ${TableCellHead} {
        color: ${(props) => props.theme.colors.gray};
      }
      ${TableBodyRow} {
      }
    `}
`;

export default Table;
