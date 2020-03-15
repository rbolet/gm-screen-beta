import './ImageGrid.css';
import React, { useState, useContext } from 'react';
import { Campaign } from '../../context/campaign-context';
import ContainerCard from './ContainerCard';

function ImageGrid(props) {
  const [selectedCategory, setSelectedCategory] = useState('Environment');

  return (
    <ContainerCard percentHeight={100} percentWidth={100}
      header={<GridHeaderButtons setSelectedCategory={setSelectedCategory}/>}
      footer={props.footer && <div>{props.footer}</div>}>
      <GridImages selectedTab={selectedCategory}/>
    </ContainerCard>
  );
}

function GridHeaderButtons(props) {

  const { campaign } = useContext(Campaign);

  const distinctCategories = [...new Set(campaign.campaignAssets.map(image => image.category))];
  const ButtonElements = distinctCategories.map(category => {
    return (<button
      key={category}
      onClick={() => props.setSelectedCategory(category)}
      className={'btn btn-outline-secondary'}>{category}</button>);
  });
  return (
    <div className="btn-group row d-flex justify-content-start">
      {ButtonElements}
    </div>
  );
}

function GridImages(props) {
  const { campaign } = useContext(Campaign);
  let GridContent = null;

  if (campaign.campaignAssets.length) {
    GridContent = campaign.campaignAssets.map(image => {
      if (image.category === props.selectedTab) {
        return (
          <img
            key={image.imageId}
            src={`./images/${image.fileName}`}
            className="grid-image m-1"/>
        );
      }
    });
  } else {
    GridContent = (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="img-thumbnail text-muted">
          {`No images have been added to ${props.campaignName}`}
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 image-grid-body mb-1 rounded bg-light">
      {GridContent}
    </div>);
}

export default ImageGrid;
