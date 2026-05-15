import { z } from "zod";

export const CATEGORIES = [
    "smartphones", 
    "smartwatches", 
    "cameras", 
    "headphones",
    "computers",
    "gaming",
] as const;

export const CATEGORY_BRANDS = {
  smartphones: ["Apple", "Samsung", "Xiaomi", "Poco", "Nokia"],
  smartwatches: ["Apple", "Samsung", "Xiaomi"],
  cameras: ["Sony", "Canon"],
  headphones: ["Apple", "Samsung", "Xiaomi", "Marshal"],
  computers: ["Apple", "Samsung", "HP", "Lenovo"],
  gaming: ["Sony", "Microsoft", "Nintendo", "Steam"],
} as const;

export type Category = keyof typeof CATEGORY_BRANDS;

const BaseVariant = z.object({
  id: z.string(),
  price: z.number().positive(),
  discount: z.number().min(0).max(100).default(0),
  finalPrice: z.number().positive(),
  stock: z.number().nonnegative().max(999),
  images: z.array(z.string().url()).min(1, "Add at least one image"),
  color: z.string().min(1),
});


const SmartphoneVariant = BaseVariant.extend({
  storage: z.number().min(128).max(10000), 
});
const SmartwatchesVariant = BaseVariant.extend({
  storage: z.number().min(128).max(10000), 
});
const CamerasVariant = BaseVariant;
const HeadphoneVariant = BaseVariant; 
const ComputersVariant = BaseVariant.extend({
  storage: z.number().min(128).max(10000),
  ram: z.number().min(4).max(128),
});
const GamingVariant = BaseVariant.extend({
  storage: z.number().min(128).max(10000), 
});




// Details Spec
const SpecItemSchema = z.object({
  name: z.string().min(1),  // "Screen diagonal"
  value: z.string().min(1), // "6.7"
});

const SpecGroupSchema = z.object({
  groupName: z.string().min(1), // "Screen", "CPU"
  specs: z.array(SpecItemSchema).min(1),
});

// Filter details
const SmartphoneFilters = z.object({
  battery_capacity: z.number(),
  screen_type: z.string().min(1),
  protection_class: z.string().min(1),
});
const SmartwatchesFilters = z.object({
  case_size: z.string().min(1),
  display_type: z.string().min(1),
  strap_material: z.string().min(1),
});
const CamerasFilters = z.object({
  sensor_type: z.string().min(1),
  effective_pixels: z.string().min(1),
  video_resolution: z.string().min(1),
});
const HeadphonesFilters = z.object({
  headphone_type: z.string().min(1),
  connection_type: z.string().min(1),
  microphone: z.string().min(1),
});
const ComputersFilters = z.object({
  processor: z.string().min(1),
  screen_diagonal: z.number().min(1),
  ram_size: z.number().min(1),
});
const GamingFilters = z.object({
  max_resolution: z.string().min(1),
  drive_type: z.string().min(1),
  controller: z.string().min(1),
});

// Main Scheme
export const ProductSchema = z.discriminatedUnion("category", [
  z.object({
    category: z.literal(CATEGORIES[0]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: SmartphoneFilters, // Filters
    specifications: z.array(SpecGroupSchema), // Desccription details
    variants: z.array(SmartphoneVariant).min(1), // Price variations
  }),
  z.object({
    category: z.literal(CATEGORIES[1]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: SmartwatchesFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(SmartwatchesVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[2]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: CamerasFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(CamerasVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[3]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: HeadphonesFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(HeadphoneVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[4]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: ComputersFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(ComputersVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[5]),
    title: z.string().min(1),
    brand: z.string(),
    slug: z.string().optional(),
    shortDescription: z.string().min(1),
    mainDescription: z.string().min(1),
    filterAttributes: GamingFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(GamingVariant).min(1),
  }),
]);

export type Product = z.infer<typeof ProductSchema>;