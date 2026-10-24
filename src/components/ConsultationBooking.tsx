import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { z } from 'zod';

const consultationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().optional(),
  message: z.string().trim().optional(),
  preferred_date: z.string().optional(),
});

interface ConsultationBookingProps {
  trigger: React.ReactNode;
}

export const ConsultationBooking = ({ trigger }: ConsultationBookingProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferred_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      consultationSchema.parse(formData);
      setIsSubmitting(true);

      // Call PHP API endpoint
      const { data, error } = await api.bookConsultation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        preferred_date: formData.preferred_date || undefined,
      });

      if (error) {
        throw new Error(error);
      }

      toast({
        title: 'Consultation Booked!',
        description: 'We will contact you shortly to confirm your appointment.',
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferred_date: '',
      });
      setOpen(false);
    } catch (error: any) {
      console.error('Consultation booking error:', error);
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        toast({
          title: 'Validation Error',
          description: firstError.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Failed to book consultation. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Consultation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="preferred_date">Preferred Date & Time</Label>
            <Input
              id="preferred_date"
              type="datetime-local"
              value={formData.preferred_date}
              onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your EB1A journey..."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full primary-gradient text-white"
          >
            {isSubmitting ? 'Booking...' : 'Book Consultation'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
