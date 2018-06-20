import React from 'react';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

import classes from './index.sass';

import AddIcon from '../../assets/icons/add.svg';

import Album from '../Album';
import SlideBtn from '../UI/SlideBtn/index';
import Spinner from '../UI/Spinner/index';

const albumList = ({showCreateAlbum,editable,albums,children,own,author}) => (
  <section className={classes.AlbumList}>
    <div className={classes.container}>
      <div className={classes.head}>
        {children}
        {editable
          ? <SlideBtn
            Icon={AddIcon}
            hoverClass={classes.addAlbum}
            clicked={showCreateAlbum}
          >
            Добавить
          </SlideBtn>
          : null
        }
      </div>
      <TransitionGroup component="ul" className={classes.list}>
        {albums ? albums.map(album => (
          <CSSTransition
            key={album.get('_id')}
            timeout={400}
            classNames={{
              enter: classes.itemEnter,
              enterActive: classes.itemEnterActive,
              exit: classes.itemExit,
              exitActive: classes.itemExitActive
            }}
          >
            <Album
              authorId={author.get('_id')}
              own={own}
              id={album.get('_id')}
              name={album.get('name')}
              background={album.get('backgroundUrl')}
            />
          </CSSTransition>
        )) : <Spinner size="10" color="blue"/>}
      </TransitionGroup>
    </div>
  </section>
);

export default albumList;