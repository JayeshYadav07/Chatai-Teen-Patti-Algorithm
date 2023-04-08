function run() {
    let arr = [];
    let cell = 0;
    for (let i = 0; i < 5; i++) {
        let temp = [];
        for (let j = 0; j < 8; j++) {
            let cellValue = document.getElementById(`cell-${cell}`).value;
            if (cellValue == "") {
                temp.push(-1);
            } else {
                temp.push(getFullName(cellValue));
            }
            cell++;
        }
        arr.push(temp);
    }

    let options = 0;
    let optionsArray = [];
    for (let i = 0; i < 4; i++) {
        let optionsVal = document.getElementById(`op-${options}`).value;
        if (optionsVal != "") {
            optionsArray.push(getFullName(optionsVal));
        }
        options++;
    }
    // console.log(arr, optionsArray);
    solve(arr, optionsArray);
}
function solve(arr, optionsArray) {
    let max = 0;
    let row = 0;
    let col = 0;
    let card = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 8; j++) {
            if (arr[i][j] == "-1") {
                for (let k = 0; k < optionsArray.length; k++) {
                    let pointHere = valueAtThisIndex(
                        arr,
                        i,
                        j,
                        optionsArray[k]
                    );
                    if (pointHere > max) {
                        max = pointHere;
                        row = i;
                        col = j;
                        card = `${optionsArray[k].cardVal} ${optionsArray[k].cardType}`;
                    }
                }
            }
        }
    }
    let str = `${getShortName(card)} --- ${row + 1} ${col + 1} --- ${max}`;
    const ouput = document.getElementById("ouput");
    ouput.innerText = str;
}

function getShortName(card) {
    card = card.split(" ");
    let cardType = card[1];
    let cardVal = card[0];
    const Suit = {
        SPADES: "♠️",
        HEARTS: "🧡",
        DIAMONDS: "♦️",
        CLUBS: "♣️",
    };

    const Rank = {
        ACE: "A",
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        TEN: 10,
        JACK: "J",
        QUEEN: "Q",
        KING: "K",
    };
    let str = Rank[cardVal] + Suit[cardType];
    return str;
}

function valueAtThisIndex(arr, i, j, card) {
    // console.log(i, j, cardVal, cardType);

    let combo = 0;
    let totalPoints = 0;
    //top
    if (
        i - 1 >= 0 &&
        i - 2 >= 0 &&
        arr[i - 1][j] != -1 &&
        arr[i - 2][j] != -1
    ) {
        let points = getThePoints(card, arr[i - 1][j], arr[i - 2][j]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //top left
    if (
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        i - 2 >= 0 &&
        j - 2 >= 0 &&
        arr[i - 1][j - 1] != -1 &&
        arr[i - 2][j - 2] != -1
    ) {
        let points = getThePoints(card, arr[i - 1][j - 1], arr[i - 2][j - 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //top right
    if (
        i - 1 >= 0 &&
        j + 1 < 8 &&
        i - 2 >= 0 &&
        j + 2 < 8 &&
        arr[i - 1][j + 1] != -1 &&
        arr[i - 2][j + 2] != -1
    ) {
        let points = getThePoints(card, arr[i - 1][j + 1], arr[i - 2][j + 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //left
    if (
        j - 1 >= 0 &&
        j - 2 >= 0 &&
        arr[i][j - 1] != -1 &&
        arr[i][j - 2] != -1
    ) {
        let points = getThePoints(card, arr[i][j - 1], arr[i][j - 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //bottom left
    if (
        i + 1 < 5 &&
        j - 1 >= 0 &&
        i + 2 < 5 &&
        j - 2 >= 0 &&
        arr[i + 1][j - 1] != -1 &&
        arr[i + 2][j - 2] != -1
    ) {
        let points = getThePoints(card, arr[i + 1][j - 1], arr[i + 2][j - 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //bottom
    if (i + 1 < 5 && i + 2 < 5 && arr[i + 1][j] != -1 && arr[i + 2][j] != -1) {
        let points = getThePoints(card, arr[i + 1][j], arr[i + 2][j]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //bottom right
    if (
        i + 1 < 5 &&
        j + 1 < 8 &&
        i + 2 < 5 &&
        j + 2 < 8 &&
        arr[i + 1][j + 1] != -1 &&
        arr[i + 2][j + 2] != -1
    ) {
        let points = getThePoints(card, arr[i + 1][j + 1], arr[i + 2][j + 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //right
    if (j + 1 < 8 && j + 2 < 8 && arr[i][j + 1] != -1 && arr[i][j + 2] != -1) {
        let points = getThePoints(card, arr[i][j + 1], arr[i][j + 2]);
        if (points > 0) {
            combo++;
            // console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //top-mid-bottom
    if (i - 1 >= 0 && i + 1 < 5 && arr[i - 1][j] != -1 && arr[i + 1][j] != -1) {
        let points = getThePoints(card, arr[i - 1][j], arr[i + 1][j]);
        if (points > 0) {
            combo++;
            console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    //left-mid-right
    if (j - 1 >= 0 && j + 1 < 8 && arr[i][j - 1] != -1 && arr[i][j + 1] != -1) {
        let points = getThePoints(card, arr[i][j - 1], arr[i][j + 1]);
        if (points > 0) {
            combo++;
            console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    // topleft-mid-rightbottom
    if (
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        i + 1 < 5 &&
        j + 1 < 8 &&
        arr[i - 1][j - 1] != -1 &&
        arr[i + 1][j + 1] != -1
    ) {
        let points = getThePoints(card, arr[i - 1][j - 1], arr[i + 1][j + 1]);
        if (points > 0) {
            combo++;
            console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    // topright-mid-leftbottom
    if (
        i - 1 >= 0 &&
        j + 1 < 8 &&
        i + 1 < 5 &&
        j - 1 >= 0 &&
        arr[i - 1][j + 1] != -1 &&
        arr[i + 1][j - 1] != -1
    ) {
        let points = getThePoints(card, arr[i - 1][j + 1], arr[i + 1][j - 1]);
        if (points > 0) {
            combo++;
            console.log(i, j, card.cardVal, card.cardType);
            totalPoints += points;
        }
    }

    return totalPoints * combo;
}

function getFullName(card) {
    const Suit = {
        s: "SPADES",
        S: "SPADES",
        h: "HEARTS",
        H: "HEARTS",
        d: "DIAMONDS",
        D: "DIAMONDS",
        c: "CLUBS",
        C: "CLUBS",
    };

    const Rank = {
        a: "ACE",
        A: "ACE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
        5: "FIVE",
        6: "SIX",
        7: "SEVEN",
        8: "EIGHT",
        9: "NINE",
        10: "TEN",
        j: "JACK",
        J: "JACK",
        q: "QUEEN",
        Q: "QUEEN",
        k: "KING",
        K: "KING",
    };
    let cardVal = Rank[card.substring(0, card.length - 1)];
    let cardType = Suit[card.substring(card.length - 1, card.length)];
    return { cardVal, cardType };
}
function getThePoints(c1, c2, c3) {
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

        if (ranks[0] == ranks[1] && ranks[1] == ranks[2]) {
            return 50;
        } else if (
            (ranks[0] == ranks[1] && ranks[1] != ranks[2]) ||
            (ranks[0] != ranks[1] && ranks[1] == ranks[2])
        ) {
            return 5;
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
            return 30;
        } else if (
            (ranks[0] == 1 && ranks[1] == 12 && ranks[2] == 13) ||
            (ranks[0] == ranks[1] - 1 && ranks[1] == ranks[2] - 1)
        ) {
            return 20;
        } else if (suits[0] == suits[1] && suits[1] == suits[2]) {
            return 10;
        } else {
            return 0;
        }
    }

    // Example usage
    const card1 = new Card(Rank[c1.cardVal], Suit[c1.cardType]);
    const card2 = new Card(Rank[c2.cardVal], Suit[c2.cardType]);
    const card3 = new Card(Rank[c3.cardVal], Suit[c3.cardType]);

    return getRelation(card1, card2, card3); // Output: Pair
}
