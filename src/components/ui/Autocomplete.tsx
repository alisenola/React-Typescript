import { useEffect, useRef } from "react"
import { Card, Col, Input, Row, Text, User } from "@nextui-org/react"

import { Country } from "../../ts/interfaces/Country.interface"

import useAutocomplete from "../../hooks/useAutocomplete"

import classes from "./ui.module.css"

interface Props {
	data: Country[]
}

const Autocomplete = ({ data }: Props) => {
	const inputSearchRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputSearchRef.current) {
			inputSearchRef.current.focus()
		}
	}, [])

	const { searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick } =
		useAutocomplete(data, inputSearchRef.current)

	return (
		<div className={classes.autocomplete}>
			<Input
				bordered
				labelPlaceholder='Search your Country'
				size='xl'
				value={searchedValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				ref={inputSearchRef}
				color='secondary'
			/>

			<Card css={{ marginTop: "0.5rem" }}>
				<Card.Body css={{ padding: "0" }}>
					{!suggestions.length && searchedValue.length && !selectedSuggestion.length ? (
						<Row className={classes.itemListNot}>
							<Col>
								<Text>Nothing to show :(</Text>
							</Col>
						</Row>
					) : (
						<>
							{suggestions.map(({ name, flags }: Country, index) => (
								<Row
									key={index}
									className={`${classes.itemList} ${index === activeSuggestion - 1 ? classes.activeItem : ""}`}
									onClick={() => handleClick(name.common)}
								>
									<Col>
										<User src={flags.svg} name={name.common} squared />
									</Col>
								</Row>
							))}
						</>
					)}
				</Card.Body>
			</Card>

			<Text size='$xs'>Country selected: {selectedSuggestion}</Text>
		</div>
	)
}

export default Autocomplete
