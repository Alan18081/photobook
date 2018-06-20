export const getCurrentUser = state => {
  return state.auth.get('user');
};

export const getActiveUser = state => {
  return state.users;
};

export const getAlbumById = (state,id) => {
  if(state.albums.get('list').size > 0) {
    return state.albums.get('list').find(item => item.get('_id') === id);
  }
};

export const getSearchResults = (state) => {
  const query = state.search;
  if(query === 'all') {
    return state.images.get('list');
  }
  else {
    return state.images.get('list').filter(img => {
      return img.get('name').indexOf(query) !== -1;
    });
  }
};

export const getImageById = (state,id) => {
  const images = state.images.get('list');
  const image = images.find(img => {
    return img.get('_id') === id;
  });
  return image;
};
export const getActiveAlbum = (state) => {
  return state.albums.get('activeAlbum');
};

export const getAlbums = (state,getUser) => {
  const user = getUser(state);
  return state.albums.get('list').filter(album => album.get('author').get('_id') === user.get('_id'));
};

export const getNewsByIds = (state) => {
  const newsIds = state.news.get('list');
  return newsIds.map(id => getImageById(state,id));
};

export const getImages = (state) => {
  const activeAlbum = getActiveAlbum(state);
  if(activeAlbum) {
    return activeAlbum
      .get('images')
      .map(id => getImageById(state,id))
      .filter(img => img !== undefined);
  }
};

export const getLikesNumber = (state) => {
  if(getActiveAlbum(state)) {
    const images = getImages(state);
    if(images) {
      return images.reduce((size,item) => {
        size += item.get('likes').size;
        return size;
      },0);
    }
  }
};

export const getCommentsNumber = (state) => {
  if(getActiveAlbum(state)) {
    const images = getImages(state);
    if(images) {
      return images.reduce((size,item) => {
        size += item.get('comments').size;
        return size;
      },0);
    }
  }
};

export const getCountOfAlbumImages = (state) => {
  const activeAlbum = getActiveAlbum(state);
  if(activeAlbum) {
    return activeAlbum.get('images').size;
  }
};