import React, { useState, useContext } from 'react';
import { Campaign } from '../../context/campaign-context';

function ImageGrid(props) {
  const [selectedCategory, setSelectedCategory] = useState('Environment');
  const { campaign, updateCampaign } = useContext(Campaign);
}

export default ImageGrid;
