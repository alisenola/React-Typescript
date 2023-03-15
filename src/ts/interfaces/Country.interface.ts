export type Country = {
	name: Name
	flags: Flags
}

type Name = {
	common: string
}

type Flags = {
	png: string
	svg: string
}
