import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Page, Card, ResourceList, SkeletonBodyText,
} from '@shopify/polaris';

import './Listagem.scss';

class Listagem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const { loadList } = this.props;
    await loadList();
  };

  renderResourceList = data => (
    <ResourceList
      showHeader
      items={data}
      renderItem={(item) => {
        const { id, text } = item;

        return (
          <ResourceList.Item id={id}>
            <h3>{text}</h3>
          </ResourceList.Item>
        );
      }}
    />
  );

  renderSkeleton = () => (
    <Card sectioned>
      <SkeletonBodyText />
    </Card>
  );

  render = () => {
    const { list } = this.props;
    const { data, loading } = list;

    return (
      <div className="listagem">
        <Page title="LISTAGEM">
          <Card>{loading ? this.renderSkeleton() : this.renderResourceList(data)}</Card>
        </Page>
      </div>
    );
  };
}

Listagem.propTypes = {
  list: PropTypes.object.isRequired,
  loadList: PropTypes.func.isRequired,
};

export default Listagem;
