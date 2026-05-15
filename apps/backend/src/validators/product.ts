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
  color: z.string(),
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
  name: z.string(),  // "Screen diagonal"
  value: z.string(), // "6.7"
});

const SpecGroupSchema = z.object({
  groupName: z.string(), // "Screen", "CPU"
  specs: z.array(SpecItemSchema),
});

// Filter details
const SmartphoneFilters = z.object({
  battery_capacity: z.number(),
  screen_type: z.string(),
  protection_class: z.string(),
});
const SmartwatchesFilters = z.object({
  case_size: z.string(),
  display_type: z.string(),
  strap_material: z.string(),
});
const CamerasFilters = z.object({
  sensor_type: z.string(),
  effective_pixels: z.string(),
  video_resolution: z.string(),
});
const HeadphonesFilters = z.object({
  headphone_type: z.string(),
  connection_type: z.string(),
  microphone: z.string(),
});
const ComputersFilters = z.object({
  processor: z.string(),
  screen_diagonal: z.number(),
  ram_size: z.number(),
});
const GamingFilters = z.object({
  max_resolution: z.string(),
  drive_type: z.string(),
  controller: z.string(),
});

// Main Scheme
export const ProductSchema = z.discriminatedUnion("category", [
  z.object({
    category: z.literal(CATEGORIES[0]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: SmartphoneFilters, // Filters
    specifications: z.array(SpecGroupSchema), // Desccription details
    variants: z.array(SmartphoneVariant).min(1), // Price variations
  }),
  z.object({
    category: z.literal(CATEGORIES[1]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: SmartwatchesFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(SmartwatchesVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[2]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: CamerasFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(CamerasVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[3]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: HeadphonesFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(HeadphoneVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[4]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: ComputersFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(ComputersVariant).min(1),
  }),
  z.object({
    category: z.literal(CATEGORIES[5]),
    title: z.string(),
    brand: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    mainDescription: z.string(),
    filterAttributes: GamingFilters, 
    specifications: z.array(SpecGroupSchema), 
    variants: z.array(GamingVariant).min(1),
  }),
]);

export type Product = z.infer<typeof ProductSchema>;