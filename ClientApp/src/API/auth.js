let onLogin = () => {};
let onInvalidLogin = () => {};
let onLogout = () => {};

const auth = {
    login: (data, success, error) => {
        fetch('/api/account/login', {
            method: `POST`,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 200)
                    return(response.json());
                else {
                    throw new Error(response.statusText);
                }
            })
            .then(data => {
                success();
                onLogin(data);
            }, err => {
                error();
                onInvalidLogin(err);
            });
    },
    register: (data, cb) => {
        fetch('/api/account/register', {
            method: `POST`,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 200)
                    return(response.json());
                else {
                    throw new Error(response.statusText);
                }
            })
            .then(data => {
                cb();
                onLogin(data);
            }, err => {
                onInvalidLogin(err);
            });
    },
    update: (data, cb) => {
        fetch('/api/account/update-profile', {
            method: `PUT`,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 200)
                    return(response.json());
                else {
                    throw new Error(response.statusText);
                }
            })
            .then(data => {
                cb();
                onLogin(data);
            }, err => {
                onInvalidLogin(err);
            });
    },
    logout: () => {
        fetch('/api/account/logout')
          .then(response => {
              if (response.status === 200) {
                  onLogout();
              }
          });
    },
    isLoged: (onLogin, notOnLogin) => {
        fetch('/api/account/login')
          .then(response => {
              if (response.status === 200)
                  return(response.json());
              else {
                  return null;
              }
          }, err => {
            return null;
          })
          .then(data => {
              onLogin(data);
          });
    },
    onLogin: callback => {
        onLogin = callback;
    },
    onInvalidLogin: callback => {
        onInvalidLogin = callback;
    },
    onLogout: callback => {
        onLogout = callback;
    }
};

export default auth;