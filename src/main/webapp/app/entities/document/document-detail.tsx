import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentDetail = (props: IDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { documentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="kanaiApp.document.detail.title">Document</Translate> [<b>{documentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="kanaiApp.document.title">Title</Translate>
            </span>
          </dt>
          <dd>{documentEntity.title}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="kanaiApp.document.content">Content</Translate>
            </span>
          </dt>
          <dd>{documentEntity.content}</dd>
          <dt>
            <span id="shared">
              <Translate contentKey="kanaiApp.document.shared">Shared</Translate>
            </span>
          </dt>
          <dd>{documentEntity.shared ? 'true' : 'false'}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="kanaiApp.document.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={documentEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="kanaiApp.document.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={documentEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="modifiedDate">
              <Translate contentKey="kanaiApp.document.modifiedDate">Modified Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={documentEntity.modifiedDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="kanaiApp.document.file">File</Translate>
          </dt>
          <dd>
            {documentEntity.files
              ? documentEntity.files.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === documentEntity.files.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="kanaiApp.document.tag">Tag</Translate>
          </dt>
          <dd>
            {documentEntity.tags
              ? documentEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === documentEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document/${documentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ document }: IRootState) => ({
  documentEntity: document.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
