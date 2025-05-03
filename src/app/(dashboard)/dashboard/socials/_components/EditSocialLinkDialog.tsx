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
import { useUpdateSocialLink } from "@/Tanstack/SocialLinks/useUpdateSocialLink";
import { toast } from "sonner";

export function EditSocialLinkDialog({
  isOpen,
  onClose,
  socialLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  socialLink: {
    _id: string;
    platform: string;
    url: string;
    visible: boolean;
  };
}) {
  const [platform, setPlatform] = useState(socialLink.platform);
  const [url, setUrl] = useState(socialLink.url);
  const [visible, setVisible] = useState(socialLink.visible);

  const { mutate: updateLink, isPending } = useUpdateSocialLink();

  const handleSubmit = () => {
    if (!platform || !url) {
      toast.error("Platform and URL are required");
      return;
    }

    updateLink(
      {
        id: socialLink._id,
        update: { platform, url, visible },
      },
      {
        onSuccess: () => {
          toast.success("Social link updated successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update social link");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Social Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
            {isPending ? "Updating..." : "Update Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}