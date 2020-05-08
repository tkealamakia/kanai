import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file.reducer';
import { IFile } from 'app/shared/model/file.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileDetail = (props: IFileDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kanaiApp.file.detail.title">File</Translate> [<b>{fileEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="kanaiApp.file.title">Title</Translate>
            </span>
          </dt>
          <dd>{fileEntity.title}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="kanaiApp.file.content">Content</Translate>
            </span>
          </dt>
          <dd>
            {fileEntity.content ? (
              <div>
                <a onClick={openFile(fileEntity.contentContentType, fileEntity.content)}>
                  <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                </a>
                <span>
                  {fileEntity.contentContentType}, {byteSize(fileEntity.content)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="shared">
              <Translate contentKey="kanaiApp.file.shared">Shared</Translate>
            </span>
          </dt>
          <dd>{fileEntity.shared ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="kanaiApp.file.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fileEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedDate">
              <Translate contentKey="kanaiApp.file.modifiedDate">Modified Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={fileEntity.modifiedDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/file" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file/${fileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ file }: IRootState) => ({
  fileEntity: file.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileDetail);
