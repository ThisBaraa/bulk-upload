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
import React from "react";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";

export default function Home() {
  const [departureDate, setDepartureDate] = React.useState<Date | undefined>();
  const [arrivalDate, setArrivalDate] = React.useState<Date | undefined>();
  const [departureStation, setDepartureStation] = React.useState<string>("");
  const [arrivalStation, setArrivalStation] = React.useState<string>("");
  const [adtCount, setAdtCount] = React.useState<number>(0);
  const [chdCount, setChdCount] = React.useState<number>(0);
  const [infCount, setInfCount] = React.useState<number>(0);

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
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-auto space-y-1.5">
                    <Label className="" htmlFor="departure">Departure</Label>
                    <Select onValueChange={handleDepartureStationChange}>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Departure Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="XMK">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={DepartureDate} />
                  </div>
                  <div className="flex flex-auto space-y-1.5">
                    <Label htmlFor="arrival">Arrival</Label>
                    <Select onValueChange={handleArrivalStationChange}>
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="Arrival Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="XMK">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={ArrivalDate} />
                  </div>
                  <div className="grid grid-flow-col">
                    <Label>Adult: </Label>
                    <Input type="number" placeholder="Adult total" onChange={(e) => handleAdtCountChange(e.target.value)}/>
                    <Label>Child: </Label>
                    <Input type="number" placeholder="Child total" onChange={(e) => handleChdCountChange(e.target.value)}/>
                    <Label>Infant: </Label>
                    <Input type="number" placeholder="Infant total" onChange={(e) => handleInfCountChange(e.target.value)}/>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Search</Button>
            </CardFooter>
          </Card>
        </div>
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
