class Card {
  constructor(data) {
    this.card = data;
  }

  like(card) {
    card.classList.toggle('place-card__like-icon_liked');
  }

  remove(card) {
    card.closest('.place-card').remove();
  }

  create({ name, link }) {
    const card = document.createElement('div');
    card.classList.add('place-card');
    card.insertAdjacentHTML('beforeend', `
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
        </div>`);

    card.querySelector('.place-card__name').textContent = name;
    card.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;

    return card;
  }
}

