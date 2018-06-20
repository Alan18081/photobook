import React from 'react';
import Slider from 'react-slick';

import classes from './index.sass';

import CloseIcon from '../../assets/icons/close.svg';
import LeftArrowIcon from '../../assets/icons/arrow_left.svg';
import RightArrowIcon from '../../assets/icons/arrow_right.svg';

import ImageOpen from '../ImageOpen';
import Panel from '../UI/Panel';

const Arrow = ({Icon,classAdd,className,style,onClick}) => {
  return  (
    <div
      className={[className,classAdd].join(' ')}
      style={{...style}}
      onClick={onClick}
    >
      <Icon className={classes.arrowIcon}/>
    </div>
  )
};

const imageSlider = ({userAlbum,albumId,images,close,hideImageSlider,initialSlide,username,avatar}) => (
    <Panel>
      <div className={classes.close} onClick={close}>
        <CloseIcon/>
      </div>
      <Slider
        infinite={true}
        initialSlide={initialSlide}
        slidesToShow={1}
        slidesToScroll={1}
        adaptiveHeight
        dots={false}
        arrows={true}
        prevArrow={<Arrow Icon={LeftArrowIcon} classAdd={classes.arrowLeft}/>}
        nextArrow={<Arrow Icon={RightArrowIcon} classAdd={classes.arrowRight}/>}
      >
        {images && images.map(img => (
          <ImageOpen
            userAlbum={userAlbum}
            key={img.get('_id')}
            close={hideImageSlider}
            id={img.get('_id')}
            image={img.get('imageUrl')}
            likes={img.get('likes')}
            title={img.get('name')}
            description={img.get('description')}
            comments={img.get('comments')}
            albumId={albumId}
            author={img.get('author')}
          />
        ))}
      </Slider>
    </Panel>
);

export default imageSlider;