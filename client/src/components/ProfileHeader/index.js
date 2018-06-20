import React from 'react';
import {Link} from 'react-router-dom';

import classes from './index.sass';

import FbIcon from '../../assets/icons/soc_fb.svg';
import GoogleIcon from '../../assets/icons/soc_google.svg';
import TwitterIcon from '../../assets/icons/soc_twitter.svg';
import VkIcon from '../../assets/icons/soc_vk.svg';
import MailIcon from '../../assets/icons/soc_email.svg';
import EditIcon from '../../assets/icons/edit.svg';
import ExitIcon from '../../assets/icons/off.svg';
import HomeIcon from '../../assets/icons/home.svg';

import SlideBtn from '../UI/SlideBtn/index';
import Asx from '../../hoc/Asx/index';

const profileHeader = ({user,handleEditMode,editable}) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <div className={classes.image}>
          <img src={user.get('avatarUrl')} alt=""/>
        </div>
      </div>
      <div className={classes.info}>
        <h4 className={classes.title}>{user.get('username')}</h4>
        <p className={classes.description}>{user.get('description') || 'Заполните описание и социальное сети нажав "Редактировать"'}</p>
        <ul className={classes.social}>
          <li className={classes.socialItem}>
            <a href={user.get('vk')} target="_blank">
              <VkIcon/>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href={user.get('facebook')} target="_blank">
              <FbIcon/>
            </a>
          </li>
          <li className={classes.socialItem} target="_blank">
            <a href={user.get('twitter')}>
              <TwitterIcon/>
            </a>
          </li>
          <li className={classes.socialItem} target="_blank">
            <a href={user.get('google')}>
              <GoogleIcon/>
            </a>
          </li>
          <li className={classes.socialItem}>
            <MailIcon/>
          </li>
        </ul>
      </div>
      <ul className={classes.links}>
        {editable
          ? <Asx>
              <SlideBtn
                hoverClass={classes.btnEdit}
                clicked={handleEditMode}
                Icon={EditIcon}
              >
                Редактировать
              </SlideBtn>
              <SlideBtn
                hoverClass={classes.btnExit}
                Icon={ExitIcon}
              >
                <Link to="/logout">Выйти</Link>
              </SlideBtn>
            </Asx>
          : <SlideBtn
              hoverClass={classes.btnHome}
              Icon={HomeIcon}
            >
              <Link to="/">На главную</Link>
            </SlideBtn>
        }
      </ul>
    </div>
  );
};

export default profileHeader;