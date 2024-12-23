import { type Visit as DatabaseVisit } from "@/types/database";

export interface Visit extends DatabaseVisit {
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  visitor: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const enrichVisitWithPropertyData = (visit: DatabaseVisit, property: any): Visit => {
  return {
    ...visit,
    propertyId: property.id,
    propertyTitle: property.title,
    propertyImage: property.images[0],
    propertyLocation: property.location,
    visitor: {
      id: visit.visitor_id || "",
      name: "Visitor Name", // This should come from the profile data
      avatar: "https://i.pravatar.cc/150",
    }
  };
};