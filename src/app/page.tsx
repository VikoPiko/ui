"use client";

import { AuthGuard } from "@/components/custom/Auth/auth-guard";
import { Button } from "@/components/ui/button";
import {
  createListing,
  getAllListings,
} from "@/lib/actions/property-listing/listings.actions";
import {
  createProperty,
  getAllProperties,
} from "@/lib/actions/property-listing/property.actions";
import { login } from "@/lib/actions/user-client.actions";
import { signUp } from "@/lib/actions/user.actions";
import { CreateListingDto, RoomType } from "@/lib/dto/listing.dto";
import { CreatePropertyDto } from "@/lib/dto/property.dto";
import { apiFetch } from "@/lib/utils";
import React from "react";

const page = () => {
  const email = "testmail@gmail.com";
  const password = "1234";
  const confirmPassword = "1234";
  const firstName = "viko";
  const lastName = "viko";
  const avatarUrl = "http://localhost:3000";

  const mockProperty: CreatePropertyDto = {
    title: "Otto Hotels",
    location: "Ankara, TR",
    description: "cozy place for a night",
    lat: "32.89432",
    lng: "18.23283",
    hostId: "e37e204a-7498-4c7e-b2ab-3ae6a2ad6c1a",
    images: [],
  };

  const mockListing: CreateListingDto = {
    propertyId: "7340067e-ef61-4475-93cf-3cd726f498ab",
    title: "Double bedroom apt.",
    description: "double bedroom apartment with bathroooom",
    roomType: RoomType.APARTMENT,
    pricePerNight: 120.0,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: [],
    amenities: [],
    checkIn: new Date(Date.now()),
    checkOut: new Date(Date.now() + 100),
    houseRules: ["no drinking", "pay fast"],
    rating: 3.75,
    reviewCount: 8,
  };

  const testProtected = async () => {
    const data = await apiFetch("/user/me", {
      credentials: "include",
    });
    if (!data) {
      console.log("debug");
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-10">
      <Button
        onClick={() =>
          signUp({
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            avatarUrl,
          })
        }
      >
        Test Sign Up
      </Button>
      <Button onClick={() => login({ email, password })}>Test login</Button>
      <Button onClick={() => createProperty(mockProperty)}>
        Test create Property
      </Button>
      <Button onClick={() => getAllProperties()}>Test get Properties</Button>
      <Button onClick={() => createListing(mockListing)}>
        Test create listing
      </Button>
      <Button onClick={() => getAllListings()}>Test get listings</Button>
      <Button onClick={() => testProtected()}>Test Protected</Button>

      <AuthGuard>
        <h1>This is protected</h1>
      </AuthGuard>
    </div>
  );
};

export default page;
