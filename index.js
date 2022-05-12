//Constantes de la API
const api_url_random = 'https://api.thecatapi.com/v1/images/search?limit=3';
const api_url_favourites = 'https://api.thecatapi.com/v1/favourites';
const api_key = 'api_key=fde8f1be-6fc5-48ed-9550-5f9da186afca';

//Span para el error 
const spanError = document.getElementById('Error');

// Consumo con de API con Async Await

//Metodo de obtención de gatos random
const getCats = async () => {
    try {
        const response = await fetch(`${api_url_random}&${api_key}`);
        const data = await response.json();

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btnSave1.addEventListener('click', () => saveFavsCat(data[0].id));
        btnSave2.addEventListener('click', () => saveFavsCat(data[1].id));
        btnSave3.addEventListener('click', () => saveFavsCat(data[2].id));

        console.log('Get cats')
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

//Metodo de obtención de gatos favoritos
const favsCats = async () => {
    try {
        const response = await fetch(`${api_url_favourites}?${api_key}`);
        const data = await response.json();
        console.log('Fav cats');
        console.log(data);
        const fragment = new DocumentFragment();

        if (response.status !== 200) {
            spanError.innerHTML = `Error: ${response.status} ${data.message}`
        } else {
            const section = document.getElementById('favoritesMichis');
            section.innerHTML = '';
            data.forEach(item => {
                const article = document.createElement('article');
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const div = document.createElement('div');
                const btn = document.createElement('button')
                const btnText = document.createTextNode('Delete Cat')
                
                btn.appendChild(btnText);
                btn.className = 'button-delete';
                btn.addEventListener('click', () => deleteFavoritesMichis(item.id))
                div.appendChild(btn);
                div.className = 'container-button'
                img.src = item.image.url;
                figure.appendChild(img);
                figure.className = 'container-image';
                article.appendChild(figure);
                article.appendChild(div);
                article.className = 'container-secondary';
                fragment.appendChild(article);
            })
            section.appendChild(fragment);
        }

    } catch (error) {
        console.log(error);
    }
}

//Metodo para guardar los gatos
const saveFavsCat = async (id) => {
    try {
        const response = await fetch(`${api_url_favourites}?${api_key}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_id: id
            }),
        });
        const data = await response.json();
        
        if (response.status !== 200) {
            spanError.innerHTML = `Error: ${response.status} ${data.message}`
        } else {
            console.log('Michi guardado de favoritos');
            favsCats();
        }
    } catch (error) {
        console.log(error);
    }
}

//Metodo para borrar los gatos
const deleteFavoritesMichis = async (id) => {
    try {
        const response = await fetch(`${api_url_favourites}/${id}?${api_key}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.status !== 200) {
            spanError.innerHTML = `Error: ${response.status} ${data.message}`
        } else {
            console.log('Michi elimiando de favoritos');
            favsCats();
        }
    } catch (error) {
        console.log(error);
    }
}


//Lamado de las funciones iniciales
getCats();
favsCats();

//Eventos con los botones
button.addEventListener('click',getCats); 

