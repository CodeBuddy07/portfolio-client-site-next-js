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
import { useCreateSocialLink } from "@/Tanstack/SocialLinks/useCreateSocialLink";
import { toast } from "sonner";

export function AddSocialLinkDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(true);

  const { mutate: createLink, isPending } = useCreateSocialLink();

  const handleSubmit = () => {
    if (!platform || !url) {
      toast.error("Platform and URL are required");
      return;
    }

    createLink(
      { platform, url, visible },
      {
        onSuccess: () => {
          toast.success("Social link added successfully");
          onClose();
          setPlatform("");
          setUrl("");
          setVisible(true);
        },
        onError: () => {
          toast.error("Failed to add social link");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Social Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g. Twitter, Instagram"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-profile"
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
            {isPending ? "Adding..." : "Add Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}