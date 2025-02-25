"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
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

export default function Home() {

  const [departureDate, setDepartureDate] = React.useState<Date | undefined>();
  const [arrivalDate, setArrivalDate] = React.useState<Date | undefined>();

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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Card>
            <CardHeader>Create a new group booking</CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex space-y-1.5">
                    <Label htmlFor="departure">Departure</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Departure Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="XMK">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={DepartureDate}/>
                  </div>
                  <div className="flex space-y-1.5">
                    <Label htmlFor="arrival">Arrival</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Arrival Station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JED">KAIA</SelectItem>
                        <SelectItem value="XJD">Al-Sulimaniyah</SelectItem>
                        <SelectItem value="XMK">Makkah</SelectItem>
                        <SelectItem value="DMX">Madinah</SelectItem>
                      </SelectContent>
                    </Select>
                    <DatePicker onDateChange={ArrivalDate}/>
                  </div>
                </div>
              </form>
            </CardContent>
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
        <p>
        </p>
        <p>{process.env.VER}</p>
      </footer>
      <h1>EBKS Bulk Upload Interface</h1>
    </div>
  );
}
