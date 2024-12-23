import cs from 'classnames';
import { BxPin } from '@bx-design/react-icons';

import styles from 'components/new-shipping/layout/destiny/pickup-list.module.scss';
import type { AgencyType } from 'types/locations';
import { parseOpenHours } from 'components/new-shipping/utils/parse-open-hours-agency';
import { useShippingDestiny } from 'emission-lib/hooks/shipping-destiny';

type Props = {
  agencies?: Array<AgencyType>;
};

function NewShippingLayoutDestinyPickupList({ agencies }: Props): JSX.Element {
  const [destiny, setDestiny] = useShippingDestiny();

  const handleClick = (agency: AgencyType): void => {
    setDestiny((prev) => ({
      ...prev,
      agency_id: agency.agency_id,
      agency_name: agency.agency_name,
      address: {
        ...prev.address,
        city: agency.location.city_name,
        country: agency.location.country_name,
        geolocation: agency.location.geolocation,
        street: agency.location.street_name,
        street_number: agency.location.street_number,
        other_info: agency.location.other_info,
        reference: agency.location.other_info || '',
      },
    }));
  };

  return (
    <div className={styles.agencyList}>
      {agencies &&
        agencies.map((agency) => {
          return (
            <div
              className={cs(styles.agencyBox, {
                [styles.agencyBoxIsActive]:
                  destiny.agency_name === agency.agency_name,
              })}
              key={agency.agency_id}
              onClick={() => handleClick(agency)}
            >
              <div className={styles.agency}>
                <div className={styles.agencyLeft}>
                  <div className={styles.agencyTitle}>
                    {agency.agency_name.replace('Pick Up Blue Express ', '')}
                  </div>
                  <div className={styles.agencyUbication}>
                    <div className={styles.iconBox}>
                      <BxPin
                        color={
                          destiny.agency_name === agency.agency_name
                            ? 'color: white'
                            : 'var(--bx-color-blue-fun)'
                        }
                        size={21}
                      />
                    </div>
                    <div>
                      {`${agency.location.street_name} ${
                        agency.location.street_number
                      } ${agency.location.other_info ? ',' : ''} ${
                        agency.location.other_info || ''
                      }`}
                    </div>
                  </div>
                </div>

                <div className={styles.agencyRight}>
                  <div
                    className={cs(styles.agencyStatus, {
                      [styles.agencyStatusOk]: agency.status,
                      [styles.agencyStatusNo]: !agency.status,
                      [styles.agencyStatusSelected]:
                        destiny.agency_name === agency.agency_name,
                    })}
                  >
                    {agency.status ? 'Disponible' : 'No Disponible'}
                  </div>
                  <div>
                    {parseOpenHours(agency.open_hours).monToFri.day ? (
                      <div
                        className={cs(styles.agencyTime, {
                          [styles.agencyTimeIsActive]:
                            destiny.agency_name === agency.agency_name,
                        })}
                      >
                        Lun - Vie{' '}
                        {parseOpenHours(agency.open_hours).monToFri.day?.from} -{' '}
                        {parseOpenHours(agency.open_hours).monToFri.day?.to}
                      </div>
                    ) : (
                      <div
                        className={cs(styles.agencyTime, {
                          [styles.agencyTimeIsActive]:
                            destiny.agency_name === agency.agency_name,
                        })}
                      >
                        Lun - Vie{' '}
                        {
                          parseOpenHours(agency.open_hours).monToFri.morning
                            ?.from
                        }{' '}
                        -{' '}
                        {parseOpenHours(agency.open_hours).monToFri.morning?.to}{' '}
                        |{' '}
                        {
                          parseOpenHours(agency.open_hours).monToFri.afternoon
                            ?.from
                        }{' '}
                        -{' '}
                        {
                          parseOpenHours(agency.open_hours).monToFri.afternoon
                            ?.to
                        }
                      </div>
                    )}
                    {parseOpenHours(agency.open_hours).haveWeekend ? (
                      parseOpenHours(agency.open_hours).weekend?.day ? (
                        <div
                          className={cs(styles.agencyTime, {
                            [styles.agencyTimeIsActive]:
                              destiny.agency_name === agency.agency_name,
                          })}
                        >
                          {parseOpenHours(agency.open_hours).weekend?.withSunday
                            ? 'Sáb a Dom'
                            : 'Sáb'}{' '}
                          {parseOpenHours(agency.open_hours).weekend?.day?.from}{' '}
                          - {parseOpenHours(agency.open_hours).weekend?.day?.to}
                        </div>
                      ) : (
                        <div
                          className={cs(styles.agencyTime, {
                            [styles.agencyTimeIsActive]:
                              destiny.agency_name === agency.agency_name,
                          })}
                        >
                          {parseOpenHours(agency.open_hours).weekend?.withSunday
                            ? 'Sáb a Dom'
                            : 'Sáb'}{' '}
                          {
                            parseOpenHours(agency.open_hours).weekend?.morning
                              ?.from
                          }{' '}
                          -{' '}
                          {
                            parseOpenHours(agency.open_hours).weekend?.morning
                              ?.to
                          }{' '}
                          |{' '}
                          {
                            parseOpenHours(agency.open_hours).weekend?.afternoon
                              ?.from
                          }{' '}
                          -{' '}
                          {
                            parseOpenHours(agency.open_hours).weekend?.afternoon
                              ?.to
                          }
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default NewShippingLayoutDestinyPickupList;
