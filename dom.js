function showFilter() {
    const filterForm = document.getElementById('filterContent');
    const addForm = document.getElementById('newContent');

    if (filterForm.style.display === 'none' || filterForm.style.display === '') {
        filterForm.style.display = 'flex';
        addForm.style.display = 'none';
    } else {
        filterForm.style.display = 'none';
    }
}

function showAddNew() {
    const addForm = document.getElementById('newContent');
    const filterForm = document.getElementById('filterContent');

    if (addForm.style.display === 'none' || addForm.style.display === '') {
        addForm.style.display = 'flex';
        filterForm.style.display = 'none';
    } else {
        addForm.style.display = 'none';
    }
}

function filterArticles() {
    const opinionChecked = document.getElementById('opinionCheckbox').checked;
    const recipeChecked = document.getElementById('recipeCheckbox').checked;
    const updateChecked = document.getElementById('updateCheckbox').checked;

    const opinionArticles = document.querySelectorAll('article.opinion');
    const recipeArticles = document.querySelectorAll('article.recipe');
    const updateArticles = document.querySelectorAll('article.update');

    opinionArticles.forEach(article => {
        if (opinionChecked) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    recipeArticles.forEach(article => {
        if (recipeChecked) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    updateArticles.forEach(article => {
        if (updateChecked) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

function addNewArticle() {
    const title = document.getElementById('inputHeader').value;
    const text = document.getElementById('inputArticle').value;
    const selectedType = document.querySelector('input[name="articleType"]:checked');

    if (!title || !text) {
        return;
    }

    if (!selectedType) {
        return;
    }

    const articleType = selectedType.value;
    let markerText = '';

    if (articleType === 'opinion') {
        markerText = 'Opinion';
    } else if (articleType === 'recipe') {
        markerText = 'Recipe';
    } else if (articleType === 'update') {
        markerText = 'Update';
    }

    const existingArticles = document.querySelectorAll('#articleList article');
    const newId = 'a' + (existingArticles.length + 1);

    const newArticle = document.createElement('article');
    newArticle.className = articleType;
    newArticle.id = newId;

    newArticle.innerHTML = `
        <span class="marker">${markerText}</span>
        <h2>${title}</h2>
        <p>${text}</p>
        <p><a href="moreDetails.html">Read more...</a></p>
    `;

    const articleList = document.getElementById('articleList');
    articleList.appendChild(newArticle);

    document.getElementById('inputHeader').value = '';
    document.getElementById('inputArticle').value = '';

    const radioButtons = document.querySelectorAll('input[name="articleType"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    document.getElementById('newContent').style.display = 'none';
}

