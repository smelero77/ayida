import { activeProjectsData } from "../_data/active-projects"

import { DashboardCard } from "@/components-shadboard-new/dashboards/dashboard-card"
import { ActiveProjectsList } from "./active-projects-list"

export function ActiveProjects() {
  return (
    <DashboardCard title="Active Projects" size="lg">
      <ActiveProjectsList data={activeProjectsData} />
    </DashboardCard>
  )
}
