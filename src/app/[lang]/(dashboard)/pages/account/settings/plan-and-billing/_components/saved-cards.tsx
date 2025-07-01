import { savedCardsData } from "../../../_data/saved-cards"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SavedCardsList } from "./saved-cards-list"

export function SavedCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarjetas guardadas</CardTitle>
        <CardDescription>
          Consulta y gestiona tus tarjetas guardadas para un pago rápido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SavedCardsList savedCards={savedCardsData} />
      </CardContent>
    </Card>
  )
}
