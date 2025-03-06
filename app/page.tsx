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
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:va(--font-geist-sans)">
      <main className="flex flex-col row-start-2 items-center gap-20">
        <div className="flex gap-20 flex-auto items-center">
          <Card>
            <CardHeader>
              <CardTitle>Create a new group booking</CardTitle>
              <CardDescription>
                By searching and fetching the available trains.
              </CardDescription>
            </CardHeader>
            <form>
              <CardContent>
                <div className="grid items-center gap-4">
                  <div className="grid grid-cols-2 items-center gap-8">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="departure" className="whitespace-nowrap">Departure</Label>
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
                    <div className="flex items-center gap-4">
                      <Label htmlFor="arrival" className="whitespace-nowrap">Arrival</Label>
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
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="departureDate" className="whitespace-nowrap">Departure Date</Label>
                      <div className="flex-1">
                        <DatePicker onDateChange={DepartureDate} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="returnDate" className="whitespace-nowrap">Return Date</Label>
                      <div className="flex-1">
                        <DatePicker onDateChange={ArrivalDate} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-auto gap-4">
                    <div className="flex flex-col gap-4">
                      <Label>Adult: </Label>
                      <Input
                        type="number"
                        placeholder="Adult total"
                        onChange={(e) => handleAdtCountChange(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label>Child: </Label>
                      <Input
                        type="number"
                        placeholder="Child total"
                        onChange={(e) => handleChdCountChange(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label>Infant: </Label>
                      <Input
                        type="number"
                        placeholder="Infant total"
                        onChange={(e) => handleInfCountChange(e.target.value)}
                      />
                    </div>
                  </div> */}
                  {/* <div className="flex flex-auto gap-4">
                    <div className="flex flex-col gap-4">
                      <Label>Ticket Segment - RBD: </Label>
                      <Select onValueChange={handleRBDChange}>
                        <SelectTrigger className="w-[100%]">
                          <SelectValue placeholder="RBD" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Y">Economy</SelectItem>
                          <SelectItem value="C">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                {isSearching ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="button" onClick={searchLowFare}>
                    Search
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
        {data && data.length > 0 ? (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Available Train Routes</h2>
            <div className="space-y-4">
              {data.map((itinerary: any, index: number) => {
                const option =
                  itinerary?.airItinerary?.originDestinationOptions
                    ?.originDestinationOption?.[0];
                const segment = option?.flightSegment?.[0];
                const remainingSeats =
                  itinerary?.airItineraryPricingInfo?.itinTotalFare?.totalFare
                    ?.remainingSeats;
                const price =
                  itinerary?.airItineraryPricingInfo?.itinTotalFare?.totalFare
                    ?.amount || "N/A";
                const currency =
                  itinerary?.airItineraryPricingInfo?.itinTotalFare?.totalFare
                    ?.currencyCode || "SAR";

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

                // Calculate duration (if available)
                const duration = "35 minutes"; // This would be calculated from actual data

                // Get cabin type
                const cabinType =
                  segment?.bookingClassAvails?.[0]?.cabinType === "Y"
                    ? "Economy Class"
                    : "Business Class";
                const trainNumber = segment?.flightNumber || "N/A";

                return (
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
                              #{trainNumber}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{price}</p>
                          <p className="text-sm text-muted-foreground">
                            Total Price
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center">
                          <p className="font-bold text-xl">{departureTime}</p>
                          <p className="text-md">
                            {segment?.departureAirport?.locationCode || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {departureDate}
                          </p>
                        </div>

                        <div className="flex-1 mx-4 relative">
                          <div className="border-t border-dashed border-gray-300 w-full absolute top-1/2 -translate-y-1/2"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black  px-2 text-xs text-muted-foreground">
                            {duration}
                          </div>
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                        </div>

                        <div className="text-center">
                          <p className="font-bold text-xl">{arrivalTime}</p>
                          <p className="text-md">
                            {segment?.arrivalAirport?.locationCode || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {departureDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{cabinType}</p>
                          <p className="text-xs text-muted-foreground">
                            32 seats remaining
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          #{itinerary?.airItinerary?.directionInd || "1221"}
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-2">
                        <div>
                          <p className="text-sm font-medium">{cabinType}</p>
                          <p className="text-xs text-muted-foreground">
                            32 seats remaining
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          #{itinerary?.airItinerary?.directionInd || "1221"}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <p>
            No trains found. Search for trains or there might be no any
            available trains in this period
          </p>
        )}
        <Separator />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Changelog
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Knowledgebase
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Report a Bug →
        </a>
        <p></p>
        <p>{process.env.VER}</p>
      </footer>
    </div>
  );
}
