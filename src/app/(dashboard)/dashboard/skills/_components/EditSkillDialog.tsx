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
import { useUpdateSkill } from "@/Tanstack/Skills/useUpdateSkill";
import { toast } from "sonner";
import Image from "next/image";
import { ISkill } from "@/app/api/_models/SkillModel";

export function EditSkillDialog({
  isOpen,
  onClose,
  skill,
}: {
  isOpen: boolean;
  onClose: () => void;
  skill: ISkill;
}) {
  const [name, setName] = useState(skill.name);
  const [iconURL, setIconURL] = useState(skill.iconURL);
  const [color, setColor] = useState(skill.color ?? "#dc2626");
  const [order, setOrder] = useState(skill.order ?? 0);
  const [visible, setVisible] = useState(skill.visible);

  const { mutate: updateSkill, isPending } = useUpdateSkill();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Skill name is required");
      return;
    }
    if (!iconURL.trim()) {
      toast.error("Icon URL is required");
      return;
    }

    updateSkill(
      { id: skill._id, updates: { name, iconURL, color, order, visible } },
      {
        onSuccess: () => {
          toast.success("Skill updated successfully");
          onClose();
        },
        onError: () => toast.error("Failed to update skill"),
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Skill</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Skill Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Icon URL + preview */}
          <div className="space-y-2">
            <Label htmlFor="edit-iconURL">Icon URL</Label>
            <Input
              id="edit-iconURL"
              value={iconURL}
              onChange={(e) => setIconURL(e.target.value)}
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
            <Label htmlFor="edit-color">Brand Color (glow)</Label>
            <div className="flex items-center gap-3">
              <input
                id="edit-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-border bg-transparent p-0.5"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#61dafb"
                className="font-mono w-32"
                maxLength={7}
              />
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
            <Label htmlFor="edit-order">Display Order</Label>
            <Input
              id="edit-order"
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-24 font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Lower number = appears earlier in the honeycomb
            </p>
          </div>

          {/* Visibility */}
          <div className="flex items-center gap-2">
            <Switch
              id="edit-visible"
              checked={visible}
              onCheckedChange={setVisible}
            />
            <Label htmlFor="edit-visible">Visible to public</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Updating..." : "Update Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}