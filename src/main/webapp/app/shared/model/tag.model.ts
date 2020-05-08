import { IDocument } from 'app/shared/model/document.model';

export interface ITag {
  id?: number;
  name?: string;
  documents?: IDocument[];
}

export const defaultValue: Readonly<ITag> = {};
