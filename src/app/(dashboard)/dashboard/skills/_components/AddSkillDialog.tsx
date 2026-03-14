"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreateSkill } from "@/Tanstack/Skills/useCreateSkill";
import { toast } from "sonner";
import Image from "next/image";

export function AddSkillDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [color, setColor] = useState("#dc2626");
  const [order, setOrder] = useState(0);
  const [visible, setVisible] = useState(true);

  const { mutate: createSkill, isPending } = useCreateSkill();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Skill name is required");
      return;
    }
    if (!iconURL.trim()) {
      toast.error("Icon URL is required");
      return;
    }

    createSkill(
      { name, iconURL, color, order, visible },
      {
        onSuccess: () => {
          toast.success("Skill added successfully");
          onClose();
          // reset
          setName("");
          setIconURL("");
          setColor("#dc2626");
          setOrder(0);
          setVisible(true);
        },
        onError: () => toast.error("Failed to add skill"),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="add-name">Skill Name</Label>
            <Input
              id="add-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React JS, Docker"
            />
          </div>

          {/* Icon URL + preview */}
          <div className="space-y-2">
            <Label htmlFor="add-iconURL">Icon URL</Label>
            <Input
              id="add-iconURL"
              value={iconURL}
              onChange={(e) => setIconURL(e.target.value)}
              placeholder="https://raw.githubusercontent.com/devicons/devicon/.../react-original.svg"
            />
            {iconURL && (
              <div className="flex items-center gap-3 mt-1">
                <div className="relative w-10 h-10 rounded border border-border bg-muted flex items-center justify-center">
                  <Image
                    src={iconURL}
                    alt="Icon preview"
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-xs text-muted-foreground">Preview</span>
              </div>
            )}
          </div>

          {/* Brand color */}
          <div className="space-y-2">
            <Label htmlFor="add-color">Brand Color (glow)</Label>
            <div className="flex items-center gap-3">
              {/* native color picker */}
              <input
                id="add-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-border bg-transparent p-0.5"
              />
              {/* hex input stays in sync */}
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#61dafb"
                className="font-mono w-32"
                maxLength={7}
              />
              {/* live swatch */}
              <span
                className="inline-block w-8 h-8 rounded-full border border-white/10"
                style={{
                  background: color,
                  boxShadow: `0 0 10px ${color}88`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use the brand&apos;s official hex — e.g. React = #61dafb, Tailwind = #38bdf8
            </p>
          </div>

          {/* Display order */}
          <div className="space-y-2">
            <Label htmlFor="add-order">Display Order</Label>
            <Input
              id="add-order"
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              placeholder="0"
              className="w-24 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Lower number = appears earlier in the honeycomb
            </p>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-2">
            <Switch
              id="add-visible"
              checked={visible}
              onCheckedChange={setVisible}
            />
            <Label htmlFor="add-visible">Visible to public</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Adding..." : "Add Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}