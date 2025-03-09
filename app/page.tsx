"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import Image from "next/image";
import { DatePicker } from "../shared/components/date_picker";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { authenticate } from "@/app/api/auth";
import { Loader2 } from "lucide-react";
import { Footer } from "@/shared/components/footer";

interface Route {
  origin: {
    code: string;
    name: string;
    cityName: string;
    country: string;
  };
  destinations: {
    code: string;
    name: string;
    cityName: string;
    country: string;
  }[];
}

export default function Home() {
  const [departureDate, setDepartureDate] = React.useState<Date | undefined>();
  const [arrivalDate, setArrivalDate] = React.useState<Date | undefined>();
  const [departureStation, setDepartureStation] = React.useState<string>("");
  const [arrivalStation, setArrivalStation] = React.useState<string>("");
  const [departureTime, setDepartureTime] = React.useState<string>("");
  const [arrivalTime, setArrivalTime] = React.useState<string>("");

  const [flightRBD, setFlightRBD] = React.useState<string>("Y");
  const [adtCount, setAdtCount] = React.useState<number>(5);
  const [chdCount, setChdCount] = React.useState<number>(0);
  const [infCount, setInfCount] = React.useState<number>(0);

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [routes, setRoutes] = useState<Route[] | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const AGENT_ID = process.env.AGENT_ID || "";

  const searchLowFare = async () => {
    setIsSearching(true);
    try {
      const requestBody = {
        version: "2.001",
        pos: {
          source: [
            {
              isoCurrency: "SAR",
              requestorID: {
                type: "5",
                id: "kuwaitiah", // ✅ Ensure this is a string
                name: "kuwaitiah", // ✅ Ensure this is a string
              },
              bookingChannel: {
                type: "OTA",
              },
            },
          ],
        },
        processingInfo: {
          displayOrder: "BY_PRICE_LOW_TO_HIGH",
          availabilityIndicator: true,
        },
        originDestinationInformation: [
          {
            originLocation: { locationCode: departureStation },
            destinationLocation: { locationCode: arrivalStation },
            departureDateTime: {
              value: departureDate ? format(departureDate, "yyyy-MM-dd") : "",
              windowBefore: "P0D",
              windowAfter: "P0D",
            },
          },
        ],
        specificFlightInfo: {
          bookingClassPref: [
            {
              resBookDesigCode: "Y",
            },
            {
              resBookDesigCode: "C",
            },
          ],
        },
        travelerInfoSummary: {
          airTravelerAvail: [
            {
              passengerTypeQuantity: [
                {
                  code: "ADT",
                  quantity: adtCount,
                },
              ],
            },
          ],
        },
      };

      console.log("🔍 Request Payload:", requestBody);

      const response = await fetch("/api/trains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Search failed");
      }
      console.log("✅ Train Search Results:", result);
      if (
        result?.pricedItineraries &&
        Array.isArray(result.pricedItineraries.pricedItinerary)
      ) {
        setData(result.pricedItineraries.pricedItinerary);
      } else {
        setData([]); // Ensure we don't set a string
      }
      setError(null);
      setIsSearching(false);
    } catch (error: any) {
      toast("Error: " + error);
      setError(error.message);
      console.error("❌ Error searching low fare:", error);
      setIsSearching(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await fetch("/api/routes", { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setRoutes(result);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching routes:", error);
    }
  };

  const DepartureDate = (date: Date | undefined) => {
    setDepartureDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd"); // Convert to "YYYY-MM-DD" format
      console.log("Selected date:", formattedDate);
      // Send formattedDate through the API request
    }
    // Here you can send the date through an API request
  };

  const ArrivalDate = (date: Date | undefined) => {
    setArrivalDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd"); // Convert to "YYYY-MM-DD" format
      console.log("Selected date:", formattedDate);
      // Send formattedDate through the API request
    }
    // Here you can send the date through an API request
  };

  const handleDepartureStationChange = (value: string) => {
    setDepartureStation(value);
    console.log("Departure station:", value);
    // Here you can send the departure station through an API request
  };

  const handleArrivalStationChange = (value: string) => {
    setArrivalStation(value);
    console.log("Arrival station:", value);
    // Here you can send the arrival station through an API request
  };

  const handleAdtCountChange = (value: string) => {
    setAdtCount(parseInt(value));
    console.log("Adult count:", value);
    // Here you can send the adult count through an API request
  };

  const handleChdCountChange = (value: string) => {
    setChdCount(parseInt(value));
    console.log("Child count:", value);
    // Here you can send the child count through an API request
  };

  const handleInfCountChange = (value: string) => {
    setInfCount(parseInt(value));
    console.log("Infant count:", value);
    // Here you can send the infant count through an API request
  };

  const handleRBDChange = (value: string) => {
    setFlightRBD(value);
    console.log("RBD:", value);
    // Here you can send the arrival station through an API request
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can send the booking data through an API request
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:va(--font-geist-sans)] p-10">
      <main className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Search for Available Trains</CardTitle>
              <CardDescription>
                By filling the form below, you can search for available trains.
              </CardDescription>
            </CardHeader>
            <form>
              <CardContent>
                <div className="grid items-center gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4 md:gap-8">
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:gap-4">
                      <Label htmlFor="departure" className="whitespace-nowrap">
                        Departure
                      </Label>
                      <Select onValueChange={handleDepartureStationChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Departure Station" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="JED">KAIA</SelectItem>
                          <SelectItem value="JXD">Al-Sulimaniyah</SelectItem>
                          <SelectItem value="MKX">Makkah</SelectItem>
                          <SelectItem value="DMX">Madinah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:gap-4">
                      <Label htmlFor="arrival" className="whitespace-nowrap">
                        Arrival
                      </Label>
                      <Select onValueChange={handleArrivalStationChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Arrival Station" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="JED">KAIA</SelectItem>
                          <SelectItem value="JXD">Al-Sulimaniyah</SelectItem>
                          <SelectItem value="MKX">Makkah</SelectItem>
                          <SelectItem value="DMX">Madinah</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:gap-4">
                      <Label
                        htmlFor="departureDate"
                        className="whitespace-nowrap">
                        Train Date
                      </Label>
                      <DatePicker onDateChange={DepartureDate} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
                {isSearching ? (
                  <Button disabled className="w-full sm:w-auto">
                    <Loader2 className="animate-spin mr-2" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={searchLowFare}
                    className="w-full sm:w-auto">
                    Search
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
        {data && data.length > 0 ? (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">
              We've found {Math.ceil(data.length / 2)} trains
            </h2>
            <div className="space-y-4">
              {data.reduce((acc: any[], itinerary: any, index: number) => {
                if (index % 2 !== 0) return acc;

                const economyItinerary = data[index];
                const businessItinerary = data[index + 1];

                const segment =
                  economyItinerary?.airItinerary?.originDestinationOptions
                    ?.originDestinationOption?.[0]?.flightSegment?.[0];

                // Get economy seats
                const economySeats =
                  economyItinerary?.airItinerary?.originDestinationOptions
                    ?.originDestinationOption?.[0]?.flightSegment?.[0]
                    ?.bookingClassAvails?.[1]?.bookingClassAvail?.[0]
                    ?.resBookDesigQuantity || 0;

                // Get business seats
                const businessSeats =
                  businessItinerary?.airItinerary?.originDestinationOptions
                    ?.originDestinationOption?.[0]?.flightSegment?.[0]
                    ?.bookingClassAvails?.[0]?.bookingClassAvail?.[0]
                    ?.resBookDesigQuantity || 0;

                const option =
                  itinerary?.airItinerary?.originDestinationOptions
                    ?.originDestinationOption?.[0];

                // Format dates
                const departureTime = segment?.departureDateTime
                  ? new Date(segment.departureDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "00:00";
                const arrivalTime = segment?.arrivalDateTime
                  ? new Date(segment.arrivalDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "00:00";
                const departureDate = segment?.departureDateTime
                  ? new Date(segment.departureDateTime).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric" }
                    )
                  : "";

                const arrivalDate = segment?.arrivalDateTime
                  ? new Date(segment.arrivalDateTime).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric" }
                    )
                  : "";

                // Calculate duration (if available)
                const duration = "35 minutes"; // This would be calculated from actual data

                const flightDuration =
                  segment?.arrivalDateTime - segment?.departureDateTime ||
                  "N/A";

                // Get cabin type
                const cabinType =
                  segment?.resBookDesigCode === "Y"
                    ? "Economy Class"
                    : "Business Class";

                const trainNumber = segment?.flightNumber || "N/A";

                acc.push(
                  <Card key={index} className="overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6">
                              <path d="M4 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                              <path d="M20 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                              <path d="M3 7v6a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7l-3-3H6L3 7z"></path>
                              <path d="M5 7h14"></path>
                              <path d="M8 16v2"></path>
                              <path d="M16 16v2"></path>
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              Train #{trainNumber}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Train Number
                            </p>
                          </div>
                        </div>
                        
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center">
                          <p className="font-bold text-xl">{departureTime}</p>
                          <p className="text-md">
                            {segment?.departureAirport?.locationCode
                              ? new String(
                                  segment?.departureAirport?.locationCode
                                )
                                  .replace("JED", "KAIA")
                                  .replace("JXD", "Al-Sulimaniyah")
                                  .replace("MKX", "Makkah")
                                  .replace("DMX", "Madinah")
                              : "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {departureDate}
                          </p>
                        </div>

                        <div className="flex-1 mx-4 relative">
                          <div className="border-t border-dashed border-gray-300 w-full absolute top-1/2 -translate-y-1/2"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-2 text-xs">
                            {/* {flightDuration} */}
                          </div>
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full outline outline-2 outline-primary bg-slate-900"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                        </div>

                        <div className="text-center">
                          <p className="font-bold text-xl">
                            {arrivalTime
                              ? `${arrivalTime} ${
                                  new Date(segment?.arrivalDateTime).getDate() >
                                  new Date(segment?.departureDateTime).getDate()
                                    ? "(+1)"
                                    : ""
                                }`
                              : "N/A"}
                          </p>
                          <p className="text-md">
                            {segment?.arrivalAirport?.locationCode
                              ? new String(
                                  segment?.arrivalAirport?.locationCode
                                )
                                  .replace("JED", "KAIA")
                                  .replace("JXD", "Al-Sulimaniyah")
                                  .replace("MKX", "Makkah")
                                  .replace("DMX", "Madinah")
                              : "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {arrivalDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{businessSeats} Seats</p>
                          <p className="text-xs text-muted-foreground">
                          Business Class
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{economySeats} Seats</p>
                          <p className="text-xs text-muted-foreground">
                          Economy Class
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
                return acc;
              }, [])}
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No trains found. <br />
            <span className="mt-10 text-primary">
              Search for trains or there might be no any available trains in
              this period
            </span>
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
