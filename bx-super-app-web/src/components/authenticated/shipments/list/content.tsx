import { Col, Row } from '@bx-design/react-grid';
import { BxFilePdf } from '@bx-design/react-icons';
import { Button } from '@bxreact/button';
import { DatePickerRange } from '@bxreact/date-picker';
import { Pagination } from '@bxreact/pagination';
import { Table, TableCell } from '@bxreact/table';
import '@bxreact/theme';
import {
  getShippingListByUserAndDateRange,
  getShippingListByUserAndStatus,
} from 'api/emissions/list';
import { Badge, BadgeProps } from 'components/ui-bx/badge';
import { Card } from 'components/ui-bx/card';
import excel from 'js2excel';
import { DateTime } from 'luxon';
import { FC, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { formatNumber } from 'utils/formatNumber';
import MonitoringPanelContentHeaderType from './header-type';
import MonitoringPanelIssueBox from './issue-box';
import { Loading } from './loading';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const INITIAL_DATE = DateTime.now().minus({ week: 4 }).toJSDate();
const END_DATE = DateTime.now().toJSDate();

const ITEMS_PER_PAGE = [15, 30, 50, 100, 200, 500, 1000];

const selectVariant = (macrostate: string): BadgeProps['variant'] => {
  switch (macrostate) {
    case 'En Camino':
    default:
      return 'primary';
    case 'Entregado':
      return 'success';
    case 'En Preparación':
      return 'info';
    case 'Retirado':
      return 'warning';
    case 'Problema en la Entrega':
      return 'danger';
  }
};

const HeaderTable = {
  receiver: 'Destinatario',
  commune: 'Comuna destino',
  pymeName: 'Quién envía',
  date: 'Fecha de creación',
  paymentMethod: 'Medio de Pago',
  totalValue: 'Valor de la emisión',
  orderServiceId: 'Tracking (OS)',
  state: 'Estado',
  fileUrl: 'Etiqueta',
  billing: 'Boleta/Factura',
};

const ShipmentListContent: FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [limit, setLimit] = useState(ITEMS_PER_PAGE[0]);
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    INITIAL_DATE
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(END_DATE);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: rawData, isLoading } = useQuery(
    ['shipmentList', startDate, endDate, currentPage, limit],
    () =>
      getShippingListByUserAndDateRange({
        initDate: startDate!,
        endDate: endDate!,
        page: currentPage,
        limit,
      })
  );

  const { data: status } = useQuery(['shipmentList', startDate, endDate], () =>
    getShippingListByUserAndStatus({
      initDate: startDate!,
      endDate: endDate!,
    })
  );

  const data = useMemo(
    () =>
      rawData?.items
        ? rawData?.items.map((item) => ({
            receiver: `${item.receiver.name} ${item.receiver.lastName}`,
            commune: item.commune,
            pymeName: item.pymeName,
            date: item.date,
            paymentMethod: item.paymentMethod,
            totalValue: item.totalValue || 0,
            orderServiceId: item.orderServiceId,
            state: item?.macroestado?.[0]?.macrostate,
            fileUrl: item.shippingFileUrl,
            billing: item.billingUrl,
          }))
        : [],
    [rawData]
  );

  return (
    <Row>
      <Col col='12'>
        <Row>
          <Col col='12' lg='10'>
            <MonitoringPanelContentHeaderType data={status?.data} />
          </Col>
          <Col col='12' lg='2'>
            <MonitoringPanelIssueBox />
          </Col>
        </Row>
      </Col>
      <Col col='12'>
        <br />
        <br />
      </Col>
      <Col col='12'>
        <Card>
          {isLoading ? (
            <Loading title={<h3>Cargando lista de envíos...</h3>}></Loading>
          ) : (
            <>
              <Header>
                <div>
                  <Button
                    disabled={!data.length}
                    onClick={() => {
                      const entries = Object.entries(HeaderTable);

                      excel.json2excel({
                        data: data.map((item) =>
                          entries.reduce<{
                            [prop: string]: any;
                          }>((row, [prop, value]) => {
                            //@ts-ignore
                            row[value] = item[prop];
                            return row;
                          }, {})
                        ),
                        name: 'lista de envios',
                        formateDate: 'yyyy/mm/dd',
                      });
                    }}
                  >
                    Download excel
                  </Button>
                </div>
                <DatePickerRange
                  range={{
                    startDate: startDate || new Date(),
                    endDate: endDate || new Date(),
                  }}
                  onChange={(range) => {
                    setStartDate(range.startDate);
                    setEndDate(range.endDate);
                  }}
                ></DatePickerRange>
              </Header>
              <TableScroll>
                <Table
                  collapse={isMobile}
                  data={data}
                  header={HeaderTable}
                  types={{
                    state: (row, state = '') => (
                      <TableCell>
                        <Badge variant={selectVariant(state)} size='normal'>
                          {state}
                        </Badge>
                      </TableCell>
                    ),
                    date(row, value: string) {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-GB');
                    },
                    fileUrl: (row, url) => (
                      <TableCell>
                        {url ? (
                          <Button
                            size='xs'
                            icon
                            onClick={() => window.open(url)}
                          >
                            <BxFilePdf />
                          </Button>
                        ) : (
                          '--'
                        )}
                      </TableCell>
                    ),
                    billing: (row, url) => (
                      <TableCell>
                        {url ? (
                          <Button
                            size='xs'
                            icon
                            onClick={() => window.open(url)}
                          >
                            <BxFilePdf />
                          </Button>
                        ) : (
                          '--'
                        )}
                      </TableCell>
                    ),
                    totalValue: (row, value) => `$ ${formatNumber(value)}`,
                    orderServiceId: (row, value) => (
                      <Link to={`/tracking/${value}`}>{value}</Link>
                    ),
                  }}
                ></Table>
              </TableScroll>
              <Footer>
                {rawData?.meta && (
                  <Pagination
                    pagedLabel={`${rawData?.meta?.currentPage} de ${rawData?.meta.totalPages}`}
                    pagesPerPage={ITEMS_PER_PAGE}
                    moveLabel='Next'
                    value={limit}
                    onChangePagesPerPage={(value) => setLimit(Number(value))}
                    isMoveDisabled={(value) => {
                      switch (value) {
                        case '<':
                        case '<<':
                          return !(
                            (rawData?.meta?.currentPage || 0) -
                              (value === '<' ? 1 : 2) >
                            0
                          );
                        case '>':
                        case '>>':
                          return !(
                            (rawData?.meta?.currentPage || 0) +
                              (value === '>' ? 1 : 2) <=
                            (rawData?.meta?.totalPages || 0)
                          );
                      }
                    }}
                    onChangeMove={(value) => {
                      switch (value) {
                        case '<':
                          setCurrentPage(currentPage - 1);
                          break;
                        case '<<':
                          setCurrentPage(currentPage - 2);
                          break;
                        case '>':
                          setCurrentPage(currentPage + 1);
                          break;
                        case '>>':
                          setCurrentPage(currentPage + 2);
                          break;
                      }
                    }}
                  ></Pagination>
                )}
              </Footer>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  align-items: center;
  flex-flow: row wrap;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: end;
  padding: 20px;
`;

const TableScroll = styled.div`
  display: block;
  width: 100%;
  overflow: auto;
`;

export default ShipmentListContent;
