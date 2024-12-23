import type { OpenHoursType } from 'types/locations';

type ParseOpenHoursReturnType = {
  monToFri:
    | {
        morning: {
          from: string;
          to: string;
        };
        afternoon: {
          from: string;
          to: string;
        };
        day: undefined;
      }
    | {
        day: {
          from: string | null;
          to: string | null;
        };
        morning: undefined;
        afternoon: undefined;
      };
  haveWeekend: boolean;
  weekend:
    | {
        morning: {
          from: string;
          to: string;
        };
        afternoon: {
          from: string;
          to: string;
        };
        day: undefined;
        withSunday: boolean;
      }
    | {
        day: {
          from: string | null;
          to: string | null;
        };
        morning: undefined;
        afternoon: undefined;
        withSunday: boolean;
      }
    | null;
};

export function parseOpenHours(
  openHours: OpenHoursType
): ParseOpenHoursReturnType {
  const monToFri =
    openHours.monday && openHours.monday.length === 2
      ? {
          morning: {
            from: openHours.monday[0].from,
            to: openHours.monday[0].to,
          },
          afternoon: {
            from: openHours.monday[1].from,
            to: openHours.monday[1].to,
          },
        }
      : {
          day: {
            from: openHours.monday && openHours?.monday[0].from,
            to: openHours.monday && openHours?.monday[0].to,
          },
        };
  const haveSunday = openHours.sunday && openHours.sunday[0].from !== '-';
  const haveSaturday = openHours.saturday && openHours.saturday[0].from !== '-';
  const saturday =
    openHours.saturday && openHours.saturday.length === 2
      ? {
          morning: {
            from: openHours.saturday[0].from,
            to: openHours.saturday[0].to,
          },
          afternoon: {
            from: openHours.saturday[1].from,
            to: openHours.saturday[1].to,
          },
        }
      : {
          day: {
            from: openHours.saturday && openHours.saturday[0].from,
            to: openHours.saturday && openHours.saturday[0].to,
          },
        };

  const sunday =
    openHours.sunday && openHours.sunday.length === 2
      ? {
          morning: {
            from: openHours.sunday[0].from,
            to: openHours.sunday[0].to,
          },
          afternoon: {
            from: openHours.sunday[1].from,
            to: openHours.sunday[1].to,
          },
        }
      : {
          day: {
            from: openHours.sunday && openHours.sunday[0].from,
            to: openHours.sunday && openHours.sunday[0].to,
          },
        };
  const weekend = haveSunday
    ? {
        withSunday: true,
        ...sunday,
      }
    : haveSaturday
    ? { withSunday: false, ...saturday }
    : null;

  return {
    monToFri,
    haveWeekend: !!weekend,
    weekend,
  };
}
