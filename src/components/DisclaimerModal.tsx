import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

export const DisclaimerModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure it shows after page load
    const timer = setTimeout(() => {
      const hasSeenDisclaimer = sessionStorage.getItem("hasSeenDisclaimer");
      if (!hasSeenDisclaimer) {
        setOpen(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("hasSeenDisclaimer", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-background border-2 border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-4 pr-8">Disclaimer</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-foreground">
            The information provided by <span className="font-semibold">theEb1</span> is for educational and
            informational purposes only. While we strive to offer valuable insights, as we are not a law firm we do not
            provide legal advice or representation before U.S. immigration authorities.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
