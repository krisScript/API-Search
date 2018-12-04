'use strict';
import './style/index.scss';
import getData from './app/getData/getData';
import createApiTable from './app/createApiTable/createApiTable';
import displayAlert from './app/displayAlert/displayAlert';
document.addEventListener('DOMContentLoaded', e => {
  const categoriesDatalist = document.querySelector('#categories');
  const url = 'https://api.publicapis.org/categories';
  getData(url)
    .then(data => {
      data.forEach(category => {
        const option = document.createElement('option');
        //the api returns error when category is used
        const correctCategory = category.split(' ')[0];
        option.value = correctCategory;
        categoriesDatalist.appendChild(option);
      });
    })
    .catch(error => {
      displayAlert('Sorry there was an error!')
    });
});
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const category = e.target.elements.category.value;
  const url = `https://api.publicapis.org/entries?category=${category}&https=true`;
  getData(url)
    .then(data => {
      const apis = data.entries;
      const apisSection = document.querySelector('.apis-section');
      if (apisSection.firstElementChild) {
        apisSection.firstElementChild.remove();
      }
      apisSection.appendChild(createApiTable(apis));
      createApiTable(apis);
    })
    .catch(error => displayAlert('Sorry there was an error!'));
  e.target.reset();
});

