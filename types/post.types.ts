import z from "zod";

export const PostCreatingScheme = z.object({
  userId: z.number(),
  postContent: z.string().min(10, "Minimum 10 characters required"),
  category: z.number(),
  imageUrl: z.string().optional(),
  addressLatitude: z.number(),
  addressLongtitude: z.number(),
  tags: z.string(),
});

export type PostCreationDto = z.infer<typeof PostCreatingScheme>;

export interface Post {
  postId: number;
  userId: number;
  postOwnerName: string;
  postOwnerEmail: string;
  postOwnerImage: string;
  datePublished: number;
  postContent: string;
  dateUpdated: number;
  numberOfComments: number;
  imageUrl: string;
  addressLatitude: number;
  addressLongtitude: number;
  category: CategoryType;
  tags: string;
}

export enum CategoryType {
  CLOTHING_FASHION,
  CARE_COSMETIC,
  FURNITURE_HOME,
  SPORTS_FITNESS,
  GARDEN_OUTDOOR,
  OFFICE_SUPPLIES,
  TOILET_HYGIENE,
  ELECTRICAL_ELECTRONIC,
  CELLPHONE,
  ANIMAL,
}

export const CategoryTypes = {
  [CategoryType.ANIMAL]: "Animal",
  [CategoryType.CARE_COSMETIC]: "Care & Cosmetic",
  [CategoryType.FURNITURE_HOME]: "Furniture & Home",
  [CategoryType.SPORTS_FITNESS]: "Sports & Fitness",
  [CategoryType.GARDEN_OUTDOOR]: "Garden & Outdoor",
  [CategoryType.OFFICE_SUPPLIES]: "Office Supplies",
  [CategoryType.TOILET_HYGIENE]: "Toilet & Hygiene",
  [CategoryType.ELECTRICAL_ELECTRONIC]: "Electrical & Electronic",
  [CategoryType.CELLPHONE]: "Cellphone",
};
