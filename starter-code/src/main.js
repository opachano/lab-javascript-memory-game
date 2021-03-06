let cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

$(document).ready(function(){

  class MemoryGame {
    constructor(cards) {
      this.cards = cards;
      this.pickedCards = [];
      this.pairsClicked = 0;
      this.pairsGuessed = 0;
    }
    
    shuffleCards() {
      for(let i = (this.cards.length - 1); i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        let swapper = this.cards[randomIndex];
        this.cards[randomIndex] = this.cards[i];
        this.cards[i] = swapper;
      }
    } 

    checkIfPair(firstCard, secondCard) {
      this.pairsClicked ++;
      $("#pairs_clicked").text(`${this.pairsClicked}`);
      if (firstCard === secondCard) {
        this.pairsGuessed++;
        this.isFinished()
        $("#pairs_guessed").text(`${this.pairsGuessed}`);
        return true
      } 
      this.pickedCards = [];
      return false
    }

    isFinished() {
      if(this.pairsGuessed === 12) {
        setTimeout(() => {
          alert("YAY, YOU WON!")
          return true
        }, 300) 
      }
    }
  };
  
  let memoryGame = new MemoryGame(cards);
  memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  $('#memory_board').html(html);
  $('.back').click(function () {
    $(this).toggle()
    $(this).toggleClass("picked");
    $(this).siblings(".front").toggleClass("shown");
    memoryGame.pickedCards.push($(this).attr("name"));
    if (memoryGame.pickedCards.length === 2) {
      $(".back, .front").addClass("blocked");
      if(memoryGame.checkIfPair(memoryGame.pickedCards[0], memoryGame.pickedCards[1])){
        $(".picked").toggleClass("picked");
        memoryGame.pickedCards = [];
        $(".back, .front").removeClass("blocked");
        return
      }
      setTimeout(() => {$(".picked").toggle();
      $(".picked").siblings(".front").toggleClass("shown");
      $(".picked").toggleClass("picked");
      $(".back, .front").removeClass("blocked");
      memoryGame.pickedCards = [];}, 600)
    }
  });
});


// $(`.back[name*="${memoryGame.pickedCards[0]}"]`).toggle();