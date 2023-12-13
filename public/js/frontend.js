function saveData(event) {
    debugger;
    event.preventDefault();
  
    const formData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/saveuser', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (this.status === 200) {
        alert('Data Added successfully:');
        window.location.href = '/';
      } else {
        const response = JSON.parse(this.responseText);
        alert('Error Saving Data:');
      }
    };
    xhr.onerror = function() {
      console.error('Error sending data:');
    };
    xhr.send(JSON.stringify(formData));
}

function saveTeam(event) {
  debugger;
  event.preventDefault();

  const formData = {
    team_name: document.getElementById('team_name').value,
    tournament_id: document.getElementById('tournament_id').value,
    player_count: document.getElementById('player_count').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addteams', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}

function savePlayer(event) {
  debugger;
  event.preventDefault();

  const formData = {
    player_name: document.getElementById('player_name').value,
    team_id: document.getElementById('team_id').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addplayers', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}


function saveCaptain(event) {
  debugger;
  event.preventDefault();

  const formData = {
    team_id: document.getElementById('team_id').value,
    player_id: document.getElementById('player_id').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addcaptains', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}

function saveApproval(event) {
  debugger;
  event.preventDefault();

  const formData = {
    team_id: document.getElementById('team_id').value,
    player_id: document.getElementById('player_id').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addapprovals', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}


function saveRedCard(event) {
  debugger;
  event.preventDefault();

  const formData = {
    team_id: document.getElementById('team_id').value,
    player_id: document.getElementById('player_id').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addredcards', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}


function saveMatchResults(event) {
  debugger;
  event.preventDefault();

  const formData = {
    tournament_id: document.getElementById('tournament_id').value,
    match_date: document.getElementById('match_date').value,
    team1_id: document.getElementById('team1_id').value,
    team2_id: document.getElementById('team2_id').value,
    team1_score: document.getElementById('team1_score').value,
    team2_score: document.getElementById('team2_score').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addmatchresults', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';
    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}

function saveHighestScore(event) {
  debugger;
  event.preventDefault();

  const formData = {
    player_id: document.getElementById('player_id').value,
    goal_score: document.getElementById('goal_score').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addhighestscores', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';

    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}

function saveMembers(event) {
  debugger;
  event.preventDefault();

  const formData = {
    team_id: document.getElementById('team_id').value,
    coach_name: document.getElementById('coach_name').value,
    manager_name: document.getElementById('manager_name').value,
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addmember', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      alert('Data Added successfully:',response);
      window.location.href = '/admin/home';

    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send(JSON.stringify(formData));
}

function getMembers(event) {
  debugger;
  event.preventDefault();
  var team_id = parseInt(document.getElementById('team_id').value)
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/allteamsmember/${team_id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (this.status === 200) {
      // const response = JSON.parse(this.responseText);
      // alert('Data Added successfully:',response);
      window.location.href = `/allteamsmember/${team_id}`;

    } else {
      alert('Error Saving Data:');
    }
  };
  xhr.onerror = function() {
    console.error('Error sending data:');
  };
  xhr.send();
}


function logout(){
  const userId = localStorage.getItem('user_id')
  fetch(`/logout/${userId}`, {
    method: 'GET',
  })
    .then(response => {
      if (response.ok) {
        // Successful logout
        console.log(`User with ID ${userId} logged out successfully.`);
      } else {
        // Error handling
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    })
    .catch(error => {
      // Error handling for network failures or exceptions
      console.error('Error:', error);
    });
}