const createFormData = (obj,form,namespace) => {
  const formData = form || new FormData();
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      let formKey = '';
      if(namespace) {
        formKey = `${namespace}[${key}]`;
      }
      else {
        formKey = key;
      }
      if(typeof obj[key] === 'object') {
        formData.append(formKey,createFormData(obj[key],formData,key));
      }
      else {
        formData.append(key,obj[key]);
      }
    }
  }
  return formData;
};

export default createFormData;