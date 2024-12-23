import { FC, ReactNode, useState, useMemo } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Row, Col } from '@bx-design/react-grid';
import JsonToExcel from 'js2excel';
import { nanoid } from 'nanoid';
import { BxChevronLeft, BxChevronRight } from '@bx-design/react-icons';
import cx from 'clsx';

import { InputWithIcon, Select } from 'components/ui-bx/forms';
import SearchIcon from 'components/icons/search';
import { Pagination, PaginationItemButton } from 'components/ui-bx/pagination';
import { Spinner } from 'components/ui-bx/spinner';

type TableProps = {
  columns: any[];
  data?: any;
  paginate?: boolean;
  onClickRow?: (row: any) => void;
  countTitle?: string;
  withSearch?: boolean;
  withExcelDownload?: boolean;
  customFilter?: ReactNode;
  omitColumnExcel?: string[];
  fetching?: boolean;
  customDataToExport?: any[];
};

const Table: FC<TableProps> = ({
  columns,
  data,
  paginate,
  onClickRow,
  countTitle,
  withSearch,
  withExcelDownload,
  customFilter,
  omitColumnExcel = [],
  fetching,
  customDataToExport,
}) => {
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

  useMemo(() => {
    return '';
  }, []);

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

  type KeyValueType = { [key: string]: any };

  const generateExcel = (): void => {
    if (data.length) {
      const dataToExport = customDataToExport
        ? customDataToExport
        : rows.map((row) => {
            return row.allCells.reduce((acum, cell) => {
              if (
                omitColumnExcel.length &&
                omitColumnExcel.includes(String(cell.column.Header || ''))
              ) {
                return acum;
              }

              return {
                ...acum,
                [String(cell.column.Header || '')]: cell.value,
              };
            }, {} as KeyValueType);
          });

      JsonToExcel.json2excel({ data: dataToExport, name: nanoid() });
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
                      <span className='__title'>{cell.column.Header}</span>
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
                      <span className='__title'>{cell.column.Header}</span>
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
    <>
      <ContentTableTop>
        <Row className={cx(withExcelDownload || withSearch ? 'mb-4' : 'mb-0')}>
          {withExcelDownload && (
            <Col col='12'>
              {data && (
                <ExcelButton onClick={generateExcel}>
                  Descargar Excel
                </ExcelButton>
              )}
            </Col>
          )}
          {(withSearch || customFilter) && (
            <Col col='12'>
              {withSearch && (
                <FiltersContainer>
                  <ContainerSearch>
                    <InputWithIcon
                      inputSize='sm'
                      value={filterInput}
                      onChange={handleFilterChange}
                      fullWidth={false}
                      placeholder={'Buscar...'}
                      leftIcon={
                        <div>
                          <SearchIcon />
                        </div>
                      }
                    />
                  </ContainerSearch>
                  {customFilter}
                </FiltersContainer>
              )}
            </Col>
          )}
        </Row>
        <Row>
          <Col col='12'>
            <TableContainer>
              <MainTableContainer
                {...getTableProps()}
                className={paginate ? '__paginate-table' : ''}
              >
                <Thead>
                  {headerGroups.map((headerGroup) => (
                    <TrHead {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => {
                        return (
                          <TableHeader
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render('Header')}
                            <span>
                              {column.canSort ? (
                                column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <FaSortDown />
                                  ) : (
                                    <FaSortUp />
                                  )
                                ) : (
                                  <FaSort />
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          </TableHeader>
                        );
                      })}
                    </TrHead>
                  ))}
                </Thead>
                <Tbody
                  {...getTableBodyProps()}
                  className={cx({ __block: fetching })}
                >
                  {!fetching ? (
                    <Rows />
                  ) : (
                    <LoadingContainer>
                      <Spinner size='lg' variant='secondary' />
                    </LoadingContainer>
                  )}
                </Tbody>
              </MainTableContainer>
            </TableContainer>
          </Col>
        </Row>
      </ContentTableTop>
      {paginate && (
        <Row>
          <Col col='12'>
            <Row>
              <Col col='12' xl='6'>
                <Count>
                  <CountWrapper>
                    <CountSpan>{countTitle}</CountSpan>
                    <CountSelectSpan>
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
                    </CountSelectSpan>
                    <CountSpan>
                      Mostrando {pageIndex + 1} de {pageOptions.length}
                    </CountSpan>
                  </CountWrapper>
                </Count>
              </Col>
              <Col col='12' xl='6'>
                <PaginationContainer>
                  <Pagination ariaLabel='Paginación' justifyContent='end'>
                    <PaginationItemButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <BxChevronLeft size={15} />
                    </PaginationItemButton>
                    {pageOptions.map((pg) => (
                      <PaginationItemButton
                        onClick={() => gotoPage(pg)}
                        key={pg}
                        active={pg === pageIndex}
                      >
                        {pg + 1}
                      </PaginationItemButton>
                    ))}
                    <PaginationItemButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      <BxChevronRight size={15} />
                    </PaginationItemButton>
                  </Pagination>
                </PaginationContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

const Thead = styled.thead`
  display: none;
  @media (min-width: 768px) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: revert;
  }
`;

const TrHead = styled.tr`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  & > th:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  & > th:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  border-radius: 15px;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`;

const ContainerSearch = styled.div`
  margin-bottom: 10px;
  width: 100%;
  padding: 0px 20px;
  & > input {
    width: 100%;
  }
  @media (min-width: 768px) {
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 0px;
    width: auto;
    & > input {
      max-width: 160px;
    }
  }
`;

const MainTableContainer = styled.table`
  width: 100%;
  border-radius: 15px;
  background-color: var(--bx-color-white);
  &.__paginate-table {
    margin-bottom: 40px;
  }
  @media (min-width: 768px) {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const TableHeader = styled.th`
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 23px;
  color: #000000;
  background-color: var(--bx-color-blue-soft);
  text-align: center;
  padding: 15px;
`;

const TableRow = styled.tr`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  border: 1px solid var(--bx-color-grey-play);
  border-radius: 15px;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    border: none;
    padding: 0px;
    margin-bottom: 0px;
    display: revert;
    cursor: pointer;
    transition: all ease 0.2s;
    &:hover {
      background: var(--bx-color-lorange-skin);
    }
  }
`;

const TableData = styled.td`
  display: flex;
  flex: 1;
  min-width: 33.333333%;
  max-width: 33.333333%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: var(--bx-font-secondary);
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 10px;
  height: 100%;
  & > span.__title {
    display: block;
    font-family: var(--bx-font-secondary);
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 158%;
    letter-spacing: 0.03em;
  }
  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 145%;
    display: revert;
    text-align: center;
    padding: 16px;
    margin-bottom: 0px;
    height: auto;
    & > span.__title {
      display: none;
    }
  }
`;

const Tbody = styled.tbody`
  & > tr:last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    & > td:first-child {
      border-bottom-left-radius: 15px;
    }
    & > td:last-child {
      border-bottom-right-radius: 15px;
    }
  }
  display: block;
  padding: 20px;
  overflow-y: scroll;
  &.__block {
    display: table-caption;
  }
  @media (min-width: 768px) {
    display: revert;
    padding: 0px;
    overflow-y: auto;
  }
`;

const Count = styled.div`
  display: flex;
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountSpan = styled.span``;

const CountSelectSpan = styled.span`
  margin: 0 8px;
`;

const PaginationContainer = styled.div`
  & > nav > ul > li > button {
    background-color: transparent !important;
    border: none !important;
    border-radius: 5px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > nav > ul > li.active > button {
    background-color: var(--bx-color-orange) !important;
  }
`;

const ExcelButton = styled.button`
  border: 1px solid var(--bx-color-orange);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bx-color-white);
  outline: none;
  color: var(--bx-color-orange);
  margin-bottom: 20px;
  margin-left: 20px;
  &:active {
    outline: none;
  }
  & > a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: var(--bx-color-orange);
  }
  @media (min-width: 768px) {
    margin-left: 0px;
    background-color: var(--bx-color-orange);
    color: var(--bx-color-white);
    a:link,
    a:visited,
    a:active {
      color: var(--bx-color-white);
    }
  }
`;

const ContentTableTop = styled.div`
  padding-top: 30px;
  margin-bottom: 30px;
  border-radius: 15px;
  background: var(--bx-color-white);
  @media (min-width: 768px) {
    background: none;
    border-radius: 0px;
    margin: 0px;
    padding: 0px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

Table.displayName = 'Table';

Table.defaultProps = {};

export default Table;
