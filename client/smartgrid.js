const smartgrid = require('smart-grid');

smartgrid('./src/styles/',{
  outputStyle: 'sass',
  columns: 12,
  offset: '20px',
  container: {
    maxWidth: '1180px'
  },
  breakPoints: {
    lg: {
      width: '1200px'
    },
    md: {
      width: '992px'
    },
    sm: {
      width: '768px'
    },
    xs: {
      width: '550px'
    }
  }
});
