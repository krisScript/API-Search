const createApiTable = apis => {
  const apiTable = document.createElement('table');
  apiTable.className = 'api-table';
  apiTable.innerHTML = `
  <thead>
  <th>Name</th>
  <th>Desription</th>
  <th>Auth</th>
  <th>CORS</th>
  <th>HTTPS</th>
  <th>Link</th>
  </thead>
  `;
  const tbody = document.createElement('tbody');

  apis.forEach(api => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${api.API}</td>
    <td>${api.Description}</td>
    <td>${api.Auth ? api.Auth : 'no'}</td>
    <td>${api.Cors}</td>
    <td>${api.HTTPS}</td>
    <td><a href="${api.Link}" target="_blank">Link</a></td>
    `
    tbody.appendChild(tr)
  });
  apiTable.appendChild(tbody)
  return apiTable;
};
export default createApiTable;
