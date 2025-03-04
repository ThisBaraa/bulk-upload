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
import { toast } from "sonner"
import axios from "axios";
import { authenticate } from "@/app/api/auth";

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
  const [flightRBD, setFlightRBD] = React.useState<string>("Y");
  const [adtCount, setAdtCount] = React.useState<number>(0);
  const [chdCount, setChdCount] = React.useState<number>(0);
  const [infCount, setInfCount] = React.useState<number>(0);

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [routes, setRoutes] = useState<Route[] | null>(null);

  const AGENT_ID = process.env.AGENT_ID || "";

  const searchLowFare = async () => {
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
    } catch (error: any) {
      setError(error.message);
      console.error("❌ Error searching low fare:", error);
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
      <main className="flex flex-col-reverse row-start-2 items-center">
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
                <div className="grid w-full items-center gap-4">
                  <Label className="" htmlFor="departure">
                    Departure
                  </Label>
                  <div className="flex flex-auto gap-4">
                    <Select onValueChange={handleDepartureStationChange}>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Departure Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="MKX">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={DepartureDate} />
                  </div>
                  <Label htmlFor="arrival">Arrival</Label>
                  <div className="flex flex-auto gap-4">
                    <Select onValueChange={handleArrivalStationChange}>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Arrival Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="MKX">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={ArrivalDate} />
                  </div>
                  <div className="flex flex-auto gap-4">
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
                  </div>
                  <div className="flex flex-auto gap-4">
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
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="button" onClick={searchLowFare}>Search</Button>
              </CardFooter>
            </form>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
          </Card>
        </div>
        {data && data.length > 0 ? (
          <div>
            <h2>Available Train Routes</h2>
            <ul>
              {data.map((itinerary: any, index: number) => (
                <li key={index} className="p-4 border rounded-lg mb-2">
                  <h3>Train Itinerary {index + 1}</h3>
                  <ul>
                    {itinerary?.airItinerary?.originDestinationOptions?.originDestinationOption?.map(
                      (option: any, optIndex: number) => (
                        <li key={optIndex} className="p-2 border-b">
                          <strong>Departure:</strong>{" "}
                          {option?.flightSegment?.[0]?.departureAirport?.locationCode}
                          at {option?.flightSegment?.[0]?.departureDateTime
                            ? new Date(option.flightSegment[0].departureDateTime).toLocaleString()
                            : "N/A"}
                          <br />
                          <strong>Arrival:</strong>{" "}
                          {option?.flightSegment?.[0]?.arrivalAirport?.locationCode}
                          at {option?.flightSegment?.[0]?.arrivalDateTime
                            ? new Date(option.flightSegment[0].arrivalDateTime).toLocaleString()
                            : "N/A"}
                          <br />
                          <strong>Train Number:</strong> {option?.flightSegment?.[0]?.flightNumber || "Unknown"}
                          <br />
                          <strong>Cabin Type:</strong> {option?.flightSegment?.[0]?.bookingClassAvails?.[0]?.cabinType || "N/A"}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No trains found</p>
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
      <h1>EBKS Bulk Upload Interface</h1>
    </div>
  );
}
