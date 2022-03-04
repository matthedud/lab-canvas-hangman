class Hangman {
	constructor(words) {
		this.words = words
		this.secretWord = ""
		this.letters = []
		this.guessedLetters = []
		this.errorsLeft = 10
	}

	pickWord() {
		const index = Math.floor(Math.random() * this.words.length)
		return this.words[index]
	}

	checkIfLetter(keydown) {
		if (keydown >= "a" && keydown <= "z") return true
		return false
	}

	checkClickedLetters(letter) {
		if (this.secretWord.includes(letter)) this.addCorrectLetter(letter)
		else this.addWrongLetter(letter)
	}

	addCorrectLetter(letter) {
		this.guessedLetters.push(letter)
	}

	addWrongLetter(letter) {
		this.letters.push(letter)
		this.errorsLeft--
	}

	checkGameOver() {
		return !this.errorsLeft
	}

	checkWinner() {
		let result = this.secretWord
		for (const letter of this.guessedLetters) {
			result = result.replace(letter, "")
		}
		return !result
	}
}

let hangman

const startGameButton = document.getElementById("start-game-button")

if (startGameButton) {
	startGameButton.addEventListener("click", (event) => {
		hangman = new Hangman([
			"node",
			"javascript",
			"react",
			"miami",
			"paris",
			"amsterdam",
			"lisboa",
		])

		hangman.secretWord = hangman.pickWord()
		hangmanCanvas = new HangmanCanvas(hangman.secretWord)
	})
}

document.addEventListener("keydown", (event) => {
	if(hangman.checkIfLetter(event.keydown)){
    hangman.checkClickedLetters(event.keydown)
  }
  hangman.checkGameOver()
	hangman.checkWinner()
})
