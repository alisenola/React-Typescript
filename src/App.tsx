import { NextUIProvider } from "@nextui-org/react"
import { darkTheme } from "./themes"

import { AutocompleteWrapper } from "./components/ui"

function App() {
	return (
		<NextUIProvider theme={darkTheme}>
			<AutocompleteWrapper />
		</NextUIProvider>
	)
}

export default App
