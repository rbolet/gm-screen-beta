import './ImageGrid.css';
import React, { useState, useContext, useEffect } from 'react';
import { Campaign } from '@client/context/campaign-context';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';

function ImageGrid(props) {
  const [selectedCategory, setSelectedCategory] = useState('Environment');

  return (
    <ContainerCard percentHeight={100} percentWidth={100}
      header={<GridHeaderButtons setSelectedCategory={setSelectedCategory}/>}>
      <GridImages selectedTab={selectedCategory} onImageClick={props.onImageClick}/>
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
  const [gridContent, setGridContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign.campaignAssets.length) {
      setLoading(true);
      const generateElements = new Promise(() => {
        setGridContent(campaign.campaignAssets.map(image => {
          if (image.category === props.selectedTab) {
            return (
              <img
                key={image.imageId}
                src={`./images/${image.fileName}`}
                className="grid-image m-1"
                onClick={() => { props.onImageClick(image); }} />
            );
          }
        }));
      });
      generateElements.then(() => { setLoading(false); });
    } else {
      setGridContent(
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="img-thumbnail text-muted">
            {`No images have been added to ${props.campaignName}`}
          </div>
        </div>
      );
    }
  }, [campaign.campaignAssets]);

  if (loading) return <Loading/>;

  return (
    <div className="w-100 image-grid-body mb-1 rounded bg-light">
      {gridContent}
    </div>);
}

export default ImageGrid;
