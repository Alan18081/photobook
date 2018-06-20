import React from 'react';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

import classes from './index.sass';
import NewImage from '../NewImage';
import Button from '../UI/Button/index';
import Spinner from '../UI/Spinner/index';

const newImagesList = ({news,all,loadMore,children,showSlider}) =>  {
  let content = <Spinner center color="blue"/>;
  if(news) {
    content = null;
  }
  if(news.size > 0) {
    content = <TransitionGroup component="ul" className={classes.list}>
      {news.map((img,i) => (
        <CSSTransition
          key={img.get('_id')}
          timeout={400}
          classNames={{
            enter: classes.itemEnter,
            enterActive: classes.itemEnterActive,
            exit: classes.itemExit,
            exitActive: classes.itemExitActive
          }}
        >
          <NewImage
            image={img.get('imageUrl')}
            name={img.get('name')}
            commentsNumber={img.get('comments').size}
            likesNumber={img.get('likes').size}
            author={img.get('author')}
            albumName={img.get('albumName')}
            albumId={img.get('albumId')}
            show={() => showSlider(i)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>;
  }
  return (
    <section className={classes.container}>
      {children}
      {content}
      {news.size > 0 && !all ? <Button type="shadow" clicked={loadMore}>Показать еще</Button> : null}
    </section>
  );
};

export default newImagesList;