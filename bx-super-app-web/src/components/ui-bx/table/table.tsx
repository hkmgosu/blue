import { FC, useState } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { InputWithIcon, Select } from '../forms';
import SearchIcon from 'components/icons/search';
import { Button } from '../button';

type TableProps = {
  columns: any[];
  data?: any;
  fetchData?: any;
  loading?: boolean;
  style?: any;
  pageCount?: any;
  paginate?: boolean;
  controlledPagination?: boolean;
  onClickRow?: (row: any) => void;
};

const Table: FC<TableProps> = ({ columns, data, paginate, onClickRow }) => {
  let plugins: any[] = [];

  if (paginate) {
    plugins = [useGlobalFilter, useSortBy, usePagination];
  } else {
    plugins = [useGlobalFilter, useSortBy];
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      paginate,
      initialState: { pageIndex: 0 },
    },
    ...plugins
  );

  const [filterInput, setFilterInput] = useState('');

  const handleFilterChange = (e: any): void => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  const handleClickRow = (row: any) => () => {
    if (onClickRow) {
      onClickRow(row);
    }
  };

  function Rows(): JSX.Element {
    if (paginate) {
      return (
        <>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} onClick={handleClickRow(row)}>
                {row.cells.map((cell) => {
                  return (
                    <TableData {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}{' '}
        </>
      );
    } else {
      return (
        <>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} onClick={handleClickRow(row)}>
                {row.cells.map((cell) => {
                  return (
                    <TableData {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}{' '}
        </>
      );
    }
  }

  return (
    <TableContainer>
      {paginate && (
        <FiltersContainer>
          <ContainerSelect>
            <Select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              selectSize='sm'
              options={[
                { value: 10, name: '10' },
                { value: 20, name: '20' },
                { value: 30, name: '30' },
                { value: 40, name: '40' },
                { value: 50, name: '50' },
              ]}
            />
          </ContainerSelect>
          <ContainerSearch>
            <InputWithIcon
              value={filterInput}
              onChange={handleFilterChange}
              fullWidth={false}
              placeholder={'Buscar...'}
              inputSize='sm'
              leftIcon={
                <div>
                  <SearchIcon />
                </div>
              }
            />
          </ContainerSearch>
        </FiltersContainer>
      )}

      <MainTableContainer {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </span>
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <Rows />
        </tbody>
      </MainTableContainer>

      {paginate && (
        <Pagination>
          <PaginationInfo>
            <span>
              Página{' '}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{' '}
            </span>
          </PaginationInfo>
          <Buttons>
            <Button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              size='sm'
            >
              {'<<'}
            </Button>
            <Button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              size='sm'
            >
              {'<'}
            </Button>
            <Button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              size='sm'
            >
              {'>'}
            </Button>
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              size='sm'
            >
              {'>>'}
            </Button>
          </Buttons>
        </Pagination>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerSelect = styled.div`
  width: 150px;
`;

const ContainerSearch = styled.div`
  width: 350px;
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div``;

const PaginationInfo = styled.div``;

const MainTableContainer = styled.table`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  margin: 16px 0;
`;

const TableHeader = styled.th`
  font-weight: bold;
  padding: 8px 16px;
  background: #c4c4c4;
  text-align: center;
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    background: #c4c4c4;
  }
  &:not(:last-of-type) {
    border-bottom: solid 0.1em var(--bx-color-black);
  }
`;

const TableData = styled.td`
  text-align: center;
  padding: 16px;
`;

Table.displayName = 'Table';

Table.defaultProps = {};

export default Table;
