const placeholderItems = [
  {
    itemKey: "TODO-001",
    label: "não especificado - checklist item placeholder",
    required: true,
  },
];

const checklistTemplateDefinitions: Array<{
  id: string;
  name: string;
  serviceIds: string[];
}> = [
  { id: "Residential_Standard", name: "Residential Standard", serviceIds: ["SRV-001"] },
  { id: "Deep_Cleaning", name: "Deep Cleaning", serviceIds: ["SRV-002"] },
  { id: "End_Tenancy", name: "End of Tenancy", serviceIds: ["SRV-003"] },
  { id: "Post_Construction", name: "Post Construction", serviceIds: ["SRV-004"] },
  { id: "Office_Cleaning", name: "Office Cleaning", serviceIds: ["SRV-005"] },
  { id: "Carpet_Cleaning", name: "Carpet Cleaning", serviceIds: ["SRV-006"] },
  { id: "Window_Cleaning", name: "Window Cleaning", serviceIds: ["SRV-007"] },
  { id: "Airbnb_Turnover", name: "Airbnb Turnover", serviceIds: ["SRV-008"] },
  { id: "Laundry", name: "Laundry", serviceIds: ["SRV-009"] },
  { id: "Restock", name: "Restock", serviceIds: ["SRV-010"] },
  { id: "Oven_Cleaning", name: "Oven Cleaning", serviceIds: ["SRV-011"] },
];

export const checklistTemplateSeeds = checklistTemplateDefinitions.map(({ id, name, serviceIds }) => ({
  id,
  name,
  serviceIds,
  version: "v1",
  items: placeholderItems,
  active: true,
}));
