const users = {
  get: (cb) => {
    fetch('/api/users/get')
      .then(response => {
        if (response.status === 200)
          return(response.json());
        else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        cb(data);
      });
  },
};

export default users;