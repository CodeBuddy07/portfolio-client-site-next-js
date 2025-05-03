/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Image as ImageIcon, Loader2, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ITestimonial } from "@/app/api/_models/testimonialModel";
import { useUpdateTestimonial } from "@/Tanstack/Testimonials/useUpdateTestimonial";

type EditTestimonialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  testimonial: ITestimonial;
  onSuccess?: () => void;
};

export function EditTestimonialDialog({ 
  isOpen, 
  onClose, 
  testimonial,
  onSuccess 
}: EditTestimonialDialogProps) {
  const [editedTestimonial, setEditedTestimonial] = useState({
    name: testimonial.name,
    position: testimonial.position || "",
    company: testimonial.company,
    starCount: testimonial.starCount,
    testimonial: testimonial.testimonial,
    isFeatured: testimonial.isFeatured,
    isActive: testimonial.isActive,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(testimonial.imgDisplayURL || null);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (testimonial) {
      setEditedTestimonial({
        name: testimonial.name,
        position: testimonial.position || "",
        company: testimonial.company,
        starCount: testimonial.starCount,
        testimonial: testimonial.testimonial,
        isFeatured: testimonial.isFeatured,
        isActive: testimonial.isActive,
      });
      setPreviewUrl(testimonial.imgDisplayURL || null);
    }
  }, [testimonial]);

  const handleChange = (field: keyof typeof editedTestimonial, value: any) => {
    setEditedTestimonial({ ...editedTestimonial, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    if (previewUrl && previewUrl !== testimonial.imgDisplayURL) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(undefined);
  };

  const { mutate: updateTestimonial, isPending: isSubmitting } = useUpdateTestimonial();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    if (file) formData.append("file", file);
    
    Object.entries(editedTestimonial).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Add flag to remove image if preview was cleared
    if (!previewUrl && testimonial.imgDisplayURL) {
      formData.append("removeImage", "true");
    }

    updateTestimonial(
      { id: testimonial._id as string, formData },
      {
        onSuccess: () => {
          toast.success("Testimonial updated successfully");
          onSuccess?.();
          onClose();
        },
        onError: (err) => {
          console.error("Testimonial update failed:", err);
          const errorMessage = (err as any)?.response?.data?.error || "Update failed. Please try again.";
          toast.error(errorMessage);
        },
      }
    );
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleChange("starCount", star)}
            className="focus:outline-none"
          >
            <Star
              size={20}
              className={
                star <= editedTestimonial.starCount
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="overflow-y-auto max-h-[90vh] scroll-smooth">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Testimonial</DialogTitle>
          <DialogDescription>
            Update the details of this testimonial.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Person Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={editedTestimonial.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Person's name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={editedTestimonial.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="Person's position"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={editedTestimonial.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Rating *</Label>
              {renderStars()}
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-2">
            <Label htmlFor="testimonial">Testimonial *</Label>
            <Textarea
              id="testimonial"
              value={editedTestimonial.testimonial}
              onChange={(e) => handleChange("testimonial", e.target.value)}
              placeholder="What they said about your work..."
              rows={5}
              maxLength={277}
              required
            />
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isFeatured">Featured</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={editedTestimonial.isFeatured}
                  onChange={(e) => handleChange("isFeatured", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Feature this testimonial</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">Active</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editedTestimonial.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm">Show this testimonial publicly</span>
              </div>
            </div>
          </div>

          {/* Person Image */}
          <div className="space-y-4">
            <Label>Person&apos;s Image</Label>
            <input
              name="image"
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative w-full h-56 md:h-64 border rounded-md overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Person's image"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-70 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={triggerFileInput}
                className="w-full h-44 md:h-56 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-stone-800 transition-colors"
              >
                <ImageIcon size={40} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload new image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Testimonial"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}