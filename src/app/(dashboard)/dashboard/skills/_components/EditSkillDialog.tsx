"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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

export function EditSkillDialog({
  isOpen,
  onClose,
  skill,
}: {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    _id: string;
    name: string;
    iconURL: string;
    percentage: number;
    visible: boolean;
  };
}) {
  const [name, setName] = useState(skill.name);
  const [percentage, setPercentage] = useState(skill.percentage);
  const [visible, setVisible] = useState(skill.visible);
  const [iconURL, setIconURL] = useState(skill.iconURL);

  const { mutate: updateSkill, isPending } = useUpdateSkill();

  

  

  const handleSubmit = () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }


    const updates = {
        name,
        percentage,
        visible,
        iconURL
    }


    updateSkill(
      { id: skill._id, updates },
      {
        onSuccess: () => {
          toast.success("Skill updated successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update skill");
        },
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
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Skill Icon</Label>
            <Input
              id="iconURL"
              value={iconURL}
              onChange={(e) => setIconURL(e.target.value)}
            />
            {iconURL && (
              <div className="relative w-20 h-20">
                <Image
                  src={iconURL}
                  alt="Skill icon preview"
                  fill
                  className="object-contain"
                />
                
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Proficiency: {percentage}%</Label>
            <Slider
              value={[percentage]}
              onValueChange={(value) => setPercentage(value[0])}
              max={100}
              step={1}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="visible"
              checked={visible}
              onCheckedChange={setVisible}
            />
            <Label htmlFor="visible">Visible to public</Label>
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