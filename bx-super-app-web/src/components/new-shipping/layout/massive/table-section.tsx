import '@bxreact/theme';
import { useState, useMemo } from 'react';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import imgAlert from 'images/new-shipping/globoalert.png';
import styles from './table-section.module.css';
import {
  BxBox,
  BxCancel,
  BxReload,
  BxExclamation,
} from '@bx-design/react-icons';
import { TableCell } from '@bxreact/table';
import { Button } from '@bxreact/button';

import {
  useMassiveTable,
  useMassiveIsSuccess,
} from 'emission-lib/hooks/massive';
import {
  MassiveMetaData,
  MassiveTableColumns,
  MassiveCatch,
  MassiveModalMessages,
} from 'types/massive-table';
import { useStep } from 'emission-lib/hooks/emission-state';
import { massive } from 'dictionary';
import { formatNumber } from 'utils/formatNumber';
import { useRegions } from 'hooks/locations/use-regions';
import { FieldText } from '@bxreact/field-text';
import { FieldSwitch } from '@bxreact/field-switch';
import { FieldSelect } from '@bxreact/field-select';
import { useComunes } from 'hooks/locations/use-communes';
import { CommuneType } from 'types/locations';
import { sizeOptions } from 'components/new-shipping/utils/size-to-measures';
import { usePromise, PromiseStatus } from 'hooks/use-promise';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { sendConfirmTable, sendValidateTable } from 'api/emissions/massive';
import { useOrigin } from 'emission-lib/hooks/origin';
import { tableToObject, Updates, mergeUpdatesToTable } from './utils';
import { MassiveModalProcess } from './modal-process';
import { TableWrapper } from '@bxreact/table-wrapper';
import { MassiveModalTutorial } from './modal-tutorial';

type InternalTableHeaderColumns = {
  [prop in keyof MassiveTableColumns]: any;
} & { id: string };

export function TableSection(): JSX.Element {
  const [step, setStep] = useStep();
  const [massiveTable, setMassiveTable] = useMassiveTable();
  const [error, setError] = useState<MassiveModalMessages>();
  const [, setSuccess] = useMassiveIsSuccess();
  const [tab, setTab] = useState<'success' | 'danger' | 'all' | ''>('all');

  const [showModal, setShowModal] = useState(false);

  const [updates, setUpdates] = useState<Updates>({});

  const [origin] = useOrigin();

  const [, statusConfirmTable, callConfirmTable] = usePromise(async () => {
    const code = origin.address.commune.location_code;
    /**
     * @todo para generar el fix, se debe generar el merge de datos de entrada y salida.
     */
    const dataMassiveSuccess = mergeUpdatesToTable(massiveTableData, updates);
    try {
      const result = await sendConfirmTable(dataMassiveSuccess, code);

      setMassiveTable({
        errorRecords: massiveTableData.filter(({ error }) => error).length,
        successRecords: dataMassiveSuccess.length,
        allRecords: dataMassiveSuccess.length,
        status: true,
        data: dataMassiveSuccess.map((data, i) => ({
          ...data,
          metadata: result[i] as MassiveMetaData,
        })),
      });

      setStep(step + 1);
    } catch (e) {
      setError((e as MassiveCatch).message);
    }
  });

  const [, statusValidateTable, callValidateTable] = usePromise(async () => {
    const code = origin.address.commune.location_code || 'CCP';
    const dataMassiveSuccess = mergeUpdatesToTable(massiveTableData, updates);
    try {
      const result = await sendValidateTable(dataMassiveSuccess, code);

      setMassiveTable(result);

      setUpdates({});
    } catch (e) {
      setError((e as MassiveCatch).message);
    }
  });

  const massiveTableData = massiveTable?.data || [];

  const dataTab = massiveTableData.filter(({ error }) =>
    tab === 'all' ? true : tab === 'success' ? !error : error
  );

  const table = tableToObject(dataTab, updates);

  const { regions } = useRegions();
  const { communes } = useComunes();

  const { id, ...nextColumns } = massive.table;

  const communesById = useMemo(() => {
    const data: { [idIso: string]: CommuneType[] } = {};
    if (!regions?.length || !communes?.length) return data;
    return communes.reduce((byId, comune) => {
      byId[comune.region] = byId[comune.region] || [];
      byId[comune.region].push(comune);
      return byId;
    }, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regions?.length, communes?.length]);

  let header: InternalTableHeaderColumns = {
    id,

    ...nextColumns,
  };

  const updateById = (
    id: number | string,
    data: {
      [I in keyof MassiveTableColumns]?: MassiveTableColumns[I];
    } & {
      metadata?: {
        region?: {
          region_iso_3166: string;
        };
        commune?: {
          location_code: string;
        };
        warranty?: boolean;
      };
    }
  ): void => {
    setUpdates({
      ...updates,
      [id]: {
        ...updates[id],
        ...data,
        ...(data.metadata
          ? {
              metadata: {
                ...updates[id]?.metadata,
                ...data.metadata,
              },
            }
          : {}),
      },
    });
  };

  const isNextStep = !massiveTable?.errorRecords;
  const isLoading =
    statusConfirmTable === PromiseStatus.pending ||
    statusValidateTable === PromiseStatus.pending;

  return (
    <div className={styles.container}>
      <MassiveModalTutorial></MassiveModalTutorial>
      <MassiveModalProcess
        isOpen={
          statusConfirmTable === PromiseStatus.pending ||
          statusValidateTable === PromiseStatus.pending ||
          !!error
        }
        error={error ? error : false}
        loading={isLoading}
        onReset={() => {
          if (error) setError(undefined);
        }}
      ></MassiveModalProcess>
      <div className={styles.header}>
        {massiveTable?.errorRecords ? (
          <NewShippingLayoutInfoBox
            relevant
            header='Debes resolver los errores:'
            secondaryText={
              <span>
                <b>Vuelve a cargar el archivo</b> con los errores corregidos o
                <b> edita en línea</b> el campo erróneo haciendo click sobre la
                celda. Cuando la información esté correcta, presiona el botón
                <b> “Actualizar información”</b> para que sea revisada
                nuevamente. Si deseas seguir el proceso de envío sin considerar
                los envíos con error, haz click en
                <b> “Continuar con los envíos listos”</b>.
              </span>
            }
            right={
              <Button
                size='md'
                outline
                onClick={() => {
                  setSuccess(false);
                  setStep(step - 1);
                }}
              >
                Volver a cargar el archivo
              </Button>
            }
          />
        ) : (
          <NewShippingLayoutInfoBox
            relevant
            status='success'
            header='Super! Todos tus registros estan correctos y listos para enviar!'
            secondaryText={
              <span>
                Revisa los datos y si te parece todo bien, haz click en
                <b> “Continuar con los envíos listos”</b> para proceder al pago.
                Si te equivocaste de archivo, puedes usar el botón “Volver a
                cargar archivo” o puedes editar las celdas sin tener que volver
                a subirlo. Recuerda siempre dar click en “Actualizar
                información” para validar los cambios.
              </span>
            }
            right={
              <Button
                size='md'
                outline
                onClick={() => {
                  setSuccess(false);
                  setStep(step - 1);
                }}
              >
                Volver a cargar el archivo
              </Button>
            }
          />
        )}
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.cardActions}>
            <Button
              status={tab === 'all' ? 'info' : ''}
              thead
              onClick={() => setTab('all')}
            >
              <BxBox size={25} />
              {massiveTable?.allRecords} registros
            </Button>
            <Button
              thead
              status={tab === 'success' ? 'success' : ''}
              onClick={() => setTab('success')}
            >
              <BxBox size={25} />
              {massiveTable?.successRecords} Correctos
            </Button>
            <Button
              thead
              status={tab === 'danger' ? 'danger' : ''}
              onClick={() => setTab('danger')}
            >
              <BxCancel size={25} />
              {massiveTable?.errorRecords} Erróneos
            </Button>
          </div>
          <div className={styles.cardActions}>
            <Button
              size='md'
              onClick={callValidateTable}
              bgcolor={isLoading ? 'blue-space' : 'blue'}
            >
              <span className={isLoading ? styles.iconLoading : ''}>
                <BxReload size={25} />
              </span>
              {isLoading ? 'Actualizando...' : 'Actualizar información'}
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <TableWrapper
            data={table}
            header={header}
            types={{
              id: (data, value) => <TableCell>{value}</TableCell>,
              price(data, { error, value }) {
                let isError =
                  !(typeof value === 'number') || error || data.error;
                let tooltip = null;
                if (isError) {
                  const errors: string[] = Object.entries(data)
                    .filter(
                      ([prop, value]: [string, any]) =>
                        prop !== 'price' && value?.error
                    )
                    .map(
                      ([index]) =>
                        //@ts-ignore
                        massive.labels[index] || index
                    );

                  tooltip = (
                    <div>
                      <b>
                        {errors.length
                          ? `Error${errors.length > 1 ? 'es' : ''}:`
                          : '  :'}
                      </b>
                      {errors.join(', ')}
                    </div>
                  );
                }

                return (
                  <TableCell
                    tooltip={tooltip}
                    background={isError ? '' : '#FFE4CC'}
                  >
                    {isError ? (
                      <span className={styles.tableCellError}>
                        <BxExclamation />
                        <span>Error</span>
                      </span>
                    ) : (
                      `$ ${formatNumber(Math.round(value * 1.19))}`
                    )}
                  </TableCell>
                );
              },
              warranty: (data, { value }) => (
                <TableCell>
                  <FieldSwitch
                    checked={value}
                    onChange={(warranty) => {
                      if (data.valueContent.value >= 85000 || !warranty) {
                        updateById(data.id, {
                          warranty,
                        });
                      }
                    }}
                  />
                </TableCell>
              ),
              region: (data, { error }) => (
                <FieldSelect
                  appearance='cell'
                  value={data.metadata?.region?.region_iso_3166}
                  status={error ? 'danger' : ''}
                  placeholder='⚠️ Selecciona una región'
                  onChange={(value) => {
                    const region = regions?.find(
                      (region) => region.region_iso_3166 === value
                    );
                    if (region) {
                      const commune: CommuneType =
                        communesById[region.region_iso_3166][0];

                      commune &&
                        updateById(data.id, {
                          region: region.name,
                          commune: commune.name,
                          metadata: {
                            region: {
                              region_iso_3166: region.region_iso_3166,
                            },
                            commune: {
                              location_code: commune.location_code,
                            },
                          },
                        });
                    }
                  }}
                  options={
                    regions?.map((region) => ({
                      value: region.region_iso_3166,
                      label: region.name,
                    })) || []
                  }
                />
              ),
              commune: (data, { error }) => (
                <FieldSelect
                  appearance='cell'
                  value={data?.metadata?.commune?.location_code}
                  status={error ? 'danger' : ''}
                  placeholder={
                    data.metadata.region
                      ? '⚠️ Selecciona una comuna'
                      : '⚠️ Selecciona antes una región'
                  }
                  onChange={(value) => {
                    const commune = communesById[
                      data.metadata.region.region_iso_3166
                    ].find((commune) => commune.location_code === value);
                    commune &&
                      updateById(data.id, {
                        commune: commune.name,
                        metadata: {
                          commune: {
                            location_code: commune.location_code,
                          },
                        },
                      });
                  }}
                  options={
                    communesById[data?.metadata?.region?.region_iso_3166]?.map(
                      (commune) => ({
                        value: commune.location_code,
                        label: commune.name,
                      })
                    ) || []
                  }
                />
              ),
              isPickup: (data, { value }) => (
                <TableCell background='var(--bx-color-grey-you)'>
                  {value ? 'Punto blue' : 'Domicilio'}
                </TableCell>
              ),
              valueContent: (data, { value, error }) => (
                <FieldText
                  status={error ? 'danger' : ''}
                  type='number'
                  value={`${value}`}
                  onChange={(valueContent) =>
                    updateById(data.id, {
                      valueContent: Number(valueContent),
                    })
                  }
                ></FieldText>
              ),
              size: (data, { value, error }) => (
                <FieldSelect
                  appearance='cell'
                  status={error ? 'danger' : ''}
                  value={value}
                  placeholder='⚠️ Selecciona una talla'
                  onChange={(size) => {
                    updateById(data.id, {
                      size,
                    });
                  }}
                  options={sizeOptions.map((value) => ({
                    value,
                    label: value,
                  }))}
                />
              ),
              default: (data, cellValue: any, property: any) => {
                const { value, error } = cellValue || {};
                return (
                  <FieldText
                    onChange={(value) => {
                      updateById(data.id, {
                        [property]: value,
                      });
                    }}
                    status={error ? 'danger' : ''}
                    value={value}
                  />
                );
              },
            }}
            rowStyle={(data) =>
              data?.error
                ? {
                    '--table-row-background': '#FFE9E9',
                  }
                : null
            }
          ></TableWrapper>
        </div>
      </div>
      <Modal isOpen={showModal} toggle={() => {}} centered keyboard={false}>
        <ModalBody>
          <div className={styles.modal}>
            <img src={imgAlert} alt='' width='72' />
            <p>
              <strong>¿Deseas continuar?</strong> Solo se harán {` `}
              {massiveTable?.successRecords} envíos, los envíos con errores no
              serán considerados en este proceso
            </p>
            <div className={styles.modalRow}>
              <Button
                size='md'
                outline
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                size='md'
                disabled={statusConfirmTable === PromiseStatus.pending}
                onClick={callConfirmTable}
              >
                Confirmar envíos
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <div className={styles.footer}>
        <Button
          size='md'
          disabled={
            !massiveTable?.successRecords ||
            statusConfirmTable === PromiseStatus.pending ||
            !!Object.keys(updates).length
          }
          onClick={
            isNextStep
              ? callConfirmTable
              : () => {
                  setShowModal(true);
                }
          }
        >
          {isNextStep
            ? 'Confirmar envíos'
            : `Continuar con los ${massiveTable?.successRecords} envíos listos`}
        </Button>
      </div>
    </div>
  );
}
