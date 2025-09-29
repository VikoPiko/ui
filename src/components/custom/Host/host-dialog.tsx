"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { createProperty } from "@/lib/actions/property.actions";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/auth-context";
import { toast } from "sonner";
import { apiFetch } from "@/lib/utils";
import { createProperty } from "@/lib/actions/property-listing/property.actions";
import { CreatePropertyDto } from "@/lib/dto/property.dto";
import { error } from "console";

interface HostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostDialog = ({ isOpen, onClose }: HostDialogProps) => {
  // const [propertyName, setPropertyName] = useState<string>("");
  // const [location, setLocation] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [address, setAddress] = useState<string>("");

  const { getUserId } = useAuth();

  const [property, SetProperty] = useState<CreatePropertyDto>({
    title: "",
    description: "",
    location: "",
    lat: "",
    lng: "",
    images: [],
    hostId: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  // const { user, setUser } = useAuth();
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedToken = sessionStorage.getItem("token");
  //   if (storedToken) {
  //     console.log("Token found in sessionStorage:", storedToken);
  //     setToken(storedToken);
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Property Name:", property.title);
      console.log("Description:", property.description);
      console.log("Location:", property.location);
      console.log("Location:", property.lat, property.lng);

      const user = await getUserId();
      console.log("User Data:", user);
      if (!user) {
        toast.error("Must be logged in/registered to become a host!");
        return;
      }

      const payload = {
        ...property,
        hostId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const data = await createProperty(payload);

      console.log("Property created successfully:", data);
      onClose();
      toast.success("Property created successfully! You're a verified host.");
      // return data;
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Become a Host</DialogTitle>
            <h1>Fill out a simple form to be able to become a host.</h1>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Property Name</Label>
              <Input
                placeholder="ASOC Inn"
                value={property?.title}
                onChange={(e) =>
                  SetProperty({ ...property, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label>Property Description</Label>
              <Input
                value={property?.description}
                placeholder="A cozy inn located..."
                onChange={(e) =>
                  SetProperty({ ...property, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label>Location (City & Country)</Label>
              <Input
                placeholder="Sofia, Bulgaria/BG"
                value={property?.location}
                onChange={(e) =>
                  SetProperty({ ...property, location: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label>Address - Lat & Lng</Label>
              <Input
                placeholder="123 ASOC St."
                value={property?.lat}
                onChange={(e) =>
                  SetProperty({ ...property, lat: e.target.value })
                }
              />
              <Input
                placeholder="123 ASOC St."
                value={property?.lng}
                onChange={(e) =>
                  SetProperty({ ...property, lng: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label>Images: </Label>
              <Input
                placeholder="Image URLs (comma separated)"
                value={property.images.join(", ")} // turn string[] into string for display
                onChange={(e) =>
                  SetProperty({
                    ...property,
                    images: e.target.value.split(",").map((img) => img.trim()), // string → string[]
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default HostDialog;
