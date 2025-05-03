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
  const [percentage, setPercentage] = useState(50);
  const [visible, setVisible] = useState(true);
  const [iconURL, setIconURL] = useState("");
  

  const { mutate: createSkill, isPending } = useCreateSkill();





  const handleSubmit = () => {
    
    const data = {
        name,
        percentage,
        visible,
        iconURL
    }

    createSkill(data, {
      onSuccess: () => {
        toast.success("Skill added successfully");
        onClose();
        setName("");
        setIconURL("");
        setPercentage(50);
        setVisible(true);
      },
      onError: () => {
        toast.error("Failed to add skill");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. JavaScript, React"
            />
          </div>

          <div className="space-y-2">
            <Label>Skill Icon</Label>
            <Input
              id="iconURL"
              value={iconURL}
              onChange={(e) => setIconURL(e.target.value)}
              placeholder="e.g. https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/react/react-original.svg"
            />
            {iconURL  && (
              <div className="relative w-20 h-20">
                <Image
                  src={iconURL}
                  alt="Skill icon preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) 
        }
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
            {isPending ? "Adding..." : "Add Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}