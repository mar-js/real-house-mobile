import Ionicons from "@expo/vector-icons/Ionicons";

/** @deprecated Import from `@/types/auth` instead */
export type {
	IButtonAction as IButtonActionSignIn,
	IButtonAction as IButtonActionSignUp, IFormSignIn,
	IFormSignUp, IResetAccount, IVerifyAccount as IVerifyAccountSignIn,
	IVerifyAccount as IVerifyAccountSignUp
} from "@/types/auth";

export interface ISavedProperty {
	id: string
	property_id: string
	properties: IProperty
}

export interface ISpecItem {
	icon: keyof typeof Ionicons.glyphMap
	label: string
	value: string
}

export interface IFilterModal {
	visible: boolean
	onClose: () => void
	activeCount: number
}

export interface IPropertyCard {
	property: IProperty
	onUnsave?: () => void
	showSave?: boolean
}

export interface IFeaturedCard {
	property: IProperty
}

export interface IProperty {
	id: string
	title: string
	description: string
	price: number
	type: string
	bedrooms: number
	bathrooms: number
	area_sqft: number
	address: string
	city: string
	latitude: number
	longitude: number
	images: string[]
	is_featured: boolean
	is_sold: boolean
	created_at: string
}
