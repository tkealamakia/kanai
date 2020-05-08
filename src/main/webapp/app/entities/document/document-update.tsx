import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import {
  Translate,
  translate,
  ICrudGetAction,
  ICrudGetAllAction,
  setFileData,
  byteSize,
  ICrudPutAction,
  openFile
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFile } from 'app/shared/model/file.model';
import { getEntities as getFiles } from 'app/entities/file/file.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDate,
  displayDefaultDateTime
} from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentUpdate = (props: IDocumentUpdateProps) => {
  const [idsfile, setIdsfile] = useState([]);
  const [idstag, setIdstag] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { documentEntity, files, tags, loading, updating } = props;

  const { content } = documentEntity;

  const handleClose = () => {
    props.history.push('/document' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getFiles();
    props.getTags();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.modifiedDate = convertDateTimeToServer(values.modifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...documentEntity,
        ...values,
        //files: mapIdList(values.files),
        tags: mapIdList(values.tags)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="kanaiApp.document.home.createOrEditLabel">
            <Translate contentKey="kanaiApp.document.home.createOrEditLabel">Create or edit a Document</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : documentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateLabel" for="document-date">
                  <Translate contentKey="kanaiApp.document.date">Date</Translate>
                </Label>
                <AvField
                  id="document-date"
                  type="datetime"
                  value={isNew ? displayDefaultDate() : convertDateTimeFromServer(props.documentEntity.date)}
                  className="form-control"
                  name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="document-title">
                  <Translate contentKey="kanaiApp.document.title">Title</Translate>
                </Label>
                <AvField id="document-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="document-content">
                  <Translate contentKey="kanaiApp.document.content">Content</Translate>
                </Label>
                <AvInput
                  id="document-content"
                  type="textarea"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="sharedLabel">
                  <AvInput id="document-shared" type="checkbox" className="form-check-input" name="shared" />
                  <Translate contentKey="kanaiApp.document.shared">Shared</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="document-createdDate">
                  <Translate contentKey="kanaiApp.document.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="document-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.documentEntity.createdDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="modifiedDateLabel" for="document-modifiedDate">
                  <Translate contentKey="kanaiApp.document.modifiedDate">Modified Date</Translate>
                </Label>
                <AvInput
                  id="document-modifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="modifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.documentEntity.modifiedDate)}
                />
              </AvGroup>
              {/*
              <AvGroup>
                <Label for="document-file">
                  <Translate contentKey="kanaiApp.document.file">File</Translate>
                </Label>
                <AvInput
                  id="document-file"
                  type="select"
                  multiple
                  className="form-control"
                  name="files"
                  value={documentEntity.files && documentEntity.files.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {files
                    ? files.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
              </AvInput>
              </AvGroup>
              */}
              <AvGroup>
                <Label for="document-file">
                  <Translate contentKey="kanaiApp.document.file">File</Translate>
                </Label>
                  {documentEntity.files
                    ? documentEntity.files.map(otherEntity => (
                    <Row key={otherEntity.id}>
                        <Col md="1">
                          <a onClick={openFile(otherEntity.contentContentType, otherEntity.content)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                          </a>
                        </Col>
                        <Col md="10">
                          <span>
                            {otherEntity.contentContentType}, {byteSize(otherEntity.content)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('content')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    ))
                    : null}
              </AvGroup>
              <AvGroup>
                <Label for="document-tag">
                  <Translate contentKey="kanaiApp.document.tag">Tag</Translate>
                </Label>
                <AvInput
                  id="document-tag"
                  type="select"
                  multiple
                  className="form-control"
                  name="tags"
                  value={documentEntity.tags && documentEntity.tags.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tags
                    ? tags.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/document" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  files: storeState.file.entities,
  tags: storeState.tag.entities,
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating,
  updateSuccess: storeState.document.updateSuccess
});

const mapDispatchToProps = {
  getFiles,
  getTags,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpdate);
