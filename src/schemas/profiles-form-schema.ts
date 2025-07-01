import { z } from "zod"

// Provincias de España (abreviado)
export const spanishProvinces = [
  { value: "alava", label: "Álava" },
  { value: "albacete", label: "Albacete" },
  { value: "alicante", label: "Alicante" },
  { value: "almeria", label: "Almería" },
  { value: "asturias", label: "Asturias" },
  { value: "avila", label: "Ávila" },
  { value: "badajoz", label: "Badajoz" },
  { value: "barcelona", label: "Barcelona" },
  { value: "burgos", label: "Burgos" },
  { value: "caceres", label: "Cáceres" },
  { value: "cadiz", label: "Cádiz" },
  { value: "cantabria", label: "Cantabria" },
  { value: "castellon", label: "Castellón" },
  { value: "ceuta", label: "Ceuta" },
  { value: "ciudad_real", label: "Ciudad Real" },
  { value: "cordoba", label: "Córdoba" },
  { value: "cuenca", label: "Cuenca" },
  { value: "girona", label: "Girona" },
  { value: "granada", label: "Granada" },
  { value: "guadalajara", label: "Guadalajara" },
  { value: "gipuzkoa", label: "Gipuzkoa" },
  { value: "huelva", label: "Huelva" },
  { value: "huesca", label: "Huesca" },
  { value: "illes_balears", label: "Illes Balears" },
  { value: "jaen", label: "Jaén" },
  { value: "a_coruna", label: "A Coruña" },
  { value: "la_rioja", label: "La Rioja" },
  { value: "las_palmas", label: "Las Palmas" },
  { value: "leon", label: "León" },
  { value: "lleida", label: "Lleida" },
  { value: "lugo", label: "Lugo" },
  { value: "madrid", label: "Madrid" },
  { value: "malaga", label: "Málaga" },
  { value: "melilla", label: "Melilla" },
  { value: "murcia", label: "Murcia" },
  { value: "navarra", label: "Navarra" },
  { value: "ourense", label: "Ourense" },
  { value: "palencia", label: "Palencia" },
  { value: "pontevedra", label: "Pontevedra" },
  { value: "salamanca", label: "Salamanca" },
  { value: "segovia", label: "Segovia" },
  { value: "sevilla", label: "Sevilla" },
  { value: "soria", label: "Soria" },
  { value: "tarragona", label: "Tarragona" },
  { value: "santa_cruz_tenerife", label: "Santa Cruz de Tenerife" },
  { value: "teruel", label: "Teruel" },
  { value: "toledo", label: "Toledo" },
  { value: "valencia", label: "Valencia" },
  { value: "valladolid", label: "Valladolid" },
  { value: "zamora", label: "Zamora" },
  { value: "zaragoza", label: "Zaragoza" },
]

export const entityTypes = [
  { value: "empresa_privada", label: "Empresa privada" },
  { value: "autonomo", label: "Autónomo" },
  { value: "ong", label: "ONG" },
  { value: "administracion_publica", label: "Administración pública" },
]

export const activitySectors = [
  { value: "ict", label: "ICT" },
  { value: "innovacion", label: "Innovación" },
  { value: "construccion", label: "Construcción" },
  { value: "turismo", label: "Turismo" },
]

export const interestAreas = [
  { value: "digitalizacion", label: "Digitalización" },
  { value: "innovacion", label: "Innovación" },
  { value: "sostenibilidad", label: "Sostenibilidad" },
  { value: "eficiencia_energetica", label: "Eficiencia energética" },
]

export const companySizes = [
  { value: "no_aplica", label: "No aplica" },
  { value: "micro", label: "Micro" },
  { value: "pequena", label: "Pequeña" },
  { value: "mediana", label: "Mediana" },
  { value: "grande", label: "Grande" },
]

export const budgetRanges = [
  { value: "hasta_10k", label: "Hasta 10k €" },
  { value: "10k_50k", label: "10k – 50k €" },
  { value: "50k_100k", label: "50k – 100k €" },
  { value: "mas_100k", label: "Más de 100k €" },
]

export const profileFormSchema = z.object({
  avatar: z.string().url().optional(),
  name: z.string().min(1, "Requerido"),
  username: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  provinces: z.array(z.string()).min(1, "Selecciona al menos una provincia"),
  municipality: z.string().optional(),
  entityType: z.enum(entityTypes.map((e) => e.value) as [string, ...string[]]),
  activitySectors: z.array(z.string()).min(1, "Selecciona al menos un sector"),
  companySize: z.enum(companySizes.map((c) => c.value) as [string, ...string[]]),
  interestAreas: z.array(z.string()).min(1, "Selecciona al menos un área"),
  budgetRange: z.enum(budgetRanges.map((b) => b.value) as [string, ...string[]]),
  role: z.enum(["admin", "editor", "viewer"]),
  status: z.enum(["active", "inactive"]),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>

export interface UserProfile extends ProfileFormData {
  id: string
} 