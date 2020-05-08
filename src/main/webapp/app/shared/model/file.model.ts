import { Moment } from 'moment';
import { IDocument } from 'app/shared/model/document.model';

export interface IFile {
  id?: number;
  title?: string;
  contentContentType?: string;
  content?: any;
  shared?: boolean;
  createdDate?: Moment;
  modifiedDate?: Moment;
  documents?: IDocument[];
}

export const defaultValue: Readonly<IFile> = {
  shared: false
};
