import { SetStateAction, useEffect, useState } from "react"

import { Country } from "../ts/interfaces/Country.interface"

const useAutocomplete = (data: Country[], inputSearchRef: HTMLInputElement | null) => {
	const [searchedValue, setSearchedValue] = useState("")
	const [suggestions, setSuggestions] = useState<Country[]>([])
	const [selectedSuggestion, setSelectedSuggestion] = useState("")
	const [activeSuggestion, setActiveSuggestion] = useState(0)

	useEffect(() => {
		if (inputSearchRef) {
			inputSearchRef.focus()
		}
	}, [])

	const handleChange = (event: { target: { value: SetStateAction<string> } }): void => {
		if (event.target.value !== "") {
			const filteredSuggestions = data.filter(itemData => {
				const value = event.target.value.toString().toUpperCase()
				const name = itemData.name.common.toUpperCase()

				return value && name.startsWith(value) && name !== value
			})
			setSearchedValue(event.target.value)
			setSuggestions(filteredSuggestions)
		} else {
			setSearchedValue("")
			setSuggestions([])
			setSelectedSuggestion("")
			setActiveSuggestion(0)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "ArrowDown" && activeSuggestion < suggestions.length) {
			setActiveSuggestion(activeSuggestion + 1)
		} else if (event.key === "ArrowUp" && activeSuggestion > 1) {
			setActiveSuggestion(activeSuggestion - 1)
		} else if (event.key === "Enter") {
			setSearchedValue(suggestions[activeSuggestion - 1].name.common)
			setSelectedSuggestion(suggestions[activeSuggestion - 1].name.common)
			setSuggestions([])
			setActiveSuggestion(0)
		}
	}

	const handleClick = (value: string) => {
		setSearchedValue(value)
		setSuggestions([])
		setSelectedSuggestion(value)
		setActiveSuggestion(0)
		//do something else
	}

	return { searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick }
}

export default useAutocomplete
