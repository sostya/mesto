class CardList {
  constructor(container, cards, cardInst, api) {
    this.container = container;
    this.cards = cards;
    this.cardInst = cardInst;
    this.api = api;
  }

  getCards() {
    this.api.getInitialCards()
    .then((data) => {
      let arr = [];
      data.forEach((element) => {
        arr.push({name: element.name, link: element.link})
      })
      let array = arr.slice(1, 11);
      this.render(array)
    })
    .catch((err) => {
      console.log('Ошибка. getInitialCards');
    })
    /* Надо исправить: обработка ошибок должна быть здесь, в самом конце обработки промиса */
  }
  
  addCard(card) {
    const createdCard = this.cardInst.create({name: card.name, link: card.link});
    this.container.appendChild(createdCard);
  }

  render(array) { 
    for (const i in array) {
      this.addCard(array[i])
    }
  }

  setEventListeners(cardInst, popup) {
    this.container.addEventListener('click', (event) => {
      const classList = event.target.classList;
      classList.forEach(className => {
        switch (className) {
          case 'place-card__delete-icon':
            cardInst.remove(event.target);
            break;
          case 'place-card__like-icon':
            cardInst.like(event.target);
            break;
          case 'place-card__image':
            popup.togglePopup(document.getElementById('media-popup'), event.target.getAttribute('style').substring(23).slice(0, -3));
            break
      }
    })
    })
  }
}