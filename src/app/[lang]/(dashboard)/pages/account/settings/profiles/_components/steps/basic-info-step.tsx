import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import type { FormData } from "../subsidy-profile-form"

interface BasicInfoStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-4">
        Completa la información básica de tu perfil. Esta información nos ayudará a identificar las subvenciones más relevantes para ti.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombre_perfil">
            Nombre del Perfil <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nombre_perfil"
            value={formData.nombre_perfil}
            onChange={(e) => updateFormData({ nombre_perfil: e.target.value })}
            placeholder="Ej: Mi empresa de tecnología"
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Un nombre descriptivo para identificar este perfil
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre_empresa">Nombre Legal de la Entidad</Label>
          <Input
            id="nombre_empresa"
            value={formData.nombre_empresa}
            onChange={(e) => updateFormData({ nombre_empresa: e.target.value })}
            placeholder="Ej: TechSolutions S.L."
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nif_cif">
            NIF/CIF <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nif_cif"
            value={formData.nif_cif}
            onChange={(e) => updateFormData({ nif_cif: e.target.value.toUpperCase() })}
            placeholder="Ej: B12345678"
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Identificador fiscal necesario para verificar elegibilidad
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="contacto@empresa.com"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => updateFormData({ telefono: e.target.value })}
            placeholder="912 345 678"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            value={formData.direccion}
            onChange={(e) => updateFormData({ direccion: e.target.value })}
            placeholder="Calle Principal 123, Madrid"
            className="h-10"
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <h4 className="font-medium">Capacidades de Colaboración</h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="cofinanciacion">
              ¿Tienes capacidad de cofinanciación?
            </Label>
            <Switch 
              id="cofinanciacion"
              checked={formData.cofinanciacion_disp} 
              onCheckedChange={(checked) => updateFormData({ cofinanciacion_disp: checked })} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="socios">
              ¿Estás disponible para formar parte de consorcios europeos?
            </Label>
            <Switch 
              id="socios"
              checked={formData.disponible_socios} 
              onCheckedChange={(checked) => updateFormData({ disponible_socios: checked })} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 