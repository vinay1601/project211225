import { useState } from "react";
import { Search, Bell, Phone, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function PropertiesHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center font-bold text-black">
              IR
            </div>
            <div className="leading-tight">
              <p className="font-bold text-base sm:text-lg text-gray-900">
                Infinity Realty
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Find your perfect property
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-lime-400 sm:ml-6 w-full sm:w-auto">
            <Search size={16} className="text-gray-400" />
            <input
  placeholder="Search location (Dubai)"
  inputMode="search"
  enterKeyHint="search"
  className="outline-none text-sm bg-transparent w-full sm:w-52"
/>

          </div>
          <div className="sm:ml-auto w-full sm:w-auto">
            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-5 py-2 rounded-full font-semibold shadow-md transition"
            >
              <Bell size={16} />
              Save alert
            </button>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="
          max-w-md 
          sm:rounded-2xl 
          rounded-t-2xl 
          sm:rounded-t-2xl
          fixed 
          bottom-0 
          sm:bottom-auto
        ">
          <DialogHeader>
            <DialogTitle className="text-center text-base sm:text-lg">
              Contact Our Property Expert
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-lime-400 flex items-center justify-center text-xl sm:text-2xl font-bold text-black">
              IR
            </div>

            <div>
              <p className="font-semibold text-base sm:text-lg">
                Dhiraj Gupta
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Senior Property Consultant
              </p>
            </div>
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 border rounded-lg p-3">
                <Phone size={16} className="text-lime-500" />
                <span className="text-sm font-medium">
                  +971 52 682 4355
                </span>
              </div>

              <div className="flex items-center gap-3 border rounded-lg p-3">
                <Mail size={16} className="text-lime-500" />
                <span className="text-sm font-medium break-all">
                  dhiraj@infinityrealty.ae
                </span>
              </div>
            </div>
            <Button className="w-full bg-lime-400 text-black hover:bg-lime-500">
              Request Callback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
