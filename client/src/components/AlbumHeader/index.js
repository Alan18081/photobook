import React from 'react';
import {Link} from 'react-router-dom';

import classes from './index.sass';

import SlideBtn from '../UI/SlideBtn/index';
import UserBlock from '../UserBlock/index';

import HomeIcon from '../../assets/icons/home.svg';
import EditIcon from '../../assets/icons/edit.svg';

const albumHeader = ({avatar,username,handleEditMode,name,description,editable}) => {
  return (
    <div className={classes.container}>
      <UserBlock
        avatar={avatar}
        username={username}
      />
      <div className={classes.caption}>
        <h4 className={classes.title}>{name}</h4>
        <p className={classes.description}>{description}</p>
      </div>
      <ul className={classes.links}>
        <SlideBtn
          hoverClass={classes.btnHome}
          Icon={HomeIcon}
        >
          <Link to="/" style={{color: '#fff',textDecoration: 'none'}}>На главную</Link>
        </SlideBtn>
        {editable
          ? <SlideBtn
              hoverClass={classes.btnEdit}
              Icon={EditIcon}
              clicked={handleEditMode}
            >
              Редактировать
            </SlideBtn>
          : null
        }
      </ul>
    </div>
  );
};

export default albumHeader;