import { Moment } from 'moment';
import { IFile } from 'app/shared/model/file.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IDocument {
  id?: number;
  title?: string;
  content?: any;
  shared?: boolean;
  date?: Moment;
  createdDate?: Moment;
  modifiedDate?: Moment;
  files?: IFile[];
  tags?: ITag[];
}

export const defaultValue: Readonly<IDocument> = {
  shared: false
};
