import {
  MassiveField,
  MassiveMetaData,
  MassiveRowObject,
} from 'types/massive-table';

export interface Updates {
  [id: number | string]: {
    [prop: string]: any;
  };
}

export const tableToObject = (
  fields: MassiveField[],
  updates: Updates = {}
): ({
  id: number;
  error: boolean;
} & MassiveRowObject & { metadata: MassiveMetaData })[] =>
  fields.map(({ row, error, fields, metadata }) => ({
    id: row,
    error,
    metadata: { ...metadata, ...updates?.[row]?.metadata } as MassiveMetaData,
    ...(fields.reduce(
      (current, { property, value, error }) => ({
        ...current,
        [property]: {
          value:
            property in (updates?.[row] || {})
              ? updates?.[row]?.[property]
              : value,
          error,
        },
      }),
      {}
    ) as MassiveRowObject),
  }));

export const mergeUpdatesToTable = (
  fields: MassiveField[],
  updates: Updates
): MassiveField[] =>
  fields.map(
    ({ row, fields, error }) =>
      ({
        row,
        error,
        fields:
          row in updates
            ? fields.map((cell) =>
                cell.property in updates[row]
                  ? {
                      ...cell,
                      value: updates[row][cell.property],
                    }
                  : cell
              )
            : fields,
      } as MassiveField)
  );
