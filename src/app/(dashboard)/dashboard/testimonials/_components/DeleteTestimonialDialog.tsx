/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTestimonial } from "@/Tanstack/Testimonials/useDeleteTestimonial";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type DeleteTestimonialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonialId: string;
  onSuccess?: () => void;
};

export function DeleteTestimonialDialog({
  isOpen,
  onClose,
  testimonialId,
  onSuccess,
}: DeleteTestimonialDialogProps) {
  const { mutate: deleteTestimonial, isPending: isDeleting } = useDeleteTestimonial();

  const handleDelete = () => {
    deleteTestimonial(testimonialId, {
      onSuccess: () => {
        toast.success("Testimonial deleted successfully");
        onSuccess?.();
        onClose();
      },
      onError: (err) => {
        console.error("Testimonial deletion failed:", err);
        const errorMessage = (err as any)?.response?.data?.error || "Deletion failed. Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Testimonial</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this testimonial? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}