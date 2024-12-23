import * as fs from 'fs';
import { join } from 'path';
export default function getTemplate(filename: string) {
  return fs.readFileSync(join(__dirname, filename), 'utf8');
}
