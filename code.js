// Enumerations for the card suits and ranks
const Suit = {
    SPADES: 1,
    HEARTS: 2,
    DIAMONDS: 3,
    CLUBS: 4,
};

const Rank = {
    ACE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
};

// Constructor for a card object
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

// Getters for card properties
function getCardRank(card) {
    return card.rank;
}

function getCardSuit(card) {
    return card.suit;
}

function getCardName(card) {
    return `${card.rank} of ${card.suit}`;
}

// Function to determine the relationship between three cards
function getRelation(card1, card2, card3) {
    const ranks = [
        getCardRank(card1),
        getCardRank(card2),
        getCardRank(card3),
    ].sort();
    const suits = [
        getCardSuit(card1),
        getCardSuit(card2),
        getCardSuit(card3),
    ].sort();

    console.log(ranks, suits);

    if (ranks[0] == ranks[1] && ranks[1] == ranks[2]) {
        return "Trail";
    } else if (
        (ranks[0] == ranks[1] && ranks[1] != ranks[2]) ||
        (ranks[0] != ranks[1] && ranks[1] == ranks[2])
    ) {
        return "Pair";
    } else if (
        (ranks[0] == ranks[1] - 1 &&
            ranks[1] == ranks[2] - 1 &&
            suits[0] == suits[1] &&
            suits[1] == suits[2]) ||
        (ranks[0] == 1 &&
            ranks[1] == 12 &&
            ranks[2] == 13 &&
            suits[0] == suits[1] &&
            suits[1] == suits[2])
    ) {
        return "Pure sequence";
    } else if (
        (ranks[0] == 1 && ranks[1] == 12 && ranks[2] == 13) ||
        (ranks[0] == ranks[1] - 1 && ranks[1] == ranks[2] - 1)
    ) {
        return "Sequence";
    } else if (suits[0] == suits[1] && suits[1] == suits[2]) {
        return "Color";
    } else {
        return "High card";
    }
}

// Example usage
const card1 = new Card(Rank["KING"], Suit.SPADES);
const card2 = new Card(Rank["ACE"], Suit.HEARTS);
const card3 = new Card(Rank["QUEEN"], Suit.HEARTS);

console.log(getRelation(card1, card2, card3)); // Output: Pair
