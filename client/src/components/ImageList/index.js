import React from 'react';

import classes from './index.sass';

import Image from '../Image/index';
import Button from '../UI/Button';

const imageList = ({all,album,showSlider,images,editImage,editable,loadMore}) => (
  <section className={classes.container}>
    <div className={classes.list}>
      {images && images.map((img,i) => {
        return (
          <Image
            key={i}
            editable={editable}
            name={img.get('name')}
            show={() => showSlider(i)}
            edit={() => editImage(img.get('_id'))}
            commentsNumber={img.get('comments').size}
            likesNumber={img.get('likes').size}
            image={img.get('imageUrl')}
          />
        )
      })}
    </div>
    {!all
    && <div className={classes.loadMore}>
        <Button type="shadow" clicked={loadMore}>Загрузить еще</Button>
      </div>}
  </section>
);

export default imageList;