import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { ModeToggle } from "@/lib/mode-toggler";
import ThemeSelector from "@/components/ThemeSelector";

const SettingsPage: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>General</CardTitle>
            <CardDescription>
              Update your general account settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input defaultValue="jdoe" id="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  defaultValue="jdoe@example.com"
                  id="email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  defaultValue="I'm a YouTube creator!"
                  id="bio"
                  rows={3}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Video Uploads</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when you upload a new video.
                  </p>
                </div>
                <Switch defaultChecked id="new-video-uploads" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Channel Milestones</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when you reach new milestones.
                  </p>
                </div>
                <Switch defaultChecked id="channel-milestones" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Video Engagement</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified about new comments and likes.
                  </p>
                </div>
                <Switch defaultChecked id="video-engagement" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a light or dark theme.
                  </p>
                </div>
                <ModeToggle />
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a theme for your dashboard.
                  </p>
                </div>
                <ThemeSelector />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Switch id="two-factor-auth" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Activity</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    View and manage your login activity.
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View Activity
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authorized Devices</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage the devices that have access to your account.
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Manage Devices
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Integrations</CardTitle>
            <CardDescription>
              Connect your YouTube channel to other services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Google Analytics</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect your YouTube channel to Google Analytics.
                  </p>
                </div>
                <Switch id="google-analytics" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Zapier</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automate your YouTube workflow with Zapier.
                  </p>
                </div>
                <Switch id="zapier" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Discord</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect your YouTube channel to your Discord server.
                  </p>
                </div>
                <Switch id="discord" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Advanced</CardTitle>
            <CardDescription>
              Configure advanced settings for your YouTube channel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Monetization</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable monetization for your YouTube channel.
                  </p>
                </div>
                <Switch id="monetization" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Channel Memberships</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow viewers to become members of your channel.
                  </p>
                </div>
                <Switch id="channel-memberships" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Superchat</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow viewers to purchase Super Chats during live streams.
                  </p>
                </div>
                <Switch id="superchat" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SettingsPage;
