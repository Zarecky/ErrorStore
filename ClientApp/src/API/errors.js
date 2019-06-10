const errors = {
  state: [
    'New', 'Opened', 'Resolved', 'Closed'
  ],
  urgency: [
    'Very urgent', 'Urgent', 'Non-urgent', 'Not urgent at all'
  ],
  criticality: [
    'Crash', 'Critical', 'Uncritical', 'Change'
  ],
  history: {
    action: [
      'Input', 'Open', 'Resolve', 'Close'
    ]
  },
  getAll: (cb) => {
    fetch('/api/errors/get')
      .then(response => {
        if (response.status === 200)
          return(response.json());
        else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        console.log(data);
        cb(data);
      });
  },
  get: (id, cb) => {
    fetch(`/api/errors/get/${id}`)
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
  create: (error, cb) => {
    fetch(`/api/errors/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(error)
    })
      .then(response => {
        if (response.status === 200)
          return(response.json());
        else {
          throw new Error(response.statusText);
        }
      })
      .then(error => cb(error));
  },
  update: (history, cb) => {
    fetch(`/api/errors/update/${history.errorId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(history)
    })
      .then(response => {
        if (response.status === 200)
          return(response.json());
        else {
          throw new Error(response.statusText);
        }
      })
      .then(historyItem => cb(historyItem));
  } 
};

export default errors;