
import { PartGroup } from '@/types/masterDataTypes';

export const mockPartGroups: PartGroup[] = [
  {
    id: 'pg-1',
    name: '3mm Stainless Steel Screws',
    totalUnits: 28000,
    itemCount: 6,
    bestPickIds: ['item-2'],
    items: [
      {
        id: 'item-1',
        componentId: 'SCR-SS-3M-001',
        name: 'Metric Machine Screw, Phillips Pan Head, SS 18-8 (A-2), 3mm x 0.5mm x 10mm',
        supplier: 'FastenCorp',
        quantity2023: 3000,
        quantity2024: 3500,
        quantity2025: 4000,
        leadTime: 15,
        pricePerUnit: 0.12,
        isDuplicate: true
      },
      {
        id: 'item-2',
        componentId: 'SCR-SS-3M-002',
        name: 'Metric Machine Screw, Phillips Pan Head, SS 18-8 (A-2), 3mm x 0.5mm x 10mm',
        supplier: 'BoltWorks',
        quantity2023: 2500,
        quantity2024: 3000,
        quantity2025: 3500,
        leadTime: 7,
        pricePerUnit: 0.11
      },
      {
        id: 'item-3',
        componentId: 'SCR-SS-3M-003',
        name: 'Metric Machine Screw, Phillips Flat Head, SS 18-8 (A-2), 3mm x 0.5mm x 12mm',
        supplier: 'TechFasteners',
        quantity2023: 1800,
        quantity2024: 2000,
        quantity2025: 2200,
        leadTime: 10,
        pricePerUnit: 0.13,
        isHighlySimilar: true
      },
      {
        id: 'item-4',
        componentId: 'SCR-SS-3M-004',
        name: 'Metric Machine Screw, Phillips Flat Head, SS 18-8 (A-2), 3mm x 0.5mm x 12mm',
        supplier: 'FastenCorp',
        quantity2023: 1000,
        quantity2024: 1200,
        quantity2025: 1500,
        leadTime: 14,
        pricePerUnit: 0.14,
        isDuplicate: true
      },
      {
        id: 'item-5',
        componentId: 'SCR-SS-3M-005',
        name: 'Metric Machine Screw, Phillips Flat Head, SS 18-8 (A-2), 3mm x 0.5mm x 15mm',
        supplier: 'ReliableFasteners',
        quantity2023: 1500,
        quantity2024: 1800,
        quantity2025: 2000,
        leadTime: 12,
        pricePerUnit: 0.10,
        isHighlySimilar: true
      },
      {
        id: 'item-6',
        componentId: 'SCR-SS-3M-006',
        name: 'Metric Machine Screw, Socket Head Cap, SS 303, 3mm x 0.5mm x 16mm',
        supplier: 'PrecisionFasteners',
        quantity2023: 800,
        quantity2024: 900,
        quantity2025: 1000,
        leadTime: 9,
        pricePerUnit: 0.20
      }
    ]
  },
  {
    id: 'pg-2',
    name: 'Metric Hex Nuts',
    totalUnits: 35000,
    itemCount: 4,
    bestPickIds: ['item-8'],
    items: [
      {
        id: 'item-7',
        componentId: 'NUT-HEX-M3-001',
        name: 'Metric Hex Nut, Stainless Steel 18-8, M3 x 0.5mm',
        supplier: 'FastenCorp',
        quantity2023: 5000,
        quantity2024: 5500,
        quantity2025: 6000,
        leadTime: 12,
        pricePerUnit: 0.08,
        isDuplicate: true
      },
      {
        id: 'item-8',
        componentId: 'NUT-HEX-M3-002',
        name: 'Metric Hex Nut, Stainless Steel 18-8, M3 x 0.5mm',
        supplier: 'BoltWorks',
        quantity2023: 4500,
        quantity2024: 5000,
        quantity2025: 5500,
        leadTime: 5,
        pricePerUnit: 0.07
      },
      {
        id: 'item-9',
        componentId: 'NUT-HEX-M4-001',
        name: 'Metric Hex Nut, Stainless Steel 18-8, M4 x 0.7mm',
        supplier: 'TechFasteners',
        quantity2023: 3000,
        quantity2024: 3200,
        quantity2025: 3500,
        leadTime: 8,
        pricePerUnit: 0.09,
        isHighlySimilar: true
      },
      {
        id: 'item-10',
        componentId: 'NUT-HEX-M4-002',
        name: 'Metric Hex Nut, Stainless Steel 18-8, M4 x 0.7mm',
        supplier: 'MetalCrafters',
        quantity2023: 2500,
        quantity2024: 2800,
        quantity2025: 3000,
        leadTime: 9,
        pricePerUnit: 0.10,
        isHighlySimilar: true
      }
    ]
  },
  {
    id: 'pg-3',
    name: 'Metric Flat Washers',
    totalUnits: 42000,
    itemCount: 5,
    bestPickIds: ['item-12'],
    items: [
      {
        id: 'item-11',
        componentId: 'WSH-FLT-M3-001',
        name: 'Flat Washer, Stainless Steel 18-8, M3',
        supplier: 'FastenCorp',
        quantity2023: 6000,
        quantity2024: 6500,
        quantity2025: 7000,
        leadTime: 14,
        pricePerUnit: 0.05,
        isDuplicate: true
      },
      {
        id: 'item-12',
        componentId: 'WSH-FLT-M3-002',
        name: 'Flat Washer, Stainless Steel 18-8, M3',
        supplier: 'BoltWorks',
        quantity2023: 5500,
        quantity2024: 6000,
        quantity2025: 6500,
        leadTime: 4,
        pricePerUnit: 0.04
      },
      {
        id: 'item-13',
        componentId: 'WSH-FLT-M3-003',
        name: 'Flat Washer, Stainless Steel 18-8, M3',
        supplier: 'TechFasteners',
        quantity2023: 4000,
        quantity2024: 4300,
        quantity2025: 4500,
        leadTime: 9,
        pricePerUnit: 0.06,
        isDuplicate: true
      },
      {
        id: 'item-14',
        componentId: 'WSH-FLT-M4-001',
        name: 'Flat Washer, Stainless Steel 18-8, M4',
        supplier: 'FastenCorp',
        quantity2023: 3000,
        quantity2024: 3300,
        quantity2025: 3500,
        leadTime: 12,
        pricePerUnit: 0.06,
        isHighlySimilar: true
      },
      {
        id: 'item-15',
        componentId: 'WSH-FLT-M4-002',
        name: 'Flat Washer, Stainless Steel 18-8, M4',
        supplier: 'MetalCrafters',
        quantity2023: 2500,
        quantity2024: 2800,
        quantity2025: 3000,
        leadTime: 8,
        pricePerUnit: 0.07,
        isHighlySimilar: true
      }
    ]
  },
  {
    id: 'pg-4',
    name: 'O-Rings',
    totalUnits: 18000,
    itemCount: 3,
    bestPickIds: ['item-16'],
    items: [
      {
        id: 'item-16',
        componentId: 'ORG-NBR-010-001',
        name: 'O-Ring, NBR, 10mm ID x 1mm CS',
        supplier: 'SealTech',
        quantity2023: 2000,
        quantity2024: 2500,
        quantity2025: 3000,
        leadTime: 6,
        pricePerUnit: 0.15
      },
      {
        id: 'item-17',
        componentId: 'ORG-NBR-010-002',
        name: 'O-Ring, NBR, 10mm ID x 1mm CS',
        supplier: 'FluidSeal',
        quantity2023: 1800,
        quantity2024: 2000,
        quantity2025: 2200,
        leadTime: 10,
        pricePerUnit: 0.17,
        isDuplicate: true
      },
      {
        id: 'item-18',
        componentId: 'ORG-VIT-010-001',
        name: 'O-Ring, Viton, 10mm ID x 1mm CS',
        supplier: 'SealTech',
        quantity2023: 1500,
        quantity2024: 1600,
        quantity2025: 1700,
        leadTime: 12,
        pricePerUnit: 0.32,
        isHighlySimilar: true
      }
    ]
  }
];
