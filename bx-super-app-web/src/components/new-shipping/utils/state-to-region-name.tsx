export type ChileanStatesType =
  | "O'Higgins"
  | 'Antofagasta'
  | 'Araucanía'
  | 'Arica y Parinacota'
  | 'Atacama'
  | 'Aysén'
  | 'Bío Bío'
  | 'Coquimbo'
  | 'Los Lagos'
  | 'Los Ríos'
  | 'Magallanes y la Antártica Chilena'
  | 'Maule'
  | 'Región Metropolitana'
  | 'Tarapacá'
  | 'Valparaíso'
  | 'Ñuble';

const chileanStates: Record<ChileanStatesType, string> = {
  "O'Higgins": "Región del Libertador Gral. Bernardo O'Higgins",
  Antofagasta: 'Región de Antofagasta',
  Araucanía: 'Región de la Araucanía',
  'Arica y Parinacota': 'Región de Arica y Parinacota',
  Atacama: 'Región de Atacama',
  Aysén: 'Región de Aisén del Gral. Carlos Ibañez del Campo',
  'Bío Bío': 'Región del Biobío',
  Coquimbo: 'Región de Coquimbo',
  'Los Lagos': 'Región de los Lagos',
  'Los Ríos': 'Región de los Ríos',
  'Magallanes y la Antártica Chilena':
    'Región de Magallanes y de la Antártica Chilena',
  Maule: 'Región del Maule',
  'Región Metropolitana': 'Región Metropolitana',
  Tarapacá: 'Región de Tarapacá',
  Valparaíso: 'Región de Valparaíso',
  Ñuble: 'Región de Ñuble',
};

export function stateToRegionName(state: ChileanStatesType): string {
  return chileanStates[state];
}
