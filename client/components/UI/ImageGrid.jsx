import './ImageGrid.css';
import React, { useState, useContext } from 'react';
import useWindowDimensions from '@components/logic/useWindowDimensions';
import { Campaign } from '@client/context/campaign-context';
import ContainerCard from '@components/UI/ContainerCard';

function ImageGrid(props) {
  const [selectedCategory, setSelectedCategory] = useState('Environment');

  return (
    <ContainerCard percentHeight={100} percentWidth={100}
      header={<GridHeaderButtons setSelectedCategory={setSelectedCategory}/>}>
      <div className="d-flex h-100 align-items-center">
        <GridImages selectedTab={selectedCategory} onImageClick={props.onImageClick}/>
      </div>
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
  const { bodyHeight } = useWindowDimensions();
  const maxHeight = bodyHeight * 0.65;
  let GridContent = null;

  if (campaign.campaignAssets.length) {
    GridContent = campaign.campaignAssets.map(image => {
      if (image.category === props.selectedTab) {
        return (
          <img
            key={image.imageId}
            src={`./images/${image.fileName}`}
            className="grid-image m-1"
            onClick={() => { props.onImageClick(image); }} />
        );
      }
    });
  }

  return (
    <div className="image-grid-body mb-1 rounded bg-light" style={{ maxHeight }}>
      {GridContent}
    </div>);
}

export default ImageGrid;
